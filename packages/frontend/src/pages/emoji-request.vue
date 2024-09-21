<template>
<MkStickyContainer>
	<div class="_gaps_m">
		<MkSpacer :contentMax="700">
			<div :class="$style.title">絵文字追加申請<br></div>
			<MkFolder :defaultOpen="true">
				<template #label>絵文字申請における同意事項</template>
				<template #suffix><i class="ti ti-check" style="color: var(--success)"></i></template>
				<ol class="_gaps_s" :class="$style.rules">
					<div :class="$style.ruleText">{{ '以下の同意事項を熟読、同意の上、下のチェックボックスを押してください。 尚、絵文字追加申請を送信した時点で、同意事項全てに同意したものとみなします。' }}</div>
					<li v-for="item in agreement" :class="$style.rule"><div :class="$style.ruleText" v-html="item"></div></li>
				</ol>
				<MkSwitch :modelValue="agree" style="margin-top: 16px;" @update:modelValue="updateAgree">{{ i18n.ts.agree }}</MkSwitch>
			</MkFolder>
			<div v-if="agree" style="margin: 16px">
				<div v-if="imgUrl != null" :class="$style.imgs">
					<div style="background: #000;" :class="$style.imgContainer">
						<img :src="imgUrl" :class="$style.img"/>
					</div>
					<div style="background: #222;" :class="$style.imgContainer">
						<img :src="imgUrl" :class="$style.img"/>
					</div>
					<div style="background: #ddd;" :class="$style.imgContainer">
						<img :src="imgUrl" :class="$style.img"/>
					</div>
					<div style="background: #fff;" :class="$style.imgContainer">
						<img :src="imgUrl" :class="$style.img"/>
					</div>
				</div>
				<MkButton rounded style="margin: 0 auto;" @click="changeImage">{{ i18n.ts.selectFile }}</MkButton>
				<MkInput v-model="name" style="margin: 16px" pattern="[a-z0-9_]" autocapitalize="off">
					<template #label>{{ i18n.ts.name }}</template>
					<template #caption>{{ i18n.ts.emojiNameValidation }}</template>
				</MkInput>
				<MkInput v-model="category" style="margin: 16px" :datalist="customEmojiCategories">
					<template #label>{{ i18n.ts.category }}</template>
				</MkInput>
				<MkInput v-model="aliases" style="margin: 16px" autocapitalize="off">
					<template #label>{{ i18n.ts.tags }}</template>
					<template #caption>
						{{ i18n.ts.theKeywordWhenSearchingForCustomEmoji }}<br/>
						{{ i18n.ts.setMultipleBySeparatingWithSpace }}
					</template>
				</MkInput>
				<MkSwitch v-model="isSensitive" style="margin: 16px">{{ i18n.ts.isSensitive }}</MkSwitch>
				<MkSwitch v-model="localOnly" style="margin: 16px">{{ i18n.ts.localOnly }}</MkSwitch>
				<div :class="$style.sub_title">絵文字ライセンス</div>
				<div :class="$style.q_text">この絵文字の著作権保有者は申請者自身のみですか？<br>絵文字の中に申請者以外の著作物は含まれませんか？（フォント等）</div>
				<div :class="$style.buttons">
					<MkButton rounded @click="updatehasExclutiveLicense(true)">{{ i18n.ts.yes }}</MkButton>
					<MkButton rounded @click="updatehasExclutiveLicense(false)">{{ i18n.ts.no }}</MkButton>
				</div>
				<div v-if="!hasExclutiveLicense">
					<MkInput v-model="ex_license" style="margin: 16px" :mfmAutocomplete="true">
						<template #label>{{ '絵文字を作成する上以外のライセンス情報を記入してください' }}</template>
						<template #caption>
							{{ '例：以下のように、ライセンス所有者の名前と、そのライセンスが分かるリンクもしくはライセンス自体を記入してください。' }}<br/>
							{{ '「©ExampleLicensor https://example.com/ and ©ExampleLicensor2 CC 4.0 by-sa 」' }}
						</template>
					</MkInput>
					<MkButton rounded @click="generateLicense">{{ i18n.ts.add }}</MkButton>
				</div>
				<div v-if="generatedLicense">
					<MkInput v-model="license" style="margin: 16px" :mfmAutocomplete="true">
						<template #label>{{ '申請されるライセンス' }}</template>
					</MkInput>
					<div>
						<div class="_buttons">
							<MkButton primary :disabled=" file === undefined || name === '' || !generatedLicense " @click="done()">{{ i18n.ts.create }}</MkButton>
						</div>
					</div>
				</div>
			</div>
		</MkSpacer>
	</div>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import * as Misskey from 'misskey-js';
import { selectFile } from '@/scripts/select-file.js';
import { customEmojiCategories } from '@/custom-emojis.js';
import { i18n } from '@/i18n.js';
import MkButton from '@/components/MkButton.vue';
import MkFolder from '@/components/MkFolder.vue';
import MkSwitch from '@/components/MkSwitch.vue';
import MkInput from '@/components/MkInput.vue';
import { $i } from '@/account.js';
import { useRouter } from '@/router/supplier.js';
import * as os from '@/os.js';
const router = useRouter();
const agree = ref(false);
const agreement = [
	'次の要素に該当する絵文字の場合、却下若しくは削除の対象となる可能性があります。予めご了承ください。</br>・利用規約第６条に定める禁止事項に該当する恐れのある絵文字</br>・第三者の商標権、著作権等を侵害する恐れのある絵文字</br>・オリジナル絵文字申請の場合、申請者ご自身に著作権がない絵文字</br>・登録申請に不備がある絵文字',
	'絵文字を申請した時点で、株式会社9ineverse及びそのユーザー全員に対して、公衆送信権を許諾したものとみなします。',
	'リモートでの利用を制限しない場合においては、株式会社9ineverseに対して許諾権を認めるものとし、また株式会社9ineverseを含むすべてのfediverseSNSサーバー運営団体及びユーザーに対して公衆送信権を許諾したものとみなします。',
	'絵文字の削除・訂正申請は、これが権利の濫用に該当しないもの、もしくは株式会社9ineverseが削除・訂正に同意したものに限り受理します。</br>（例：・絵文字が他人の知的財産権を侵害しうることが後から発覚した場合</br>・自身の著作物である絵文字が、他人によって不正に実装された場合</br>・絵文字が一般的に誹謗中傷等の不法行為に用いられており、かつその利用用途について絵文字申請者が同意していない場合</br>・絵文字の削除によるシステム的損害やユーザーの損害と照らし合わせて、なお削除すべき相応の理由がある場合</br>・他、絵文字の削除について、株式会社9ineverseが同意できる場合 等）</br>これらの申請は9ineverse.comサポートアカウントへのDMより申請してください。',
];

const name = ref<string>('');
const category = ref<string>('');
const aliases = ref<string>('');
const license = ref<string>('');
const ex_license = ref<string>('');
const isSensitive = ref(false);
const localOnly = ref(false);
const roleIdsThatCanBeUsedThisEmojiAsReaction = ref([]);
const rolesThatCanBeUsedThisEmojiAsReaction = ref<Misskey.entities.Role[]>([]);
const file = ref<Misskey.entities.DriveFile>();
const imgUrl = computed(() => file.value ? file.value.url : null);
const hasExclutiveLicense = ref(true);
const generatedLicense = ref(false);

async function updateAgree(v: boolean) {
	if (v) {
		const confirm = await os.confirm({
			type: 'question',
			title: i18n.ts.doYouAgree,
			text: i18n.tsx.iHaveReadXCarefullyAndAgree({ x: '絵文字申請における同意事項' }),
		});
		if (confirm.canceled) return;
		agree.value = true;
	} else {
		agree.value = false;
	}
}

function updatehasExclutiveLicense(v: boolean) {
	hasExclutiveLicense.value = v;
	license.value = '©' + $i?.username;
	if (v) {
		generatedLicense.value = true;
	}
}

function generateLicense() {
	if (ex_license.value !== '') {
		license.value = license.value + ' and ©' + ex_license.value;
		generatedLicense.value = true;
	}
}

async function changeImage(ev) {
	file.value = await selectFile(ev.currentTarget ?? ev.target, null);
	const candidate = file.value.name.replace(/\.(.+)$/, '');
	if (candidate.match(/^[a-z0-9_]+$/)) {
		name.value = candidate;
	}
}

async function done() {
	if (file.value === undefined || name.value === '' ) return;
	const params = {
		name: name.value,
		fileId: file.value.id,
		category: category.value === '' ? null : category.value,
		aliases: aliases.value.replace('　', ' ').split(' ').filter(x => x !== ''),
		license: license.value === '' ? null : license.value,
		Request: true,
		isSensitive: isSensitive.value,
		localOnly: localOnly.value,
		roleIdsThatCanBeUsedThisEmojiAsReaction: rolesThatCanBeUsedThisEmojiAsReaction.value.map(x => x.id),
		isNotifyIsHome: false,
	};
	await os.apiWithDialog('admin/emoji/add-request', params);
	router.push('/about#emojis');
}
</script>

<style lang="scss" module>
.title {
	padding: 48px;
	font-size: 24px;
}

.sub_title {
	padding: 14px;
	font-size: 18px;
}

.q_text {
	padding: 10px;
	font-size: 15px;
}

.rules {
	counter-reset: item;
	list-style: none;
	padding: 0;
	margin: 0;
}

.rule {
	display: flex;
	gap: 8px;
	word-break: break-word;

	&::before {
		flex-shrink: 0;
		display: flex;
		position: sticky;
		top: calc(var(--stickyTop, 0px) + 8px);
		counter-increment: item;
		content: counter(item);
		width: 32px;
		height: 32px;
		line-height: 32px;
		background-color: var(--accentedBg);
		color: var(--accent);
		font-size: 13px;
		font-weight: bold;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
	}

}

.imgs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
	margin: 16px;
}

.imgContainer {
  padding: 8px;
  border-radius: var(--radius);
}

.img {
  display: block;
  height: 64px;
  width: 64px;
  object-fit: contain;
}

.buttons {
	margin-top: 16px;
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
	justify-content: center;
}
</style>

<!--
SPDX-FileCopyrightText: syuilo and misskey-project , Type4ny-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div class="_gaps_m">
	<MkSelect v-model="lang">
		<template #label>{{ i18n.ts.uiLanguage }}</template>
		<option v-for="x in langs" :key="x[0]" :value="x[0]">{{ x[1] }}</option>
		<template #caption>
			<I18n :src="i18n.ts.i18nInfo" tag="span">
				<template #link>
					<MkLink url="https://crowdin.com/project/misskey">Crowdin</MkLink>
				</template>
			</I18n>
		</template>
	</MkSelect>

	<MkRadios v-model="hemisphere">
		<template #label>{{ i18n.ts.hemisphere }}</template>
		<option value="N">{{ i18n.ts._hemisphere.N }}</option>
		<option value="S">{{ i18n.ts._hemisphere.S }}</option>
		<template #caption>{{ i18n.ts._hemisphere.caption }}</template>
	</MkRadios>

	<MkRadios v-model="overridedDeviceKind">
		<template #label>{{ i18n.ts.overridedDeviceKind }}</template>
		<option :value="null">{{ i18n.ts.auto }}</option>
		<option value="smartphone"><i class="ti ti-device-mobile"/> {{ i18n.ts.smartphone }}</option>
		<option value="tablet"><i class="ti ti-device-tablet"/> {{ i18n.ts.tablet }}</option>
		<option value="desktop"><i class="ti ti-device-desktop"/> {{ i18n.ts.desktop }}</option>
	</MkRadios>

	<FormSection>
		<div class="_gaps_s">
			<MkSwitch v-model="showFixedPostForm">{{ i18n.ts.showFixedPostForm }}</MkSwitch>
			<MkSwitch v-model="showFixedPostFormInChannel">{{ i18n.ts.showFixedPostFormInChannel }}</MkSwitch>
			<MkSwitch v-model="alwaysShowPlayer">Youtube.comや、nicovideo.jpのプレイヤーを全て開いた状態にする</MkSwitch>
			<MkSwitch v-model="alwaysExpandTweet">Xのポストを常時表示させる</MkSwitch>
			<MkSelect v-model="draftSavingBehavior">
				<template #label>{{ i18n.ts.draftSavingBehavior }}<span class="_beta">Preview</span></template>
				<option value="auto">{{ i18n.ts._draftSavingBehavior.auto }}</option>
				<option value="manual">{{ i18n.ts._draftSavingBehavior.manual }}</option>
			</MkSelect>
			<MkSwitch v-model="disableNoteDrafting">
				<template #caption>{{ i18n.ts.disableNoteDraftingDescription }}</template>
				{{ i18n.ts.disableNoteDrafting }}<span class="_beta">Preview</span>
			</MkSwitch>
		</div>
	</FormSection>
	<MkFoldableSection :expanded="false" class="item">
		<template #header>{{ i18n.ts.displayOfNote }}</template>

		<div class="_gaps_m">
			<div class="_gaps_s">
				<MkSwitch v-model="collapseRenotes">
					<template #label>{{ i18n.ts.collapseRenotes }}</template>
					<template #caption>{{ i18n.ts.collapseRenotesDescription }}</template>
				</MkSwitch>
				<MkSwitch v-model="showNoteActionsOnlyHover">{{ i18n.ts.showNoteActionsOnlyHover }}</MkSwitch>
				<MkSwitch v-model="showClipButtonInNoteFooter">{{ i18n.ts.showClipButtonInNoteFooter }}</MkSwitch>
				<MkSwitch v-model="showVisibilityColor">{{ i18n.ts.showVisibilityColor }}</MkSwitch>
				<MkColorInput v-if="showVisibilityColor" v-model="homeColor">
					<template #label>{{ i18n.ts._visibility.home }}</template>
				</MkColorInput>
				<MkColorInput v-if="showVisibilityColor" v-model="followerColor">
					<template #label>{{ i18n.ts._visibility.followers }}</template>
				</MkColorInput>
				<MkColorInput v-if="showVisibilityColor" v-model="specifiedColor">
					<template #label>{{ i18n.ts._visibility.specified }}</template>
				</MkColorInput>
				<MkColorInput v-if="showVisibilityColor" v-model="localOnlyColor">
					<template #label>{{ i18n.ts.localOnly }}</template>
				</MkColorInput>
				<MkSwitch v-model="advancedMfm">{{ i18n.ts.enableAdvancedMfm }}</MkSwitch>
				<MkSwitch v-if="advancedMfm" v-model="animatedMfm">{{ i18n.ts.enableAnimatedMfm }}</MkSwitch>
				<MkSwitch v-if="advancedMfm" v-model="enableQuickAddMfmFunction">{{ i18n.ts.enableQuickAddMfmFunction }}</MkSwitch>
				<MkSwitch v-model="showReactionsCount">{{ i18n.ts.showReactionsCount }}</MkSwitch>
				<MkSwitch v-model="showGapBetweenNotesInTimeline">{{ i18n.ts.showGapBetweenNotesInTimeline }}</MkSwitch>
				<MkSwitch v-model="loadRawImages">{{ i18n.ts.loadRawImages }}</MkSwitch>
				<MkRadios v-model="reactionsDisplaySize">
					<template #label>{{ i18n.ts.reactionsDisplaySize }}</template>
					<option value="small">{{ i18n.ts.small }}</option>
					<option value="medium">{{ i18n.ts.medium }}</option>
					<option value="large">{{ i18n.ts.large }}</option>
				</MkRadios>
				<MkSwitch v-model="limitWidthOfReaction">{{ i18n.ts.limitWidthOfReaction }}</MkSwitch>
			</div>

			<MkSelect v-model="instanceTicker">
				<template #label>{{ i18n.ts.instanceTicker }}</template>
				<option value="none">{{ i18n.ts._instanceTicker.none }}</option>
				<option value="remote">{{ i18n.ts._instanceTicker.remote }}</option>
				<option value="always">{{ i18n.ts._instanceTicker.always }}</option>
			</MkSelect>

			<MkSelect v-model="nsfw">
				<template #label>{{ i18n.ts.displayOfSensitiveMedia }}</template>
				<option value="respect">{{ i18n.ts._displayOfSensitiveMedia.respect }}</option>
				<option value="ignore">{{ i18n.ts._displayOfSensitiveMedia.ignore }}</option>
				<option value="force">{{ i18n.ts._displayOfSensitiveMedia.force }}</option>
			</MkSelect>

			<MkRadios v-model="mediaListWithOneImageAppearance">
				<template #label>{{ i18n.ts.mediaListWithOneImageAppearance }}</template>
				<option value="expand">{{ i18n.ts.default }}</option>
				<option value="16_9">{{ i18n.tsx.limitTo({ x: '16:9' }) }}</option>
				<option value="1_1">{{ i18n.tsx.limitTo({ x: '1:1' }) }}</option>
				<option value="2_3">{{ i18n.tsx.limitTo({ x: '2:3' }) }}</option>
			</MkRadios>
		</div>
	</MkFoldableSection>

	<MkFoldableSection :expanded="false" class="item">
		<template #header>{{ i18n.ts.behavior }}</template>

		<div class="_gaps_m">
			<div class="_gaps_s">
				<MkSwitch v-model="imageNewTab">{{ i18n.ts.openImageInNewTab }}</MkSwitch>
				<MkSwitch v-model="useReactionPickerForContextMenu">{{ i18n.ts.useReactionPickerForContextMenu }}</MkSwitch>
				<MkSwitch v-model="enableInfiniteScroll">{{ i18n.ts.enableInfiniteScroll }}</MkSwitch>
				<MkSwitch v-model="keepScreenOn">{{ i18n.ts.keepScreenOn }}</MkSwitch>
				<MkSwitch v-model="disableStreamingTimeline">{{ i18n.ts.disableStreamingTimeline }}</MkSwitch>
				<MkSwitch v-model="enableHorizontalSwipe">{{ i18n.ts.enableHorizontalSwipe }}</MkSwitch>
				<MkSwitch v-model="alwaysConfirmFollow">{{ i18n.ts.alwaysConfirmFollow }}</MkSwitch>
				<MkSwitch v-model="confirmWhenRevealingSensitiveMedia">{{ i18n.ts.confirmWhenRevealingSensitiveMedia }}</MkSwitch>
			</div>
			<MkSelect v-model="serverDisconnectedBehavior">
				<template #label>{{ i18n.ts.whenServerDisconnected }}</template>
				<option value="reload">{{ i18n.ts._serverDisconnectedBehavior.reload }}</option>
				<option value="dialog">{{ i18n.ts._serverDisconnectedBehavior.dialog }}</option>
				<option value="quiet">{{ i18n.ts._serverDisconnectedBehavior.quiet }}</option>
			</MkSelect>
			<MkSelect v-model="contextMenu">
				<template #label>{{ i18n.ts._contextMenu.title }}</template>
				<option value="app">{{ i18n.ts._contextMenu.app }}</option>
				<option value="appWithShift">{{ i18n.ts._contextMenu.appWithShift }}</option>
				<option value="native">{{ i18n.ts._contextMenu.native }}</option>
			</MkSelect>
			<MkRange v-model="numberOfPageCache" :min="1" :max="10" :step="1" easing>
				<template #label>{{ i18n.ts.numberOfPageCache }}</template>
				<template #caption>{{ i18n.ts.numberOfPageCacheDescription }}</template>
			</MkRange>
			<MkRange v-model="numberOfGamingSpeed" :min="1" :max="60" :step="1" easing>
				<template #label>{{ i18n.ts.GamingSpeedChange }}</template>
				<template #caption>{{ i18n.ts.GamingSpeedChangeInfo }}</template>
			</MkRange>
			<MkFolder>
				<template #label>{{ i18n.ts.dataSaver }}</template>

				<div class="_gaps_m">
					<MkInfo>{{ i18n.ts.reloadRequiredToApplySettings }}</MkInfo>

					<div class="_buttons">
						<MkButton inline @click="enableAllDataSaver">{{ i18n.ts.enableAll }}</MkButton>
						<MkButton inline @click="disableAllDataSaver">{{ i18n.ts.disableAll }}</MkButton>
					</div>
					<div class="_gaps_m">
						<MkSwitch v-model="dataSaver.media">
							{{ i18n.ts._dataSaver._media.title }}
							<template #caption>{{ i18n.ts._dataSaver._media.description }}</template>
						</MkSwitch>
						<MkSwitch v-model="dataSaver.avatar">
							{{ i18n.ts._dataSaver._avatar.title }}
							<template #caption>{{ i18n.ts._dataSaver._avatar.description }}</template>
						</MkSwitch>
						<MkSwitch v-model="dataSaver.urlPreview">
							{{ i18n.ts._dataSaver._urlPreview.title }}
							<template #caption>{{ i18n.ts._dataSaver._urlPreview.description }}</template>
						</MkSwitch>
						<MkSwitch v-model="dataSaver.code">
							{{ i18n.ts._dataSaver._code.title }}
							<template #caption>{{ i18n.ts._dataSaver._code.description }}</template>
						</MkSwitch>
					</div>
				</div>
			</MkFolder>
		</div>
	</MkFoldableSection>
	<FormSection>
		<template #label>{{ i18n.ts.other }}</template>

		<div class="_gaps">
			<MkFolder>
				<template #label>{{ i18n.ts.additionalEmojiDictionary }}</template>
				<div class="_buttons">
					<template v-for="lang in emojiIndexLangs" :key="lang">
						<MkButton v-if="defaultStore.reactiveState.additionalUnicodeEmojiIndexes.value[lang]" danger @click="removeEmojiIndex(lang)"><i class="ti ti-trash"></i> {{ i18n.ts.remove }} ({{ getEmojiIndexLangName(lang) }})</MkButton>
						<MkButton v-else @click="downloadEmojiIndex(lang)"><i class="ti ti-download"></i> {{ getEmojiIndexLangName(lang) }}{{ defaultStore.reactiveState.additionalUnicodeEmojiIndexes.value[lang] ? ` (${ i18n.ts.installed })` : '' }}</MkButton>
					</template>
				</div>
			</MkFolder>
			<FormLink to="/settings/deck">{{ i18n.ts.deck }}</FormLink>
			<FormLink to="/settings/custom-css"><template #icon><i class="ti ti-code"></i></template>{{ i18n.ts.customCss }}</FormLink>
		</div>
	</FormSection>
</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import Multiselect from '@vueform/multiselect';
import * as Misskey from 'misskey-js';
import MkSwitch from '@/components/MkSwitch.vue';
import MkSelect from '@/components/MkSelect.vue';
import MkRadios from '@/components/MkRadios.vue';
import MkRange from '@/components/MkRange.vue';
import MkFolder from '@/components/MkFolder.vue';
import MkButton from '@/components/MkButton.vue';
import FormSection from '@/components/form/section.vue';
import FormLink from '@/components/form/link.vue';
import MkLink from '@/components/MkLink.vue';
import MkInfo from '@/components/MkInfo.vue';
import { langs } from '@/config.js';
import { defaultStore } from '@/store.js';
import * as os from '@/os.js';
import { signinRequired } from '@/account.js';
import { unisonReload } from '@/scripts/unison-reload.js';
import { i18n } from '@/i18n.js';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import { miLocalStorage } from '@/local-storage.js';
import { globalEvents } from '@/events.js';
import { claimAchievement } from '@/scripts/achievements.js';
import MkColorInput from '@/components/MkColorInput.vue';
import MkFoldableSection from '@/components/MkFoldableSection.vue';
import MkInput from '@/components/MkInput.vue';
import { userChannelFollowingsCache, userChannelsCache, userFavoriteListsCache, userListsCache } from '@/cache.js';

const lang = ref(miLocalStorage.getItem('lang'));
const fontSize = ref(miLocalStorage.getItem('fontSize'));
const useSystemFont = ref(miLocalStorage.getItem('useSystemFont') != null);
const dataSaver = ref(defaultStore.state.dataSaver);

async function reloadAsk() {
	const { canceled } = await os.confirm({
		type: 'info',
		text: i18n.ts.reloadToApplySetting,
	});
	if (canceled) return;

	unisonReload();
}

const hemisphere = computed(defaultStore.makeGetterSetter('hemisphere'));
const overridedDeviceKind = computed(defaultStore.makeGetterSetter('overridedDeviceKind'));
const serverDisconnectedBehavior = computed(defaultStore.makeGetterSetter('serverDisconnectedBehavior'));
const showNoteActionsOnlyHover = computed(defaultStore.makeGetterSetter('showNoteActionsOnlyHover'));
const showClipButtonInNoteFooter = computed(defaultStore.makeGetterSetter('showClipButtonInNoteFooter'));
const reactionsDisplaySize = computed(defaultStore.makeGetterSetter('reactionsDisplaySize'));
const limitWidthOfReaction = computed(defaultStore.makeGetterSetter('limitWidthOfReaction'));
const collapseRenotes = computed(defaultStore.makeGetterSetter('collapseRenotes'));
const showGapBetweenNotesInTimeline = computed(defaultStore.makeGetterSetter('showGapBetweenNotesInTimeline'));
const animatedMfm = computed(defaultStore.makeGetterSetter('animatedMfm'));
const advancedMfm = computed(defaultStore.makeGetterSetter('advancedMfm'));
const showReactionsCount = computed(defaultStore.makeGetterSetter('showReactionsCount'));
const enableQuickAddMfmFunction = computed(defaultStore.makeGetterSetter('enableQuickAddMfmFunction'));
const loadRawImages = computed(defaultStore.makeGetterSetter('loadRawImages'));
const highlightSensitiveMedia = computed(defaultStore.makeGetterSetter('highlightSensitiveMedia'));
const imageNewTab = computed(defaultStore.makeGetterSetter('imageNewTab'));
const nsfw = computed(defaultStore.makeGetterSetter('nsfw'));
const showFixedPostForm = computed(defaultStore.makeGetterSetter('showFixedPostForm'));
const showFixedPostFormInChannel = computed(defaultStore.makeGetterSetter('showFixedPostFormInChannel'));
const alwaysShowPlayer = computed(defaultStore.makeGetterSetter('alwaysShowPlayer'));

const disableNoteDrafting = computed(defaultStore.makeGetterSetter('disableNoteDrafting'));
const draftSavingBehavior = computed(defaultStore.makeGetterSetter('draftSavingBehavior'));
const alwaysExpandTweet = computed(defaultStore.makeGetterSetter('alwaysExpandTweet'));
const numberOfPageCache = computed(defaultStore.makeGetterSetter('numberOfPageCache'));
const numberOfGamingSpeed = computed(defaultStore.makeGetterSetter('numberOfGamingSpeed'));
const homeColor = computed(defaultStore.makeGetterSetter('homeColor'));
const followerColor = computed(defaultStore.makeGetterSetter('followerColor'));
const specifiedColor = computed(defaultStore.makeGetterSetter('specifiedColor'));
const localOnlyColor = computed(defaultStore.makeGetterSetter('localOnlyColor'));
const instanceTicker = computed(defaultStore.makeGetterSetter('instanceTicker'));
const enableInfiniteScroll = computed(defaultStore.makeGetterSetter('enableInfiniteScroll'));
const useReactionPickerForContextMenu = computed(defaultStore.makeGetterSetter('useReactionPickerForContextMenu'));
const squareAvatars = computed(defaultStore.makeGetterSetter('squareAvatars'));
const mediaListWithOneImageAppearance = computed(defaultStore.makeGetterSetter('mediaListWithOneImageAppearance'));

const keepScreenOn = computed(defaultStore.makeGetterSetter('keepScreenOn'));
const enableonlyAndWithSave = computed(defaultStore.makeGetterSetter('onlyAndWithSave'));
const topBarNameShown = computed(defaultStore.makeGetterSetter('topBarNameShown'));
const showVisibilityColor = computed(defaultStore.makeGetterSetter('showVisibilityColor'));
const disableStreamingTimeline = computed(defaultStore.makeGetterSetter('disableStreamingTimeline'));
const enableSeasonalScreenEffect = computed(defaultStore.makeGetterSetter('enableSeasonalScreenEffect'));
const enableHorizontalSwipe = computed(defaultStore.makeGetterSetter('enableHorizontalSwipe'));
const alwaysConfirmFollow = computed(defaultStore.makeGetterSetter('alwaysConfirmFollow'));
const confirmWhenRevealingSensitiveMedia = computed(defaultStore.makeGetterSetter('confirmWhenRevealingSensitiveMedia'));
const contextMenu = computed(defaultStore.makeGetterSetter('contextMenu'));
const $i = signinRequired();

watch(lang, () => {
	miLocalStorage.setItem('lang', lang.value as string);
	miLocalStorage.removeItem('locale');
	miLocalStorage.removeItem('localeVersion');
});

document.documentElement.style.setProperty('--gamingspeed', numberOfGamingSpeed.value + 's');

function hexToRgb(hex) {
	// 16進数のカラーコードから "#" を除去
	hex = hex.replace(/^#/, '');

	// 16進数をRGBに変換
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	return `${r},${g},${b}`;
}

document.documentElement.style.setProperty('--homeColor', hexToRgb(homeColor.value));
document.documentElement.style.setProperty('--followerColor', hexToRgb(followerColor.value));
document.documentElement.style.setProperty('--specifiedColor', hexToRgb(specifiedColor.value));
watch([homeColor, specifiedColor, followerColor], () => {
	document.documentElement.style.setProperty('--homeColor', hexToRgb(homeColor.value));
	document.documentElement.style.setProperty('--followerColor', hexToRgb(followerColor.value));
	document.documentElement.style.setProperty('--specifiedColor', hexToRgb(specifiedColor.value));
});
watch(numberOfGamingSpeed, () => {
	document.documentElement.style.setProperty('--gamingspeed', numberOfGamingSpeed.value + 's');
});
watch(fontSize, () => {
	if (fontSize.value == null) {
		miLocalStorage.removeItem('fontSize');
	} else {
		miLocalStorage.setItem('fontSize', fontSize.value);
	}
});

watch(useSystemFont, () => {
	if (useSystemFont.value) {
		miLocalStorage.setItem('useSystemFont', 't');
	} else {
		miLocalStorage.removeItem('useSystemFont');
	}
});

watch([
	hemisphere,
	lang,
	fontSize,
	useSystemFont,
	enableInfiniteScroll,
	squareAvatars,
	showNoteActionsOnlyHover,
	showGapBetweenNotesInTimeline,
	instanceTicker,
	overridedDeviceKind,
	mediaListWithOneImageAppearance,
	reactionsDisplaySize,
	limitWidthOfReaction,
	highlightSensitiveMedia,
	keepScreenOn,
	showVisibilityColor,
	enableonlyAndWithSave,
	topBarNameShown,
	disableStreamingTimeline,
	enableSeasonalScreenEffect,
	alwaysConfirmFollow,
	alwaysShowPlayer,
	alwaysExpandTweet,
	confirmWhenRevealingSensitiveMedia,
	contextMenu,
], async () => {
	await reloadAsk();
});

const emojiIndexLangs = ['en-US', 'ja-JP', 'ja-JP_hira'] as const;

function getEmojiIndexLangName(targetLang: typeof emojiIndexLangs[number]) {
	if (langs.find(x => x[0] === targetLang)) {
		return langs.find(x => x[0] === targetLang)![1];
	} else {
		// 絵文字辞書限定の言語定義
		switch (targetLang) {
			case 'ja-JP_hira': return 'ひらがな';
			default: return targetLang;
		}
	}
}

function downloadEmojiIndex(lang: typeof emojiIndexLangs[number]) {
	async function main() {
		const currentIndexes = defaultStore.state.additionalUnicodeEmojiIndexes;

		function download() {
			switch (lang) {
				case 'en-US': return import('../../unicode-emoji-indexes/en-US.json').then(x => x.default);
				case 'ja-JP': return import('../../unicode-emoji-indexes/ja-JP.json').then(x => x.default);
				case 'ja-JP_hira': return import('../../unicode-emoji-indexes/ja-JP_hira.json').then(x => x.default);
				default: throw new Error('unrecognized lang: ' + lang);
			}
		}

		currentIndexes[lang] = await download();
		await defaultStore.set('additionalUnicodeEmojiIndexes', currentIndexes);
	}

	os.promiseDialog(main());
}

function removeEmojiIndex(lang: string) {
	async function main() {
		const currentIndexes = defaultStore.state.additionalUnicodeEmojiIndexes;
		delete currentIndexes[lang];
		await defaultStore.set('additionalUnicodeEmojiIndexes', currentIndexes);
	}

	os.promiseDialog(main());
}

async function setPinnedList() {
	const myLists = await userListsCache.fetch();
	const favoriteLists = await userFavoriteListsCache.fetch();
	let lists = [...new Set([...myLists, ...favoriteLists])];
	const { canceled, result: list } = await os.select({
		title: i18n.ts.selectList,
		items: lists.map(x => ({
			value: x, text: x.name,
		})),
	});
	if (canceled) return;
	let pinnedLists = defaultStore.state.pinnedUserLists;

	// Check if the id is already present in pinnedLists
	if (!pinnedLists.some(pinnedList => pinnedList.id === list.id)) {
		pinnedLists.push(list);
		defaultStore.set('pinnedUserLists', pinnedLists);
	}
}

async function removePinnedList(id, name?:string) {
	if (!id) return;
	const { canceled } = await os.confirm({
		type: 'warning',
		text: i18n.tsx.removeAreYouSure({ x: name ?? id }),
	});
	if (canceled) return;

	if (id === 'all') {
		if (canceled) return;

		defaultStore.set('pinnedUserLists', []);
		return;
	}

	const pinnedLists = defaultStore.state.pinnedUserLists;
	const newPinnedLists = pinnedLists.filter(pinnedList => pinnedList.id !== id);
	defaultStore.set('pinnedUserLists', newPinnedLists);
}

async function setPinnedChannel() {
	const myChannels = await userChannelsCache.fetch();
	const favoriteChannels = await userChannelFollowingsCache.fetch();
	let channels = [...new Set([...myChannels, ...favoriteChannels])];
	const { canceled, result: channel } = await os.select({
		title: i18n.ts.selectList,
		items: channels.map(x => ({
			value: x, text: x.name,
		})),
	});
	if (canceled) return;
	let pinnedChannels = defaultStore.state.pinnedChannels;

	// Check if the id is already present in pinnedLists
	if (!pinnedChannels.some(pinnedChannel => pinnedChannel.id === channel.id)) {
		pinnedChannels.push(channel);
		defaultStore.set('pinnedChannels', pinnedChannels);
	}
}

async function removePinnedChannel(id, name?:string) {
	if (!id) return;
	const { canceled } = await os.confirm({
		type: 'warning',
		text: i18n.tsx.removeAreYouSure({ x: name ?? id }),
	});
	if (canceled) return;

	if (id === 'all') {
		if (canceled) return;

		defaultStore.set('pinnedChannels', []);
		return;
	}

	const pinnedChannels = defaultStore.state.pinnedChannels;
	const newPinnedChannels = pinnedChannels.filter(pinnedchannel => pinnedchannel.id !== id);
	defaultStore.set('pinnedChannels', newPinnedChannels);
}

let smashCount = 0;
let smashTimer: number | null = null;

function testNotification(): void {
	const notification: Misskey.entities.Notification = {
		id: Math.random().toString(),
		createdAt: new Date().toUTCString(),
		isRead: false,
		type: 'test',
	};

	globalEvents.emit('clientNotification', notification);

	// セルフ通知破壊 実績関連
	smashCount++;
	if (smashCount >= 10) {
		claimAchievement('smashTestNotificationButton');
		smashCount = 0;
	}
	if (smashTimer) {
		clearTimeout(smashTimer);
	}
	smashTimer = window.setTimeout(() => {
		smashCount = 0;
	}, 300);
}

function enableAllDataSaver() {
	const g = { ...defaultStore.state.dataSaver };

	Object.keys(g).forEach((key) => { g[key] = true; });

	dataSaver.value = g;
}

function disableAllDataSaver() {
	const g = { ...defaultStore.state.dataSaver };

	Object.keys(g).forEach((key) => { g[key] = false; });

	dataSaver.value = g;
}

watch(dataSaver, (to) => {
	defaultStore.set('dataSaver', to);
}, {
	deep: true,
});

const headerActions = computed(() => []);

const headerTabs = computed(() => []);

definePageMetadata(() => ({
	title: i18n.ts.general,
	icon: 'ti ti-adjustments',
}));
</script>

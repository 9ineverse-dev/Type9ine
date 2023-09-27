<template>
<div :class="$style.title">{{ host }}のサブスク<br></div>
<div style="text-align: center;">ユーザー体験を次のレベルへ。{{ subscriptionRole.name }}を今すぐ獲得しよう。<br></div>
<div class="_gaps_s" :class="$style.mainActions">
	<MkButton v-if="isSubscriptionMember === false" :class="$style.mainAction" full rounded gradate data-cy-signup style="margin-right: auto;margin-left: auto;" @click="checkout()">サブスクに登録する</MkButton>
	<MkButton v-else :class="$style.mainAction" full rounded gradate data-cy-signup style="margin-right: auto;margin-left: auto;" @click="portal()">サブスクを管理する</MkButton>
</div>
<div :class="$style.container">
	<div :class="$style.roleName">
		<div>
			<span :class="$style.icon">
				<template v-if="subscriptionRole.iconUrl">
					<img :class="$style.badge" :src="subscriptionRole.iconUrl"/>
				</template>
				<template v-else>
					<i v-if="subscriptionRole.isAdministrator" class="ti ti-crown" style="color: var(--accent);"></i>
					<i v-else-if="subscriptionRole.isModerator" class="ti ti-shield" style="color: var(--accent);"></i>
					<i v-else class="ti ti-user" style="opacity: 0.7;"></i>
				</template>
			</span>
		</div>
		<div>
			{{ subscriptionRole.name }}の特典
		</div>
	</div>
	<div :class="$style.roleOptions">
		<div :class="$style.roleOption">
			<i class="ti ti-plus"></i> <div :class="$style.roleOptionAbout">{{ i18n.ts._role._options.canHideAds }}</div> <div></div>
		</div>
		<div :class="$style.roleOption">
			<i class="ti ti-plus"></i> <div :class="$style.roleOptionAbout">{{ i18n.ts._role._options.canSearchNotes }}</div> <div></div>
		</div>
		<div :class="$style.roleOption">
			<i class="ti ti-plus"></i> <div :class="$style.roleOptionAbout">{{ i18n.ts._role._options.canCreatePrivateChannel }}</div> <div></div>
		</div>
		<div :class="$style.roleOption">
			<i class="ti ti-dashboard"></i> <div :class="$style.roleOptionAbout">{{ i18n.ts._role._options.driveCapacity }}</div> <div></div><div :class="$style.roleOptionNumber"><div v-if="$i.policies.driveCapacityMb <= 1024">{{ $i.policies.driveCapacityMb }}MB</div><div v-else>{{ yourdriveCapacityGb }}GB</div></div><i class="ti ti-arrow-right"></i><div :class="$style.roleOptionNumber">{{ driveCapacityGb }}GB</div>
		</div>
		<div :class="$style.roleOption">
			<i class="ti ti-dashboard"></i> <div :class="$style.roleOptionAbout">{{ i18n.ts._role._options.antennaMax }}</div><div></div><div :class="$style.roleOptionNumber">{{ $i.policies.antennaLimit }}</div><i class="ti ti-arrow-right"></i><div :class="$style.roleOptionNumber">{{ subscriptionRole.policies.antennaLimit.value }}</div>
		</div>
		<div :class="$style.roleOption">
			<i class="ti ti-dashboard"></i> <div :class="$style.roleOptionAbout">{{ i18n.ts._role._options.pinMax }}</div><div></div><div :class="$style.roleOptionNumber">{{ $i.policies.pinLimit }}</div><i class="ti ti-arrow-right"></i><div :class="$style.roleOptionNumber">{{ subscriptionRole.policies.pinLimit.value }}</div>
		</div>
		<div :class="$style.roleOption">
			<i class="ti ti-dashboard"></i> <div :class="$style.roleOptionAbout">{{ i18n.ts._role._options.webhookMax }}</div> <div></div><div :class="$style.roleOptionNumber">{{ $i.policies.webhookLimit }}</div><i class="ti ti-arrow-right"></i><div :class="$style.roleOptionNumber">{{ subscriptionRole.policies.webhookLimit.value }}</div>
		</div>
		<div :class="$style.roleOption">
			<i class="ti ti-dashboard"></i> <div :class="$style.roleOptionAbout">{{ i18n.ts._role._options.clipMax }}</div> <div></div><div :class="$style.roleOptionNumber">{{ $i.policies.clipLimit }}</div><i class="ti ti-arrow-right"></i><div :class="$style.roleOptionNumber">{{ subscriptionRole.policies.clipLimit.value }}</div>
		</div>
		<div :class="$style.roleOption">
			<i class="ti ti-dashboard"></i> <div :class="$style.roleOptionAbout">{{ i18n.ts._role._options.noteEachClipsMax }}</div> <div></div><div :class="$style.roleOptionNumber">{{ $i.policies.noteEachClipsLimit }}</div><i class="ti ti-arrow-right"></i><div :class="$style.roleOptionNumber">{{ subscriptionRole.policies.noteEachClipsLimit.value }}</div>
		</div>
		<div :class="$style.roleOption">
			<i class="ti ti-dashboard"></i> <div :class="$style.roleOptionAbout">{{ i18n.ts._role._options.userListMax }}</div> <div></div><div :class="$style.roleOptionNumber">{{ $i.policies.userListLimit }}</div><i class="ti ti-arrow-right"></i><div :class="$style.roleOptionNumber">{{ subscriptionRole.policies.userListLimit.value }}</div>
		</div>
		<div :class="$style.roleOption">
			<i class="ti ti-dashboard"></i> <div :class="$style.roleOptionAbout">{{ i18n.ts._role._options.userEachUserListsMax }}</div> <div></div><div :class="$style.roleOptionNumber">{{ $i.policies.userEachUserListsLimit }}</div><i class="ti ti-arrow-right"></i><div :class="$style.roleOptionNumber">{{ subscriptionRole.policies.userEachUserListsLimit.value }}</div>
		</div>
		<div :class="$style.roleOption">
			<i class="ti ti-dashboard"></i> <div :class="$style.roleOptionAbout">{{ i18n.ts._role._options.wordMuteMax }}</div> <div></div><div :class="$style.roleOptionNumber">{{ $i.policies.wordMuteLimit }}</div><i class="ti ti-arrow-right"></i><div :class="$style.roleOptionNumber">{{ subscriptionRole.policies.wordMuteLimit.value }}</div>
		</div>
	</div>
</div>
<div class="_gaps_s" :class="$style.mainActions">
	<MkButton v-if="isSubscriptionMember === false" :class="$style.mainAction" full rounded gradate data-cy-signup style="margin-right: auto;margin-left: auto;" @click="checkout()">サブスクに登録する</MkButton>
	<MkButton v-else :class="$style.mainAction" full rounded gradate data-cy-signup style="margin-right: auto;margin-left: auto;" @click="portal()">サブスクを管理する</MkButton>
</div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import MkButton from '@/components/MkButton.vue';
import { instance } from '@/instance.js';
import { $i } from '@/account.js';
import * as os from '@/os.js';
import { i18n } from '@/i18n.js';
import { host } from '@/config.js';

const props = withDefaults(defineProps<{
	role: string;
}>(), {
	role: instance.basicPlanRoleId,
});

const isSubscriptionMember = $i.roles.some(r => r.id === instance.basicPlanRoleId);
let subscriptionRole = await os.api('roles/show', {	roleId: props.role, });
const driveCapacityGb = subscriptionRole.policies.driveCapacityMb.value / 1024;
const yourdriveCapacityGb = $i.policies.driveCapacityMb / 1024;
if (!instance.sellSubscription) {
	window.location.href = "https://" + host + "/";
}

onBeforeMount(() => {
	if (!instance.sellSubscription) {
//		window.location.href = "https://" + host + "/";
	}
});

async function checkout() {
	const redirect = await os.api('subscription/checkout');
	window.location.href = redirect.redirect.destination;
}

async function portal() {
	const redirect = await os.api('subscription/portal');
	window.location.href = redirect.redirect.destination;
}
</script>

<style lang="scss" module>

.title {
	text-align: center;
	padding: 48px;
	font-size: 48px;
}

.mainActions {
	padding: 32px;
	/* 子要素を水平方向の中央に配置する */
	display: flex;
	justify-content: center;
}

.mainAction {
	line-height: 28px;
	max-width: 250px;
}

.container {
	border: solid 2px var(--accent);
	margin-right: auto;
	margin-left: auto;
	max-width: 600px;
	border-radius: 20px 20px 20px 20px / 20px 20px 20px 20px;
}

.roleName {
	padding: 32px;
	font-size: 32px;
	display: flex;
	justify-content: center;
}

.roleOptions{
	display: flex;
	justify-content: center;
	flex-direction: column;
}

.roleOption{
	padding: 18px;
	font-size: 18px;
	display: flex;
	justify-content: space-between;
}

.roleOptionAbout{
	width: 55%;
}

.roleOptionNumber{
	width: 10%;
	text-align: center;
}

.icon {
	//margin-right: 8px;
}

.badge {
	height: 1.3em;
	vertical-align: -20%;
}

</style>

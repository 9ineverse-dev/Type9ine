<template>
<div class="_gaps_s" :class="$style.mainActions">
	<MkButton v-if="isSubscriptionMember === false" :class="$style.mainAction" full rounded gradate data-cy-signup style="margin-right: auto;margin-left: auto;" @click="checkout()">サブスクに登録する</MkButton>
	<MkButton v-else :class="$style.mainAction" full rounded gradate data-cy-signup style="margin-right: auto;margin-left: auto;" @click="portal()">サブスクを管理する</MkButton>
</div>
<div :class="$style.container">
	<div :class="$style.roleName" style="display: flex;justify-content: center;">
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
</div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import MkButton from '@/components/MkButton.vue';
import { instance } from '@/instance.js';
import { $i } from '@/account.js';
import * as os from '@/os.js';
import { i18n } from '@/i18n.js';

const props = withDefaults(defineProps<{
	role: string;
}>(), {
	role: instance.basicPlanRoleId,
});

let subscriptionRole = $ref();
let error = $ref();

onBeforeMount(() => {
	os.api('roles/show', {	roleId: props.role, }).then(res => {	subscriptionRole = res; });
});

const isSubscriptionMember = $i.roles.some(r => r.id === instance.basicPlanRoleId);

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
}

.icon {
	//margin-right: 8px;
}

.badge {
	height: 1.3em;
	vertical-align: -20%;
}

</style>

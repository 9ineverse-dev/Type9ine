<template>
<div class="_buttons">
	<MkButton primary @click="checkout()"><i class="ti ti-device-floppy"></i> 決済する</MkButton>
	<MkButton primary @click="portal()"><i class="ti ti-device-floppy"></i> 決済する</MkButton>
</div>
<div class="_gaps_s" :class="$style.mainActions">
	<MkButton v-if="isSubscriptionMember === false" :class="$style.mainAction" full rounded gradate data-cy-signup style="margin-right: 12px;" @click="checkout()">{{ i18n.ts.joinThisServer }}</MkButton>
	<MkButton v-else :class="$style.mainAction" full rounded gradate data-cy-signup style="margin-right: 12px;" @click="portal()">{{ i18n.ts.joinThisServer }}</MkButton>
</div>

</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import MkButton from '@/components/MkButton.vue';
import { instance } from '@/instance.js';
import { $i } from '@/account.js';
import * as os from '@/os';
import { i18n } from '@/i18n.js';

let isSubscriptionMember = false;

onMounted(() => {
	if ($i.roles.includes(instance.basicPlanRoleId))
{
		isSubscriptionMember = true;
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
.mainActions {
	padding: 32px;
	display: flex;
  justify-content: center;
}

.mainAction {
	line-height: 28px;
	max-width: 300px;
}
</style>

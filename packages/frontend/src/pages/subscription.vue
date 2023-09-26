<template>
<div class="_buttons">
	<MkButton primary @click="checkout()"><i class="ti ti-device-floppy"></i> 決済する</MkButton>
	<MkButton primary @click="portal()"><i class="ti ti-device-floppy"></i> 決済する</MkButton>
</div>
<div class="_gaps_s" :class="$style.mainActions">
	<MkButton :class="$style.mainAction" full rounded gradate data-cy-signup style="margin-right: 12px;" @click="signup()">{{ i18n.ts.joinThisServer }}</MkButton>
</div>

</template>

<script lang="ts" setup>
import { } from 'vue';
import MkButton from '@/components/MkButton.vue';
import { instance } from '@/instance.js';
import { $i } from '@/account.js';
import * as os from '@/os';
import { i18n } from '@/i18n.js';

if ($i.roles.includes(instance.basicPlanRoleId))
{
	const redirect = await os.api('subscription/portal');
	window.location.href = redirect.redirect.destination;
}

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
@media screen and (min-width: 960px){
	.mainActions {
	padding: 32px 30%;
}

}
.mainActions {
	padding: 32px;
}

.mainAction {
	line-height: 28px;
}
</style>

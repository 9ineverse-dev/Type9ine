<template>
<div class="_buttons">
	<MkButton primary @click="checkout()"><i class="ti ti-device-floppy"></i> 決済する</MkButton>
	<MkButton primary @click="portal()"><i class="ti ti-device-floppy"></i> 決済する</MkButton>
</div>
</template>

<script lang="ts" setup>
import { } from 'vue';
import MkButton from '@/components/MkButton.vue';
import * as os from '@/os';

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

</style>

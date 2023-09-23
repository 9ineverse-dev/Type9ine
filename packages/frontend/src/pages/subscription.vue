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

function checkout() {
	os.api('subscription/checkout').then(() => {
		os.success();
	});
}

function portal() {
	os.api('subscription/portal').then(() => {
		os.success();
	});
}
</script>

<style lang="scss" module>

</style>

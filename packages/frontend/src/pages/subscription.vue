<template>
<div class="_buttons">
	<MkButton primary @click="checkout()"><i class="ti ti-device-floppy"></i> 決済する</MkButton>
	<MkButton primary @click="portal()"><i class="ti ti-device-floppy"></i> 決済する</MkButton>
</div>
<button v-tooltip.noDelay.right="i18n.ts.note" class="_button" :class="[$style.post]" data-cy-open-post-form @click="os.post">
	<i class="ti ti-pencil ti-fw" :class="$style.postIcon"></i><span :class="$style.postText">{{ i18n.ts.note }}</span>
</button>
</template>

<script lang="ts" setup>
import { } from 'vue';
import MkButton from '@/components/MkButton.vue';
import { instance } from '@/instance.js';
import { $i } from '@/account.js';
import * as os from '@/os';

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
.root {
	--nav-width: 250px;
	--nav-icon-only-width: 72px;

	flex: 0 0 var(--nav-width);
	width: var(--nav-width);
	box-sizing: border-box;
}

.body {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1001;
	width: var(--nav-icon-only-width);
	height: 100dvh;
	box-sizing: border-box;
	overflow: auto;
	overflow-x: clip;
	overscroll-behavior: contain;
	background: var(--navBg);
	contain: strict;
	display: flex;
	flex-direction: column;
}

.root:not(.iconOnly) {
	.body {
		width: var(--nav-width);
	}

	.top {
		position: sticky;
		top: 0;
		z-index: 1;
		padding: 20px 0;
		background: var(--X14);
		-webkit-backdrop-filter: var(--blur, blur(8px));
		backdrop-filter: var(--blur, blur(8px));
	}

	.banner {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center center;
		-webkit-mask-image: linear-gradient(0deg, rgba(0,0,0,0) 15%, rgba(0,0,0,0.75) 100%);
		mask-image: linear-gradient(0deg, rgba(0,0,0,0) 15%, rgba(0,0,0,0.75) 100%);
	}

	.instance {
		position: relative;
		display: block;
		text-align: center;
		width: 100%;
	}

	.instanceIcon {
		display: inline-block;
		width: 38px;
		aspect-ratio: 1;
	}

	.bottom {
		position: sticky;
		bottom: 0;
		padding: 20px 0;
		background: var(--X14);
		-webkit-backdrop-filter: var(--blur, blur(8px));
		backdrop-filter: var(--blur, blur(8px));
	}

	.post {
		position: relative;
		display: block;
		width: 100%;
		height: 40px;
		color: var(--fgOnAccent);
		font-weight: bold;
		text-align: left;

		&:before {
			content: "";
			display: block;
			width: calc(100% - 38px);
			height: 100%;
			margin: auto;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border-radius: 999px;
			background: linear-gradient(90deg, var(--buttonGradateA), var(--buttonGradateB));
		}

		&:hover, &.active {
			&:before {
				background: var(--accentLighten);
			}
		}
	}

	.postIcon {
		position: relative;
		margin-left: 30px;
		margin-right: 8px;
		width: 32px;
	}

	.postText {
		position: relative;
	}

	.account {
		position: relative;
		display: flex;
		align-items: center;
		padding-left: 30px;
		width: 100%;
		text-align: left;
		box-sizing: border-box;
		margin-top: 16px;
	}

	.avatar {
		display: block;
		flex-shrink: 0;
		position: relative;
		width: 32px;
		aspect-ratio: 1;
		margin-right: 8px;
	}

	.acct {
		display: block;
		flex-shrink: 1;
		padding-right: 8px;
	}

	.middle {
		flex: 1;
	}

	.divider {
		margin: 16px 16px;
		border-top: solid 0.5px var(--divider);
	}

	.item {
		position: relative;
		display: block;
		padding-left: 30px;
		line-height: 2.85rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		width: 100%;
		text-align: left;
		box-sizing: border-box;
		color: var(--navFg);

		&:hover {
			text-decoration: none;
			color: var(--navHoverFg);
		}

		&.active {
			color: var(--navActive);
		}

		&:hover, &.active {
			color: var(--accent);

			&:before {
				content: "";
				display: block;
				width: calc(100% - 34px);
				height: 100%;
				margin: auto;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				border-radius: 999px;
				background: var(--accentedBg);
			}
		}
	}

	.itemIcon {
		position: relative;
		width: 32px;
		margin-right: 8px;
	}

	.itemIndicator {
		position: absolute;
		top: 0;
		left: 20px;
		color: var(--navIndicator);
		font-size: 8px;
		animation: blink 1s infinite;
	}

	.itemText {
		position: relative;
		font-size: 0.9em;
	}
}

.root.iconOnly {
	flex: 0 0 var(--nav-icon-only-width);
	width: var(--nav-icon-only-width);

	.body {
		width: var(--nav-icon-only-width);
	}

	.top {
		position: sticky;
		top: 0;
		z-index: 1;
		padding: 20px 0;
		background: var(--X14);
		-webkit-backdrop-filter: var(--blur, blur(8px));
		backdrop-filter: var(--blur, blur(8px));
	}

	.instance {
		display: block;
		text-align: center;
		width: 100%;
	}

	.instanceIcon {
		display: inline-block;
		width: 30px;
		aspect-ratio: 1;
	}

	.bottom {
		position: sticky;
		bottom: 0;
		padding: 20px 0;
		background: var(--X14);
		-webkit-backdrop-filter: var(--blur, blur(8px));
		backdrop-filter: var(--blur, blur(8px));
	}

	.post {
		display: block;
		position: relative;
		width: 100%;
		height: 52px;
		margin-bottom: 16px;
		text-align: center;

		&:before {
			content: "";
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 52px;
			aspect-ratio: 1/1;
			border-radius: 100%;
			background: linear-gradient(90deg, var(--buttonGradateA), var(--buttonGradateB));
		}

		&:hover, &.active {
			&:before {
				background: var(--accentLighten);
			}
		}
	}

	.postIcon {
		position: relative;
		color: var(--fgOnAccent);
	}

	.postText {
		display: none;
	}

	.account {
		display: block;
		text-align: center;
		width: 100%;
	}

	.avatar {
		display: inline-block;
		width: 38px;
		aspect-ratio: 1;
	}

	.acct {
		display: none;
	}

	.middle {
		flex: 1;
	}

	.divider {
		margin: 8px auto;
		width: calc(100% - 32px);
		border-top: solid 0.5px var(--divider);
	}

	.item {
		display: block;
		position: relative;
		padding: 18px 0;
		width: 100%;
		text-align: center;

		&:hover, &.active {
			text-decoration: none;
			color: var(--accent);

			&:before {
				content: "";
				display: block;
				height: 100%;
				aspect-ratio: 1;
				margin: auto;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				border-radius: 999px;
				background: var(--accentedBg);
			}

			> .icon,
			> .text {
				opacity: 1;
			}
		}
	}

	.itemIcon {
		display: block;
		margin: 0 auto;
		opacity: 0.7;
	}

	.itemText {
		display: none;
	}

	.itemIndicator {
		position: absolute;
		top: 6px;
		left: 24px;
		color: var(--navIndicator);
		font-size: 8px;
		animation: blink 1s infinite;
	}
}
</style>

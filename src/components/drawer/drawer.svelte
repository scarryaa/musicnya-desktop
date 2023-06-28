<script>
	import { drawerOpen, drawerRightOpen } from '../../stores/app.store';

	export function toggle() {
		drawerOpen.update((b) => !b);
	}

	export function toggleRight() {
		drawerRightOpen.update((b) => !b);
	}
</script>

<div class="drawer">
	<div class="drawer__left" style="--drawer-left-width: {`${$drawerOpen ? 14 : 5}rem`};">
		<div class="top-left">
			<slot name="top-left" />
		</div>
		<div class="bottom-left">
			<slot name="bottom-left" />
		</div>
	</div>
	<div class="drawer__main">
		<slot name="main" />
	</div>
	<div class="drawer__right" style="--drawer-right-width: {`${$drawerRightOpen ? 14 : 0}rem`}">
		<slot name="right" />
	</div>
</div>

<style lang="scss">
	@use '../../variables.scss' as *;

	$drawer-main-width: 100%;
	$drawer-background: #ffffff;
	$drawer-background-dark: #ffffff;
	$item-margin: 1.6rem;
	$drawer-height: calc(100% - $footer-height - 2rem);
	$drawer-text-color: #000000;
	$drawer-text-color-hover: #494949;
	$drawer-text-color-active: #a0a0a0;
	$drawer-bottom-left-height: calc(100% - $footer-height - 7.1rem);

	.drawer {
		width: 100vw;
		height: $drawer-height;
		margin: 0;
		display: flex;
		margin-bottom: 1rem;

		.drawer__left {
			position: relative;
			width: var(--drawer-left-width);
			height: calc(100% + 0.25rem);
			margin: 0.5rem;
			margin-right: 0;
			flex-grow: 0;
			flex-shrink: 0;

			.top-left {
				display: flex;
				flex-direction: column;
				font-size: 2rem;
				justify-content: flex-start;
				align-items: flex-start;
				background-color: $drawer-background-dark;
				border-radius: $border-radius;

				:global(> *) {
					flex-direction: column;
					font-size: 2rem;
					justify-content: center;
					align-items: center;
					margin-left: $item-margin;
				}

				:global(> * > *) {
					margin-block: 0.75rem;
				}
			}

			.bottom-left {
				margin-top: 8px;
				display: flex;
				flex-direction: column;
				font-size: 2rem;
				height: $drawer-bottom-left-height;
				background-color: $drawer-background-dark;
				border-radius: $border-radius;
				width: 100%;

				:global(> *) {
					display: flex;
					flex-direction: column;
					font-size: 2rem;
					justify-content: flex-start;
					align-items: flex-start;
					width: 100%;
					height: calc(100% + 0.8rem);
					margin-left: $item-margin;
				}

				:global(> * > *) {
					margin-block: 0.75rem;
				}
			}
		}

		.drawer__right {
			position: relative;
			width: var(--drawer-right-width);
			height: 100%;
			margin: 0;
			margin-left: 0;
			flex-grow: 0;
			flex-shrink: 0;
			background-color: $drawer-background-dark;
			border-radius: $border-radius;

			:global(> *) {
				display: flex;
				flex-direction: column;
				font-size: 2rem;
				justify-content: flex-start;
				align-items: flex-start;
				width: 100%;
				height: calc(100% + 0.8rem);
				margin-left: $item-margin;
			}

			:global(> * > *) {
				margin-block: 0.75rem;
			}
		}

		.drawer__main {
			position: relative;
			width: $drawer-main-width;
			height: 100%;
			background-color: $drawer-background;
			border-radius: $border-radius;
			margin: 0.5rem;
			overflow: hidden;

			:global(> *) {
				position: relative;
				height: 100%;
			}
		}
	}
</style>

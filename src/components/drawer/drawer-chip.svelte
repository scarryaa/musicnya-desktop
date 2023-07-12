<script>
	import { drawerOpen } from '../../stores/app.store';
</script>

<button
	class="drawer-chip"
	tabindex="0"
	on:click
	on:keydown
	style="--shown:{$drawerOpen ? 'block' : 'none'}"
>
	<slot />
</button>

<style lang="scss">
	@use '../../variables.scss' as *;

	:root[data-theme='light'] {
		--drawer-chip-background: #474747;
		--drawer-chip-background-hover: #616161;
		--drawer-chip-background-active: #a0a0a0;
		--drawer-chip-background-inverse: #ffffff;
		--drawer-chip-background-inverse-hover: #d1d1d1;
		--drawer-chip-background-inverse-active: #a5a5a5;
	}

	:root[data-theme='dark'] {
		--drawer-chip-background: #d3d3d3;
		--drawer-chip-background-hover: #a7a7a7;
		--drawer-chip-background-active: #7e7e7e;
		--drawer-chip-background-inverse: #474747;
		--drawer-chip-background-inverse-hover: #616161;
		--drawer-chip-background-inverse-active: #a0a0a0;
	}

	:root {
		--drawer-chip-width: 2.6rem;
		--drawer-chip-height: 2.6rem;
		--drawer-chip-border-radius: 50%;
		--drawer-chip-gap: 2rem;
	}

	:global(.link.active) {
		button {
			background-color: var(--drawer-chip-background-active) !important;
		}
	}

	.drawer-chip {
		border-radius: 50%;
		background-color: var(--drawer-chip-background);
		width: var(--drawer-chip-width);
		height: var(--drawer-chip-height);
		color: var(--text-inverse);
		outline-offset: 1px;

		:global(:is(svg)) {
			vertical-align: text-bottom;
			margin-left: 1px;
			font-size: 1.6rem;
		}

		&:hover {
			background-color: var(--drawer-chip-background-hover);
		}

		&:focus-visible {
			background-color: var(--drawer-chip-background-hover);
		}

		&:active {
			background-color: var(--drawer-chip-background-active);
		}
	}
</style>

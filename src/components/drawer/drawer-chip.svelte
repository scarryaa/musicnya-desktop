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

	$drawer-chip-background: #474747;
	$drawer-chip-background-hover: #616161;
	$drawer-chip-background-active: #a0a0a0;
	$drawer-chip-background-inverse: #ffffff;
	$drawer-chip-background-inverse-hover: #d1d1d1;
	$drawer-chip-background-inverse-active: #a5a5a5;
	$drawer-chip-width: 2.6rem;
	$drawer-chip-height: 2.6rem;
	$drawer-chip-border-radius: 50%;
	$drawer-chip-gap: 2rem;

	:global(.link.active) {
		button {
			background-color: $drawer-chip-background-active !important;
		}
	}

	.drawer-chip {
		border-radius: 50%;
		background-color: $drawer-chip-background;
		width: $drawer-chip-width;
		height: $drawer-chip-height;
		color: $text-inverse;
		outline-offset: 1px;

		:global(:is(svg)) {
			vertical-align: text-bottom;
			margin-left: 1px;
			font-size: 1.6rem;
		}

		&:hover {
			background-color: $drawer-chip-background-hover;
		}

		&:focus-visible {
			background-color: $drawer-chip-background-hover;
		}

		&:active {
			background-color: $drawer-chip-background-active;
		}
	}
</style>

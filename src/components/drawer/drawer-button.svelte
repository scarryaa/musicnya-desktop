<script lang="ts">
	import { drawerOpen } from '../../stores/app.store';

	export let title: string = '';
</script>

<div class="drawer-button" on:click on:keydown {title}>
	<button class="drawer-button__button" style="--shown:{$drawerOpen ? 'block' : 'none'}">
		<slot name="icon" />
		<slot class="text" />
	</button>
</div>

<style lang="scss">
	@use '../../variables.scss' as *;

	:global(.link.active) {
		button {
			color: var(--text-very-light) !important;
		}
	}

	.drawer-button {
		-webkit-user-drag: none;
		width: 2rem;
		height: 2rem;
		display: var(--showPlus);
		margin-left: var(--margin-left, 0rem);
		> button {
			display: flex;
			flex-direction: row;
			font-size: 1.8rem;
			margin: -2px;
			padding: 2px;
			color: var(--text);

			:global(span) {
				margin-left: 0.8rem;
				font-size: 1.2rem;
				display: var(--shown);
				align-self: center;
				margin-top: 0.1rem;
				padding-right: 0.1rem;
			}

			&:hover {
				color: var(--text-light);
			}

			&:focus-visible {
				color: var(--text-light);
			}

			&:active {
				color: var(--text-very-light);
			}
		}
	}
</style>

<script lang="ts">
	import Close from 'svelte-material-icons/Close.svelte';

	export let component: ConstructorOfATypedSvelteComponent;
	export let width: number = 400;
	export let height: number = 300;
</script>

<div class="modal">
	<div class="modal__content" style="width: {width}px; height: {height}px;">
		<button
			class="modal__buttons__button"
			on:click={() => document.querySelector('.modal')?.remove()}
		>
			<Close />
		</button>
		<div class="modal__content__scrollable">
			<svelte:component this={component} />
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../variables.scss' as *;

	:root[data-theme='dark'] {
		--modal-background: #141414;
	}

	:root[data-theme='light'] {
		--modal-background: #ffffff;
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999999999;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(10px);

		&__content {
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: var(--modal-background);
			border-radius: 0.4rem;
			overflow-y: overlay;
			padding: 1.6rem;
			color: var(--text);
			overflow: hidden;
		}

		&__buttons__button {
			// Position to right of modal
			position: absolute;
			top: 0.6rem;
			right: 1rem;
			width: 1.5rem;
			height: 1.5rem;
			display: block;
			flex-direction: row;

			&:hover {
				background-color: rgba(255, 255, 255, 0.6);
				filter: box-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
			}
		}
	}
</style>

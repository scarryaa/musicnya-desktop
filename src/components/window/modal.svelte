<script>
	import Close from 'svelte-material-icons/Close.svelte';

	export let component;

	export const show = () => {
		const modal = document.createElement('div');
		modal.classList.add('modal');
		document.body.appendChild(modal);
	};

	export const hide = () => {
		document.querySelector('.modal').remove();
	};
</script>

<div class="modal">
	<div class="modal__content">
		<button
			class="modal__buttons__button"
			on:click={() => document.querySelector('.modal').remove()}
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

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(10px);

		&__content {
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 80%;
			height: 80%;
			background-color: white;
			border-radius: 0.4rem;
			overflow-y: scroll;
			padding: 1.6rem;
		}

		&__buttons__button {
			// Position to right of modal
			position: absolute;
			top: 0.6rem;
			right: 0rem;
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

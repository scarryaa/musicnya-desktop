<script lang="ts">
	import { hide } from '$lib/services/modal.service';
	import { onMount } from 'svelte';
	import ButtonFilled from './buttons/button-filled.svelte';
	import Check from 'svelte-material-icons/Check.svelte';
	import Close from 'svelte-material-icons/Close.svelte';

	// focus input on mount
	onMount(() => {
		const input = document.getElementById('playlist-name') as HTMLInputElement;
		input.focus();
	});

	export const handleInput = (e: InputEvent) => {
		// close modal on escape key
		if (e.key === 'Escape') {
			hide();
		}

		// close modal on enter key
		if (e.key === 'Enter') {
			hide();
		}
	};
</script>

<div class="rename-wrapper">
	<div class="rename-wrapper__title">Rename Playlist</div>
	<div class="rename-wrapper__input">
		<input type="text" placeholder="Playlist Name" id="playlist-name" on:keydown={handleInput} />
	</div>
	<div class="rename-wrapper__buttons">
		<ButtonFilled
			text="Rename"
			id="rename"
			on:click={hide}
			width="10rem"
			height="2rem"
			icon={Check}
			bg="#000"
		/>
		<ButtonFilled
			text="Cancel"
			id="cancel"
			on:click={hide}
			width="10rem"
			height="2rem"
			icon={Close}
			bg="#000"
		/>
	</div>
</div>

<style lang="scss">
	@use '../variables.scss' as *;

	.rename-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 0 1rem;

		&__title {
			font-size: 1.5rem;
			font-weight: 600;
			margin-bottom: 1rem;
		}

		&__input {
			width: 100%;
			margin-bottom: 1rem;
			transform: translateX(20%);

			input {
				padding: 0.5rem;
				margin-inline: auto;
				border-radius: 0.25rem;
				border: 1px solid red;
				color: #000;
				font-size: 1rem;
				font-weight: 500;
				outline: none;
			}
		}

		&__buttons {
			display: flex;
			gap: 1rem;

			button {
				width: 10rem;
				background-color: #9c1f1f;
				color: #fff;
				border: none;
				border-radius: 0.5rem;
				padding: 0.5rem 1rem;
			}
		}
	}
</style>

<script>
	// @ts-nocheck

	import WindowMinimize from 'svelte-material-icons/WindowMinimize.svelte';
	import CropSquare from 'svelte-material-icons/CropSquare.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
</script>

<div class="window-buttons">
	<button class="minimize" on:click={() => window.api.send('minimize-window')}>
		<WindowMinimize />
	</button>
	<button class="maximize" on:click={() => window.api.send('maximize-window')}>
		<CropSquare />
	</button>
	<button class="close" on:click={() => window.api.send('close-window')}>
		<Close />
	</button>
</div>

<style lang="scss">
	@use '../../variables.scss' as *;

	.window-buttons {
		display: flex;
		flex-direction: row;
		margin-top: 0.4rem;
		margin-left: auto;
		margin-right: 1.1rem;
		z-index: 99;
		-webkit-app-region: no-drag;

		.minimize,
		.maximize,
		.close {
			width: 1.5rem;
			height: 1.5rem;
			display: block;
			flex-direction: row;

			&:hover {
				background-color: rgba(255, 255, 255, 0.6);
			}
		}

		.close {
			&:hover {
				color: white;
				background-color: red;
			}
		}
	}
</style>

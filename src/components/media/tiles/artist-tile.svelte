<script lang="ts">
	import ButtonPlay from '../../../components/buttons/button-play.svelte';
	import Play from 'svelte-material-icons/Play.svelte';
	import Plus from 'svelte-material-icons/Plus.svelte';

	export let src: string;
	export let title: string;
	export let id: string;
</script>

<div class="artist-tile">
	<div class="artist-tile__overlay">
		<div class="artist-tile__overlay__icons">
			<ButtonPlay color="white" size="3rem" />
		</div>
	</div>
	<img {src} alt="Album Art" loading="eager" />
	<div class="artist-info">
		<div class="artist-title">{title}</div>
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.artist-tile {
		display: flex;
		flex-direction: column;

		&:hover .artist-tile__overlay {
			opacity: 1;
		}

		img {
			aspect-ratio: 1;
			border-radius: 50%;
			min-height: 8.5rem;
			min-width: 8.5rem;
		}

		.artist-tile__overlay {
			background-color: rgba(0, 0, 0, 0.5);
			width: 100%;
			height: 100%;
			transition: background-color 0.2s ease-in-out 0.1s, opacity 0.2s ease-in-out;
			opacity: 0;

			.artist-tile__overlay__icons {
				position: absolute;
				top: 50%;
				transform: translate(95%, -85%);
				filter: drop-shadow($drop-shadow);
			}
		}

		.artist-info {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
			text-align: center;
		}
	}
</style>

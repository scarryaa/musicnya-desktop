<script lang="ts">
	import ButtonOptions from '../../../components/buttons/button-options.svelte';
	import ButtonPlay from '../../../components/buttons/button-play.svelte';

	export let id: string;
	export let artistId: string;
	export let src: string;
	export let title: string;
	export let artist: string;
	export let year: string;
	export let subtitle: 'artist' | 'year' = 'artist';
</script>

<div class="album-tile">
	<div class="album-overlay-container">
		<div class="album-overlay">
			<ButtonPlay />
			<ButtonOptions />
		</div>
		<img {src} alt="" />
	</div>
	<div class="album-info">
		<a href="/media/album/{id}" class="album-title">{title}</a>
		{#if subtitle === 'artist'}
			<a href="/media/artist/{artistId}" class="album-artist">{artist}</a>
		{:else if subtitle === 'year'}
			<div class="album-year">{year}</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;
	$drop-shadow: 0 0 1px rgba(0, 0, 0, 0.2);

	.album-tile {
		margin-top: 0.2rem;
		align-items: center;
		border-radius: $border-radius-half;
		max-width: 12rem;
		max-height: 12rem;
		display: flex;
		flex-direction: column;
		aspect-ratio: 1;
		align-items: flex-start;
		filter: drop-shadow($drop-shadow);
		overflow: visible;

		.album-overlay-container {
			z-index: 99;
			position: relative;
			width: 100%;
			height: 100%;
			border-radius: $border-radius-half;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			transition: all 0.2s ease-in-out;

			&:hover .album-overlay,
			&:focus-within .album-overlay {
				background-color: rgba(0, 0, 0, 0.4);
				opacity: 1;
			}

			.album-overlay {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				width: 100%;
				height: 100%;
				transition: all 0.2s ease-in-out;
				opacity: 0;
			}
		}

		img {
			border-radius: $border-radius-half;
			min-width: 10rem;
			max-width: 12rem;
		}

		.album-info {
			min-width: 10rem;
			max-width: 12rem;
			display: flex;
			flex-direction: column;
			margin-top: 0.5rem;

			.album-title {
				max-width: 100%;
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				overflow: hidden;
				overflow-y: visible;
				text-overflow: ellipsis;

				&:hover {
					text-decoration: underline;
				}
			}

			.album-artist,
			.album-year {
				max-width: 100%;
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: $text-light;
				overflow-y: visible;
			}

			.album-artist {
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>

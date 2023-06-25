<script lang="ts">
	import ButtonPlay from '../../../components/buttons/button-play.svelte';
	import { play } from '../../../lib/services/playback-service';

	export let id: string;
	export let title: string;
	export let artist: string;
	export let src: string;
	export let subtitle: 'artist' | 'year' = 'artist';
	export let year: string;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="song-tile-wrapper" on:dblclick={() => play('song', id)}>
	<div
		class="song-tile"
		tabindex="0"
		on:keydown={(e) => (e.key === ('Enter' || 'Space') ? play('song', id) : null)}
	>
		<img {src} alt="Album Art" loading="eager" />
		<div class="song-tile__overlay">
			<div class="song-tile__overlay__icons">
				<ButtonPlay color="white" size="2rem" on:click={() => play('song', id)} />
			</div>
		</div>
		<div class="song-info">
			<div class="song-title">{title}</div>
			{#if subtitle === 'artist'}
				<div class="song-artist">{artist}</div>
			{:else if subtitle === 'year'}
				<div class="song-year">{year}</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.song-tile-wrapper {
		transition: background-color 0.2s ease-in-out 0.1s, opacity 0.2s ease-in-out;
		&:focus-visible .song-tile {
			background-color: rgba(0, 0, 0, 0.1);
		}

		&:focus-visible .song-tile__overlay,
		&:focus-within .song-tile__overlay {
			opacity: 1;
		}

		&:focus-within .song-tile {
			background-color: rgba(0, 0, 0, 0.1);
		}

		&:hover .song-tile__overlay {
			opacity: 1;
		}
	}

	.song-tile__overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: background-color 0.2s ease-in-out 0.1s, opacity 0.2s ease-in-out;
		opacity: 0;

		.song-tile__overlay__icons {
			position: absolute;
			top: 50%;
			transform: translate(50%, -50%);
			filter: drop-shadow($drop-shadow);
		}
	}

	.song-tile {
		display: flex;
		flex-direction: row;
		position: relative;
		padding: 0.5rem;
		max-width: 14rem;
		margin-right: 0.5rem;
		border-radius: $border-radius-half;
		transition: background-color 0.2s ease-in-out 0.1s, opacity 0.2s ease-in-out;

		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}

		img {
			height: 50px;
			object-fit: cover;
			border-radius: $border-radius-half;
			filter: drop-shadow($drop-shadow);
		}

		.song-info {
			display: flex;
			flex-direction: column;
			margin-left: 0.8rem;
			justify-content: center;
			max-width: 100%;
			overflow: hidden;

			.song-title {
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				max-width: 100%;
				filter: drop-shadow($drop-shadow-light);
			}

			.song-artist,
			.song-year {
				align-self: flex-start;
				font-size: 0.9rem;
				font-weight: 400;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: $text-light;
				max-width: 100%;
				justify-content: center;
				filter: drop-shadow($drop-shadow-light);
			}

			.song-artist {
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>

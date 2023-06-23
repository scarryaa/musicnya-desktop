<script lang="ts">
	export let title: string;
	export let artist: string;
	export let src: string;
	export let subtitle: 'artist' | 'year' = 'artist';
	export let year: string;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="song-tile-wrapper" tabindex="0">
	<div class="song-tile">
		<img {src} alt="Album Art" loading="eager" />
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
		margin: 0.5rem 0;

		&:focus-visible {
			background-color: rgba(0, 0, 0, 0.1);
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

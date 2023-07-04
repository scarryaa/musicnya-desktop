<script lang="ts">
	import { nowPlayingItem } from '../../../stores/musickit.store';
</script>

<div class="now-playing-tile">
	<img
		loading="lazy"
		style="visibility: {$nowPlayingItem ? 'visible' : 'hidden'}"
		src={($nowPlayingItem?.attributes?.artwork?.url)
			.replace('{w}x{h}', '60x60')
			.replace('{f}', 'webp')}
		alt="Album Artwork"
	/>
	<div class="song-info">
		<!-- /media/{$nowPlayingItem?._container?.type?.slice(0, -1)}/{$nowPlayingItem?._container
				?.id -->
		<a
			class="song-title"
			title={$nowPlayingItem?.attributes?.name || ''}
			href="/media/album/{$nowPlayingItem?.assets?.[0]?.metadata?.playlistId ||
				$nowPlayingItem?.href?.split('/')[3]}">{$nowPlayingItem?.attributes?.name || ''}</a
		>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<a
			class="song-artist"
			href={`/media/artist/${$nowPlayingItem?.assets?.[0]?.metadata?.artistId}`}
			title={$nowPlayingItem?.artistName || ''}>{$nowPlayingItem?.artistName || ''}</a
		>
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.now-playing-tile {
		display: flex;
		flex-direction: row;
		position: relative;
		margin-left: 0.95rem;
		margin-top: 0.6rem;
		flex-grow: 0.2;

		img {
			display: block;
			border: 1px solid $border;
			min-width: 60px;
			min-height: 60px;
			max-width: 60px;
			object-fit: cover;
			border-radius: $border-radius-half;
			filter: drop-shadow($drop-shadow);
		}

		.song-info {
			display: flex;
			flex-direction: column;
			margin-left: 0.8rem;
			margin-top: 0.5rem;
			flex-grow: 0;
			max-width: 12vw;
			min-width: 12vw;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			.song-title {
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				max-width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;

				&:hover {
					text-decoration: underline;
				}
			}

			.song-artist {
				max-width: 100%;
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: var(--text-light);

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>

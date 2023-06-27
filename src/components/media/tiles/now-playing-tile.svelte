<script>
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
		<div class="song-title">{$nowPlayingItem?.attributes?.name || ''}</div>
		<div class="song-artist">{$nowPlayingItem?.artistName || ''}</div>
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
			}

			.song-artist {
				max-width: 100%;
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: $text-light;
			}
		}
	}
</style>

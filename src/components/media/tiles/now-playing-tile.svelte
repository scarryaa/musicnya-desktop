<div class="now-playing-tile">
	<img src="https://via.placeholder.com/60" alt="Album Art" />
	<div class="song-info">
		<div class="song-title">Song Title</div>
		<div class="song-artist">Song Artist</div>
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
			object-fit: cover;
			border-radius: $border-radius-half;
			filter: drop-shadow($drop-shadow);
		}

		.song-info {
			display: flex;
			flex-direction: column;
			margin-left: 0.8rem;
			margin-top: 0.5rem;

			.song-title {
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.song-artist {
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

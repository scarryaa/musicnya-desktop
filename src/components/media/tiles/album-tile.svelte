<script lang="ts">
	export let src: string;
	export let href: string;
	export let title: string;
	export let artist: string;
</script>

<div class="album-tile">
	<img {src} alt="" />
	<div class="album-info">
		<div class="album-title">{title}</div>
		<div class="album-artist">{artist}</div>
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.album-tile {
		margin-top: 1rem;
		align-items: center;
		border-radius: $border-radius-half;

		img {
			border-radius: $border-radius-half;
			filter: drop-shadow($drop-shadow);
			min-width: 10rem;
			max-width: 10rem;
		}

		.album-info {
			display: flex;
			flex-direction: column;
			margin-top: 0.5rem;

			.album-title {
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.album-artist {
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

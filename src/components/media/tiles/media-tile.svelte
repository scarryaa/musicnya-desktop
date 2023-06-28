<script lang="ts">
	export let title: string;
	export let artist: string;
	export let src: string;
	export let href: string;
	export const tabindex: string = '';
</script>

<a class="album-tile" role="button" tabindex="0" on:click on:keydown {href}>
	<img {src} alt="Album Art" loading="lazy" />
	<div class="album-info">
		<div class="album-title">{title}</div>
		<div class="album-artist">{artist}</div>
	</div>
</a>

<style lang="scss">
	@use '../../../variables.scss' as *;

	$media-tile-background-hover: rgba(0, 0, 0, 0.05);
	$media-tile-background-active: rgba(0, 0, 0, 0.15);

	:global(button.link.active .album-tile) {
		background-color: $media-tile-background-active !important;
	}

	.album-tile {
		width: 112%;
		height: 3.5rem;
		display: flex;
		flex-direction: row;
		border-radius: $border-radius-half;
		outline-offset: -2px;

		img {
			object-fit: scale-down;
			border-radius: $border-radius-half;
			filter: drop-shadow($drop-shadow);
			max-width: 50px;
			max-height: 50px;
			padding-left: 3px;
			padding-top: 3px;
		}

		&:hover {
			background-color: $media-tile-background-hover;

			img {
				filter: brightness(1.1);
				border-radius: $border-radius-half;
				filter: drop-shadow($drop-shadow);
			}
		}

		&:focus-visible {
			background-color: $media-tile-background-hover;

			img {
				filter: brightness(1.1);
				border-radius: $border-radius-half;
				filter: drop-shadow($drop-shadow);
			}
		}

		&:active {
			background-color: $media-tile-background-active;
		}

		.album-info {
			display: var(--showInfo);
			flex-direction: column;
			margin-top: 0.6rem;
			margin-left: 1rem;
			text-align: left;
			padding-right: 12px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			.album-title {
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.album-artist {
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				color: $text-light;
			}
		}
	}
</style>

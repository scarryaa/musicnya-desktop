<script lang="ts">
	import {
		_addToListenLater,
		_playLater,
		_playNext,
		addToLibrary,
		addToPlaylist,
		dislike,
		dislikePlaylist,
		favorite,
		favoritePlaylist,
		playAlbum,
		removeFromLibrary,
		renamePlaylist,
		share,
		sharePlaylist,
		unfavorite,
		unfavoritePlaylist
	} from '$lib/api/actions.api';
	import { setUpAlbumTileMenu, setUpPlaylistTileMenu } from '$lib/api/context-menu.api';

	export let title: string;
	export let artist: string;
	export let src: string;
	export let href: string;
	export const tabindex: string = '';

	export let id: string;
	export let type: string = 'library-playlists';
	export let shareLink: string | undefined;
	export let inLibrary: boolean | undefined = undefined;
	export let favorited: -1 | 0 | 1 | undefined = undefined;
</script>

<a
	class="album-tile"
	role="button"
	tabindex="0"
	on:click
	on:keydown
	{href}
	on:contextmenu={(e) => {
		e.preventDefault();
		setUpPlaylistTileMenu(
			e,
			this,
			id,
			type,
			renamePlaylist,
			unfavoritePlaylist,
			favoritePlaylist,
			dislikePlaylist,
			playAlbum,
			_playNext,
			_playLater,
			sharePlaylist,
			favorited,
			inLibrary
		);
	}}
>
	<img {src} alt="Album Art" loading="lazy" />
	<div class="album-info">
		<div class="album-title">{title}</div>
		<div class="album-artist">{artist}</div>
	</div>
</a>

<style lang="scss">
	@use '../../../variables.scss' as *;

	:root[data-theme='dark'] {
		--media-tile-background-hover: rgba(255, 255, 255, 0.05);
		--media-tile-background-active: rgba(255, 255, 255, 0.15);
	}

	:root[data-theme='light'] {
		--media-tile-background-hover: rgba(0, 0, 0, 0.05);
		--media-tile-background-active: rgba(0, 0, 0, 0.15);
	}

	:global(button.link.active .album-tile) {
		background-color: var(--media-tile-background-active) !important;
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
			background-color: var(--media-tile-background-hover);

			img {
				filter: brightness(1.1);
				border-radius: $border-radius-half;
				filter: drop-shadow($drop-shadow);
			}
		}

		&:focus-visible {
			background-color: var(--media-tile-background-hover);

			img {
				filter: brightness(1.1);
				border-radius: $border-radius-half;
				filter: drop-shadow($drop-shadow);
			}
		}

		&:active {
			background-color: var(--media-tile-background-active);
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
				color: var(--text);
			}

			.album-artist {
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				color: var(--text-light);
			}
		}
	}
</style>

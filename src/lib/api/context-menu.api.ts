import { developerToken, musicUserToken } from '../../stores/musickit.store';
import { get } from 'svelte/store';
import { createContextMenu } from '../services/context-menu.service';
import type AlbumTile from '../../components/media/tiles/album-tile.svelte';
import type MediaTile from '../../components/media/tiles/media-tile.svelte';
import {
	_playLater,
	_playNext,
	addToPlaylist,
	removeFromLibrary,
	removePlaylistFromLibrary,
	renamePlaylist,
	sharePlaylist
} from './actions.api';

export const setUpQueueItemMenu = async (
	e: MouseEvent,
	id: string,
	type: string,
	unfavorite: (e: MouseEvent, catalogId: string) => void,
	favorite: (e: MouseEvent, catalogId: string) => void,
	dislike: (e: MouseEvent, catalogId: string) => void,
	share: (e: MouseEvent, shareLink?: string) => void,
	addToPlaylist: (e: MouseEvent) => void,
	shareLink?: string,
	favorited?: -1 | 0 | 1,
	inLibrary?: boolean
) => {
	e.preventDefault();
	let catalogId = id;

	createContextMenu({
		x: e.clientX,
		y: e.clientY,
		target: e.target as HTMLElement,
		topItems: [
			favorited === 1
				? {
						text: 'Unlove',
						style: 'solid',
						icon: 'heart',
						action: () => unfavorite(e, catalogId)
				  }
				: {
						text: 'Love',
						style: 'regular',
						icon: 'heart',
						action: () => favorite(e, catalogId)
				  },
			{
				text: 'Dislike',
				style: favorited === -1 ? 'solid' : 'regular',
				icon: 'thumbs-down',
				action: () => dislike(e, catalogId)
			},
			{
				text: 'Remove from queue',
				style: 'solid',
				icon: 'trash',
				action: () => console.log('remove from queue')
			}
		],
		items: [
			{
				text: 'Add to Library',
				style: inLibrary ? 'solid' : 'regular',
				icon: 'plus',
				action: () => addToLibrary(e, catalogId, inLibrary)
			},
			{
				text: 'Add to Playlist',
				style: 'regular',
				icon: 'plus',
				action: () => addToPlaylist(e)
			},
			{
				text: 'Share',
				style: 'regular',
				icon: 'share',
				action: () => share(e, shareLink)
			}
		]
	});
};

export const setUpMediaPageMenu = async (
	e: MouseEvent,
	id: string,
	type: string,
	unfavorite: (e: MouseEvent, catalogId: string) => void,
	favorite: (e: MouseEvent, catalogId: string) => void,
	dislike: (e: MouseEvent, catalogId: string) => void,
	share: (e: MouseEvent, shareLink?: string) => void,
	addToPlaylist: (e: MouseEvent) => void,
	shareLink?: string,
	favorited?: -1 | 0 | 1,
	inLibrary?: boolean
) => {
	e.preventDefault();
	let catalogId = id;

	createContextMenu({
		x: e.clientX,
		y: e.clientY,
		topItems: [
			favorited === 1
				? {
						text: 'Unlove',
						style: 'solid',
						icon: 'heart',
						action: () => unfavorite(e, catalogId)
				  }
				: {
						text: 'Love',
						style: 'regular',
						icon: 'heart',
						action: () => favorite(e, catalogId)
				  },
			favorited === 1 || favorited === 0 || favorited === undefined
				? {
						text: 'Dislike',
						style: 'regular',
						icon: 'thumbs-down',
						action: () => dislike(e, catalogId)
				  }
				: {
						text: 'Undislike',
						style: 'solid',
						icon: 'thumbs-down',
						action: () => unfavorite(e, catalogId)
				  }
		],
		items: [
			{
				text: 'Add to Playlist',
				style: 'solid',
				icon: 'bars',
				action: () => addToPlaylist(e)
			},
			{
				text: 'Share',
				style: 'solid',
				icon: 'square-caret-down',
				action: () => share(e, shareLink)
			}
		],
		target: e.target as HTMLElement
	});
};

export const setUpPlaylistTileMenu = async (
	e: MouseEvent,
	playlistTile: MediaTile,
	id: string,
	type: string,
	renamePlaylist: (e: MouseEvent, type: string, id: string) => void,
	unfavorite: (e: MouseEvent, type: string, catalogId: string, favorited: -1 | 0 | 1) => void,
	favorite: (e: MouseEvent, type: string, catalogId: string, favorited: -1 | 0 | 1) => void,
	dislike: (e: MouseEvent, type: string, catalogId: string, favorited: -1 | 0 | 1) => void,
	play: (e: MouseEvent, type: string, id: string) => void,
	playNext: (e: MouseEvent, type: string, id: string) => void,
	playLater: (e: MouseEvent, type: string, id: string) => void,
	sharePlaylist: (e: MouseEvent, type: string, id: string) => void,
	favorited?: -1 | 0 | 1 | undefined,
	inLibrary?: boolean
) => {
	e.preventDefault();
	let catalogId = id;

	// check if item is favorited
	const _favorited =
		favorited ??
		(await fetch(
			`https://amp-api.music.apple.com/v1/me/ratings/${type}?platform=web&ids=${catalogId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${get(developerToken)}`,
					'media-user-token': get(musicUserToken)
				}
			}
		)
			.then(async (res) => {
				if (res.status === 401) {
					throw new Error('Unauthorized');
				}
				const json = await res.json();
				console.log(json);
				return json;
			})
			.then((res) => res.data?.[0]?.attributes?.value));

	createContextMenu({
		x: e.clientX,
		y: e.clientY,
		topItems: [
			_favorited === 1
				? {
						text: 'Unlove',
						style: 'solid',
						icon: 'heart',
						action: () => unfavorite(e, type, catalogId, _favorited)
				  }
				: {
						text: 'Love',
						style: 'regular',
						icon: 'heart',
						action: () => favorite(e, type, catalogId, _favorited)
				  },
			_favorited === 1 || _favorited === 0 || _favorited === undefined
				? {
						text: 'Dislike',
						style: 'regular',
						icon: 'thumbs-down',
						action: () => dislike(e, type, catalogId, _favorited)
				  }
				: {
						text: 'Undislike',
						style: 'solid',
						icon: 'thumbs-down',
						action: () => unfavorite(e, type, catalogId, _favorited)
				  },
			{
				text: 'Remove from Library',
				style: 'solid',
				icon: 'trash',
				action: () => removePlaylistFromLibrary(e, type, catalogId)
			}
		],
		items: [
			{
				text: 'Add to Playlist',
				style: 'solid',
				icon: 'bars',
				action: () => addToPlaylist(e)
			},
			{
				text: 'Rename',
				style: 'solid',
				icon: 'pencil',
				action: () => renamePlaylist(e, type, catalogId)
			},
			{
				text: 'Share',
				style: 'solid',
				icon: 'square-caret-down',
				action: () => sharePlaylist(e, type, id)
			}
		],
		target: e.target as HTMLElement
	});
};

export const setUpAlbumTileMenu = async (
	e: MouseEvent,
	albumTile: AlbumTile,
	id: string,
	type: string,
	unfavorite: (e: MouseEvent, type: string, catalogId: string, favorited: -1 | 0 | 1) => void,
	favorite: (e: MouseEvent, type: string, catalogId: string, favorited: -1 | 0 | 1) => void,
	dislike: (e: MouseEvent, type: string, catalogId: string, favorited: -1 | 0 | 1) => void,
	play: (e: MouseEvent, type: string, id: string) => void,
	playNext: (e: MouseEvent, type: string, id: string) => void,
	playLater: (e: MouseEvent, type: string, id: string) => void,
	share: (e: MouseEvent, type: string, id: string, shareLink?: string, url?: string) => void,
	addToPlaylist: (e: MouseEvent) => void,
	addToLibrary: (e: MouseEvent, type: string, id: string, inLibrary: boolean) => void,
	removeFromLibrary: (e: MouseEvent, type: string, id: string, albumTile: AlbumTile) => void,
	shareLink?: string,
	favorited?: -1 | 0 | 1,
	inLibrary?: boolean
) => {
	e.preventDefault();
	const onLibraryPage = window.location.pathname.includes('library');
	let catalogId = id;
	const isStation = type === 'station';

	// no menu for stations
	if (isStation) return;

	// if on library page, get catalogId
	if (onLibraryPage) {
		catalogId = await fetch(
			`https://amp-api.music.apple.com/v1/me/library/${type.replace('library-', '')}/${id}/catalog`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${get(developerToken)}`,
					'media-user-token': get(musicUserToken)
				}
			}
		).then(async (res) => {
			if (res.status === 401) {
				throw new Error('Unauthorized');
			}
			const json = await res.json();
			console.log(json);
			return json.data?.[0]?.id;
		});
	}

	// check if item is favorited
	const _favorited =
		favorited ??
		(await fetch(
			`https://amp-api.music.apple.com/v1/me/ratings/${type.replace(
				'library-',
				''
			)}?platform=web&ids=${catalogId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${get(developerToken)}`,
					'media-user-token': get(musicUserToken)
				}
			}
		)
			.then(async (res) => {
				if (res.status === 401) {
					throw new Error('Unauthorized');
				}
				const json = await res.json();
				console.log(json);
				return json;
			})
			.then((res) => res.data?.[0]?.attributes?.value));

	const _inLibrary = onLibraryPage
		? true
		: inLibrary ??
		  (await fetch(
				`https://amp-api.music.apple.com/v1/catalog/us/?ids[${type.replace(
					'library-',
					''
				)}]=${catalogId}&relate=library&fields=inLibrary&extend=tbtcgyep`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${get(developerToken)}`,
						'media-user-token': get(musicUserToken)
					}
				}
		  )
				.then(async (res) => {
					if (res.status === 401) {
						throw new Error('Unauthorized');
					}
					const json = await res.json();
					console.log(json);
					return json;
				})
				.then((res) => res.data?.[0]?.attributes?.inLibrary));

	createContextMenu({
		x: e.clientX,
		y: e.clientY,
		topItems: [
			_favorited === 1
				? {
						text: 'Unlove',
						style: 'solid',
						icon: 'heart',
						action: () => unfavorite(e, type, catalogId, _favorited)
				  }
				: {
						text: 'Love',
						style: 'regular',
						icon: 'heart',
						action: () => favorite(e, type, catalogId, _favorited)
				  },
			_favorited === 1 || _favorited === 0 || _favorited === undefined
				? {
						text: 'Dislike',
						style: 'regular',
						icon: 'thumbs-down',
						action: () => dislike(e, type, catalogId, _favorited)
				  }
				: {
						text: 'Undislike',
						style: 'solid',
						icon: 'thumbs-down',
						action: () => unfavorite(e, type, catalogId, _favorited)
				  }
		],
		items: [
			{
				text: 'Add to Playlist',
				style: 'solid',
				icon: 'bars',
				action: () => addToPlaylist(e)
			},
			_inLibrary
				? {
						text: 'Remove from Library',
						style: 'solid',
						icon: 'minus',
						action: () => removeFromLibrary(e, type, id, albumTile)
				  }
				: {
						text: 'Add to Library',
						style: 'solid',
						icon: 'plus',
						action: () => addToLibrary(e, type, id, _inLibrary)
				  },
			{
				text: 'Play Next',
				style: 'solid',
				icon: 'arrow-turn-up',
				action: () => playNext(e, type, catalogId)
			},
			{
				text: 'Play Last',
				style: 'solid',
				icon: 'arrow-turn-down',
				action: () => playLater(e, type, catalogId)
			},
			{
				text: 'Share',
				style: 'solid',
				icon: 'square-caret-down',
				action: () => share(e, type, catalogId, shareLink)
			}
		],
		target: albumTile as unknown as HTMLElement
	});
};

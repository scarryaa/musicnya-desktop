import { developerToken, musicUserToken } from '../../stores/musickit.store';
import { get } from 'svelte/store';
import { createContextMenu } from '../services/context-menu.service';
import type AlbumTile from '../../components/media/tiles/album-tile.svelte';

export const setUpAlbumTileMenu = async (
	e: MouseEvent,
	albumTile: AlbumTile,
	id: string,
	type: string,
	unfavorite: (e: MouseEvent, catalogId: string) => void,
	favorite: (e: MouseEvent, catalogId: string) => void,
	dislike: (e: MouseEvent, catalogId: string) => void,
	play: (e: MouseEvent) => void,
	playNext: (e: MouseEvent) => void,
	playLater: (e: MouseEvent) => void,
	share: (e: MouseEvent, shareLink?: string) => void,
	addToPlaylist: (e: MouseEvent) => void,
	addToLibrary: (e: MouseEvent) => void,
	removeFromLibrary: (e: MouseEvent) => void,
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
						action: () => unfavorite(e, catalogId)
				  }
				: {
						text: 'Love',
						style: 'regular',
						icon: 'heart',
						action: () => favorite(e, catalogId)
				  },
			_favorited === 1 || _favorited === 0 || _favorited === undefined
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
			_inLibrary
				? {
						text: 'Remove from Library',
						style: 'solid',
						icon: 'minus',
						action: () => removeFromLibrary(e)
				  }
				: {
						text: 'Add to Library',
						style: 'solid',
						icon: 'plus',
						action: () => addToLibrary(e)
				  },
			{
				text: 'Play Next',
				style: 'solid',
				icon: 'arrow-turn-up',
				action: () => playNext(e)
			},
			{
				text: 'Play Last',
				style: 'solid',
				icon: 'arrow-turn-down',
				action: () => playLater(e)
			},
			{
				text: 'Share',
				style: 'solid',
				icon: 'square-caret-down',
				action: () => share(e, shareLink)
			}
		],
		target: albumTile as unknown as HTMLElement
	});
};

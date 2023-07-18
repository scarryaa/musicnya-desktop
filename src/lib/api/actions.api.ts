import { get } from 'svelte/store';
import { developerToken, libraryPlaylists, musicUserToken } from '../../stores/musickit.store';
import type AlbumTile from '../../components/media/tiles/album-tile.svelte';
import {
	addToListenLater,
	inListenLater,
	removeFromListenLater
} from '$lib/services/favorites.service';
import { play, playLater, playNext } from '$lib/services/playback-service';
import { showToast } from '../../components/toast.svelte';
import { show } from '$lib/services/modal.service';
import Rename from '../../components/rename.svelte';

const getHeaders = () => ({
	Authorization: `Bearer ${get(developerToken)}`,
	'media-user-token': get(musicUserToken)
});

const fetchResource = (url: RequestInfo | URL, options: RequestInit | undefined) =>
	fetch(url, { ...options, headers: getHeaders() })
		.then((res) => res.json())
		.catch(console.error);

const fetchRating = async (url: RequestInfo | URL, method: any, value: any) => {
	const body = JSON.stringify({
		attributes: {
			value
		},
		type: 'rating'
	});

	const options = {
		method,
		body
	};

	await fetchResource(url, options);
};

export const playMedia = (
	e: MouseEvent,
	type: string,
	id: string,
	operation: (arg0: string, arg1: string) => void
) => {
	e.preventDefault();
	operation(type.slice(0, -1).replace('library-', ''), id);
};

export const playAlbum = (e: MouseEvent, type: string, id: string) => playMedia(e, type, id, play);

export const _playNext = (e: MouseEvent, type: string, id: string) =>
	playMedia(e, type, id, playNext);

export const _playLater = (e: MouseEvent, type: string, id: string) =>
	playMedia(e, type, id, playLater);

export const addToPlaylist = (e: MouseEvent) => {
	e.preventDefault();
};

export const newPlaylist = (e: MouseEvent) => {
	fetch('https://amp-api.music.apple.com/v1/me/library/playlists', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${get(developerToken)}`,
			'media-user-token': get(musicUserToken)
		},
		body: JSON.stringify({
			attributes: {
				name: 'New Playlist'
			}
		})
	})
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			libraryPlaylists.update((playlists) => [...playlists, json.data[0]]);
		})
		.catch((err) => {
			console.log(err);
		});
};

const writeToClipboard = async (text: string) => {
	if (navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(text);
			showToast('Copied to clipboard!');
		} catch (err) {
			showToast('Unable to copy to clipboard');
		}
	} else {
		showToast('Clipboard API not available');
	}
};

export const handleRating = async (
	e: { preventDefault: () => void },
	type: string,
	catalogId: any,
	favorited: any,
	value: number,
	method: string
) => {
	e.preventDefault();

	const oldVal = favorited;
	const url = `https://amp-api.music.apple.com/v1/me/ratings/${type.replace(
		'library-',
		''
	)}/${catalogId}`;

	try {
		await fetchRating(url, method, value);
		favorited = value;
	} catch (err) {
		console.error(err);
		favorited = oldVal;
	}
};

export const dislike = (e: MouseEvent, type: string, catalogId: string, favorited: -1 | 0 | 1) =>
	handleRating(e, type, catalogId, favorited, -1, 'PUT');

export const unfavorite = (e: MouseEvent, type: string, catalogId: string, favorited: -1 | 0 | 1) =>
	handleRating(e, type, catalogId, favorited, 0, 'DELETE');

export const favorite = (e: MouseEvent, type: string, catalogId: string, favorited: -1 | 0 | 1) =>
	handleRating(e, type, catalogId, favorited, 1, 'PUT');

export const share = async (
	e: MouseEvent,
	type: string,
	id: string,
	shareLink?: string,
	url?: string
) => {
	e.preventDefault();

	if (shareLink) {
		await writeToClipboard(shareLink);
		return;
	}

	if (type?.includes('library')) {
		try {
			const response = await fetch(
				`https://amp-api.music.apple.com/v1/me/library/${type.replace(
					'library-',
					''
				)}/${id}/catalog`,
				{
					method: 'GET',
					headers: getHeaders()
				}
			);

			if (response.status === 401) {
				throw new Error('Unauthorized');
			}

			const json = await response.json();
			url = json['data'][0]['attributes']['url'];
		} catch (err) {
			console.error(err);
			showToast('Error fetching URL');
			return;
		}
	}

	if (url && !type.includes('library')) {
		let shareUrl;
		try {
			shareUrl = url.data[0].attributes.url;
		} catch (err) {
			console.error('Error parsing URL data');
			return;
		}
		await writeToClipboard(shareUrl);
	} else if (url) {
		await writeToClipboard(url);
	} else {
		showToast('No URL provided');
	}
};

export const addToLibrary = async (e: MouseEvent, type: string, id: string) => {
	e.preventDefault();

	// add to library
	await fetch(`https://amp-api.music.apple.com/v1/me/library?ids[${type}]=${id}`, {
		method: 'POST',
		headers: getHeaders()
	});
};

export const renamePlaylist = async (e: MouseEvent, type: string, id: string) => {
	e.preventDefault();

	// show modal
	show(Rename, 500, 400);

	// get name
	const name: string = await new Promise((resolve) => {
		const input = document.getElementById('playlist-name') as HTMLInputElement;
		const button = document.getElementById('rename') as HTMLButtonElement;

		button.addEventListener('click', () => {
			resolve(input.value);
		});

		input.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				resolve(input.value);
			}
		});
	});
	if (!name) return;

	// rename local playlist
	let playlists = get(libraryPlaylists);
	const playlist = playlists.find((playlist) => playlist.id === id);
	if (playlist && playlist.attributes) {
		playlist.attributes.name = name;

		//sort playlists
		playlists = playlists.sort((a, b) => {
			if (a.attributes.name < b.attributes.name) return -1;
			if (a.attributes.name > b.attributes.name) return 1;
			return 0;
		});

		libraryPlaylists.update((playlists) => playlists);
	}

	// rename playlist
	await fetch(
		`https://amp-api.music.apple.com/v1/me/library/${type.replace('library-', '')}/${id}`,
		{
			method: 'PUT',
			headers: getHeaders(),
			body: JSON.stringify({
				attributes: {
					name
				},
				type: 'library-playlists'
			})
		}
	);
};

export const removePlaylistFromLibrary = async (e: MouseEvent, type: string, id: string) => {
	e.preventDefault();

	// remove from library
	await fetch(
		`https://amp-api.music.apple.com/v1/me/library/${type.replace(
			'library-',
			''
		)}/${id}?art[url]=f`,
		{
			method: 'DELETE',
			headers: getHeaders()
		}
	);

	libraryPlaylists.update((libraryPlaylists) => {
		const index = libraryPlaylists.findIndex((playlist) => playlist.id === id);
		libraryPlaylists.splice(index, 1);
		return libraryPlaylists;
	});
};

export const removeFromLibrary = async (
	e: MouseEvent,
	type: string,
	id: string,
	albumTile: AlbumTile
) => {
	e.preventDefault();

	// remove from library
	await fetch(
		`https://amp-api.music.apple.com/v1/me/library/${type.replace(
			'library-',
			''
		)}/${id}?art[url]=f`,
		{
			method: 'DELETE',
			headers: getHeaders()
		}
	).finally(() => {
		if (window.location.pathname.includes('library')) {
			albumTile.remove();
		}
	});
};

export const _addToListenLater = (
	e: MouseEvent,
	type: string,
	id: string,
	title: string,
	src: string,
	artist: string,
	artistId: string
) => {
	e.preventDefault();
	inListenLater(type.slice(0, -1), id)
		? removeFromListenLater(type.slice(0, -1), id)
		: addToListenLater(type, id, title, src, artist, artistId);
};

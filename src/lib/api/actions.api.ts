import { get } from 'svelte/store';
import { developerToken, libraryPlaylists, musicUserToken } from '../../stores/musickit.store';
import type AlbumTile from '../../components/media/tiles/album-tile.svelte';
import {
	addToListenLater,
	inListenLater,
	removeFromListenLater
} from '$lib/services/favorites.service';
import { play, playLater, playNext } from '$lib/services/playback-service';
import { show } from '$lib/services/modal.service';

export const playAlbum = (e: MouseEvent, type: string, id: string) => {
	e.preventDefault();
	play(type.slice(0, -1).replace('library-', ''), id);
};

export const _playNext = (e: MouseEvent, type: string, id: string) => {
	e.preventDefault();
	playNext(type.slice(0, -1).replace('library-', ''), id);
};

export const _playLater = (e: MouseEvent, type: string, id: string) => {
	e.preventDefault();
	playLater(type.slice(0, -1).replace('library-', ''), id);
};

export const addToPlaylist = (e: MouseEvent) => {
	e.preventDefault();
	show('add-to-playlist');
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

export const dislike = async (
	e: MouseEvent,
	type: string,
	catalogId: string,
	favorited: -1 | 0 | 1
) => {
	e.preventDefault();
	const oldVal = favorited;

	// dislike
	await fetch(
		`https://amp-api.music.apple.com/v1/me/ratings/${type.replace('library-', '')}/${catalogId}`,
		{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${get(developerToken)}`,
				'media-user-token': get(musicUserToken)
			},
			body: JSON.stringify({
				attributes: {
					value: -1
				}
			})
		}
	)
		.then(() => (favorited = -1))
		.catch((err) => {
			console.log(err);
			favorited = oldVal;
		});
};

export const unfavorite = async (
	e: MouseEvent,
	type: string,
	catalogId: string,
	favorited: -1 | 0 | 1
) => {
	e.preventDefault();
	const oldVal = favorited;

	// remove from favorites
	await fetch(
		`https://amp-api.music.apple.com/v1/me/ratings/${type.replace('library-', '')}/${catalogId}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${get(developerToken)}`,
				'media-user-token': get(musicUserToken)
			}
		}
	)
		.then(() => (favorited = 0))
		.catch((err) => {
			console.log(err);
			favorited = oldVal;
		});
};

export const favorite = async (
	e: MouseEvent,
	type: string,
	catalogId: string,
	favorited: -1 | 0 | 1
) => {
	e.preventDefault();
	const oldVal = favorited;

	// add to favorites
	await fetch(
		`https://amp-api.music.apple.com/v1/me/ratings/${type.replace('library-', '')}/${catalogId}`,
		{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${get(developerToken)}`,
				'media-user-token': get(musicUserToken)
			},
			body: JSON.stringify({
				attributes: {
					value: 1
				},
				type: 'rating'
			})
		}
	)
		.then(() => (favorited = 1))
		.catch((err) => {
			console.log(err);
			favorited = oldVal;
		});
};

export const dislikePlaylist = async (
	e: MouseEvent,
	type: string,
	catalogId: string,
	favorited: -1 | 0 | 1
) => {
	e.preventDefault();
	const oldVal = favorited;

	// dislike
	await fetch(`https://amp-api.music.apple.com/v1/me/ratings/${type}/${catalogId}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${get(developerToken)}`,
			'media-user-token': get(musicUserToken)
		},
		body: JSON.stringify({
			attributes: {
				value: -1
			}
		})
	})
		.then(() => (favorited = -1))
		.catch((err) => {
			console.log(err);
			favorited = oldVal;
		});
};

export const unfavoritePlaylist = async (
	e: MouseEvent,
	type: string,
	catalogId: string,
	favorited: -1 | 0 | 1
) => {
	e.preventDefault();
	const oldVal = favorited;

	// remove from favorites
	await fetch(`https://amp-api.music.apple.com/v1/me/ratings/${type}/${catalogId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${get(developerToken)}`,
			'media-user-token': get(musicUserToken)
		}
	})
		.then(() => (favorited = 0))
		.catch((err) => {
			console.log(err);
			favorited = oldVal;
		});
};

export const favoritePlaylist = async (
	e: MouseEvent,
	type: string,
	catalogId: string,
	favorited: -1 | 0 | 1
) => {
	e.preventDefault();
	const oldVal = favorited;

	// add to favorites
	await fetch(`https://amp-api.music.apple.com/v1/me/ratings/${type}/${catalogId}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${get(developerToken)}`,
			'media-user-token': get(musicUserToken)
		},
		body: JSON.stringify({
			attributes: {
				value: 1
			},
			type: 'rating'
		})
	})
		.then(() => (favorited = 1))
		.catch((err) => {
			console.log(err);
			favorited = oldVal;
		});
};

export const sharePlaylist = async (e: MouseEvent, type: string, id: string) => {
	e.preventDefault();
	// copy to clipboard

	const url = await fetch(
		`https://amp-api.music.apple.com/v1/me/library/${type.replace('library-', '')}/${id}/catalog`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${get(developerToken)}`,
				'media-user-token': get(musicUserToken)
			}
		}
	)
		.then((res) => res.json())
		.then((json) => json.data?.[0].attributes.url)
		.catch((err) => {
			console.log(err);
		});

	if (navigator.clipboard && url) {
		navigator.clipboard.writeText(url).then(() => {
			console.log('Copied to clipboard successfully!');
		});
	}
};

export const share = async (
	e: MouseEvent,
	type: string,
	id: string,
	shareLink?: string,
	url?: string
) => {
	e.preventDefault();
	// copy to clipboard
	if (navigator.clipboard && shareLink) {
		navigator.clipboard.writeText(shareLink).then(() => {
			console.log('Copied to clipboard successfully!');
		});
	} else {
		if (window.location.pathname.includes('library')) {
			url = await fetch(
				`https://amp-api.music.apple.com/v1/me/library/${type.replace(
					'library-',
					''
				)}/${id}/catalog`,
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
				return json['data'][0]['attributes']['url'];
			});
		}

		if (url && !window.location.pathname.includes('library')) {
			const shareUrl = url.data[0].attributes.url;
			console.log(shareUrl);
			if (navigator.clipboard && shareUrl) {
				navigator.clipboard.writeText(shareUrl).then(() => {
					console.log('Copied to clipboard successfully!');
				});
			}
		} else {
			navigator.clipboard.writeText(url || '').then(() => {
				console.log('Copied to clipboard successfully!');
			});
		}
	}
};

export const addToLibrary = async (e: MouseEvent, type: string, id: string, inLibrary: boolean) => {
	e.preventDefault();

	// add to library
	await fetch(`https://amp-api.music.apple.com/v1/me/library?ids[${type}]=${id}`, {
		method: 'POST',
		headers: {
			'media-user-token': get(musicUserToken),
			authorization: `Bearer ${get(developerToken)}`
		}
	}).finally(() => {
		inLibrary = true;
	});
};

export const renamePlaylist = async (e: MouseEvent, type: string, id: string) => {
	e.preventDefault();

	// show modal
	const name = undefined;
	if (!name) return;

	// rename playlist
	await fetch(
		`https://amp-api.music.apple.com/v1/me/library/${type.replace('library-', '')}/${id}`,
		{
			method: 'PUT',
			headers: {
				'media-user-token': get(musicUserToken),
				authorization: `Bearer ${get(developerToken)}`
			},
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
			headers: {
				'media-user-token': get(musicUserToken),
				authorization: `Bearer ${get(developerToken)}`
			}
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
			headers: {
				'media-user-token': get(musicUserToken),
				authorization: `Bearer ${get(developerToken)}`
			}
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

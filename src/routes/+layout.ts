import { browser } from '$app/environment';
import { developerToken, libraryPlaylists, musicUserToken } from '../stores/musickit.store';
import type { MusicKit } from '../lib/types/musickit';
import { initMusicKit } from '../lib/api/music.api';
import { addEventHandlers } from '../lib/event-handlers/apple-music-events';
import { getLibraryPlaylists } from '../lib/api/musickit.api';

/**
 * @type {import('@sveltejs/kit').LayoutLoad}
 */
export async function load({ page, session, fetch }) {
	if (browser) {
		return fetch('http://localhost:5173/config.json')
			.then((response) => response.json())
			.then((data) => data)
			.then((data) =>
				MusicKit.configure({
					developerToken: data.DEV_TOKEN,
					app: {
						name: 'Music',
						build: '1.0.0'
					},
					sourceType: 24
				})
					.then((instance) => {
						musicUserToken.set(instance.musicUserToken);
						developerToken.set(instance.developerToken);
						return instance;
					})
					.then((instance) => {
						initMusicKit(instance);
						addEventHandlers(instance);
						getLibraryPlaylists().then((data) => {
							libraryPlaylists.set(data);
						});
					})
					.catch((err) => {
						console.error(err);
					})
			);
	}
	return {
		props: {
			page
		}
	};
}

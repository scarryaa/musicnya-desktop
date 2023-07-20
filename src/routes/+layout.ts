import { browser } from '$app/environment';
import {
	autoplay,
	developerToken,
	libraryPlaylists,
	musicUserToken
} from '../stores/musickit.store';
import { initMusicKit } from '../lib/api/music.api';
import { addEventHandlers } from '../lib/event-handlers/apple-music-events';
import { getLibraryPlaylists } from '../lib/api/musickit.api';
import { loggedIn } from '../stores/app.store';
import { get } from 'svelte/store';

/**
 * @type {import('@sveltejs/kit').LayoutLoad}
 */
export async function load({ page, session, fetch }) {
	if (browser) {
		return fetch('./config.json')
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
						instance._autoplayEnabled = get(autoplay);
						return instance;
					})
					.then((instance) => {
						// check if user is logged in
						loggedIn.set(instance.isAuthorized);
						return instance;
					})
					.then((instance) => {
						initMusicKit(instance);
						addEventHandlers(instance);
						getLibraryPlaylists()
							.then((data) => {
								libraryPlaylists.set(data);
							})
							.catch((err) => {
								console.error(err);
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

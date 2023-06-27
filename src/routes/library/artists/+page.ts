import type { MusicKit } from 'src/lib/types/musickit';
import { developerToken, musicUserToken } from '../../../stores/musickit.store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	return {
		media: await fetch(
			`http://localhost:3001/v1/me/library/artists/?include=catalog&platform=web&limit=100&l=en-us`,
			{
				headers: {
					'media-user-token': get(musicUserToken),
					authorization: `Bearer ${get(developerToken)}`,
					origin: 'https://beta.music.apple.com',
					'access-control-allow-origin': '*',
					'allowed-headers': '*'
				},
				mode: 'cors'
			}
		)
			.then((response) => {
				return response.json().then((json) => {
					console.log(json);
					return json.data;
				});
			})
			.catch((err) => {
				console.log(err);
			})
	};
}

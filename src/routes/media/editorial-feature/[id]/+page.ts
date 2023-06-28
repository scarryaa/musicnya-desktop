import { redirect } from '@sveltejs/kit';
import { developerToken, musicUserToken } from '../../../../stores/musickit.store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	return {
		media: await fetch(
			`
            https://amp-api.music.apple.com/v1/editorial/us/multiplex/${params.id}?art%5Burl%5D=f&format%5Bresources%5D=map&platform=web`,
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
					throw redirect(308, `/media/editorial-elements/${json.results.target.id}`);
				});
			})
			.catch((err) => {
				console.log(err);
			})
	};
}

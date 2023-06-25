import { get } from 'svelte/store';
import { developerToken, musicUserToken } from '../../stores/musickit.store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	fetch(
		`http://localhost:3001/v1/recommendations/us?name=search-landing&platform=web&extend=editorialArtwork&art[url]=f,c&types=editorial-items,apple-curators,activities`,
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
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			return { data: json.data };
		});
}

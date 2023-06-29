import { developerToken, musicUserToken } from '../../stores/musickit.store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	return {
		data: await fetch(
			`https://amp-api.music.apple.com/v1/editorial/us/groupings?platform=web&name=radio&omit[resource:artists]=relationships&include[albums]=artists&include[songs]=artists&include[music-videos]=artists&extend=editorialArtwork,artistUrl&fields[artists]=name,url,artwork,editorialArtwork,genreNames,editorialNotes&art[url]=f&l=en-us`,
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

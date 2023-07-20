import { developerToken, musicUserToken } from '../../stores/musickit.store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	return {
		data: await fetch(
			`https://amp-api.music.apple.com/v1/editorial/us/groupings?art[url]=f&extend=artistUrl,editorialArtwork,plainEditorialNotes&extend[station-events]=editorialVideo&fields[albums]=artistName,artistUrl,artwork,contentRating,editorialArtwork,plainEditorialNotes,name,playParams,releaseDate,url,trackCount&fields[artists]=name,url,artwork&include[albums]=artists&include[music-videos]=artists&include[songs]=artists&include[stations]=events&name=music&omit[resource:artists]=relationships&platform=web&relate[songs]=albums&tabs=subscriber`,
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

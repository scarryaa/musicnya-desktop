import { redirect } from '@sveltejs/kit';
import { developerToken, musicUserToken } from '../../../../stores/musickit.store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const response = await fetch(
		`http://localhost:3001/v1/catalog/us/apple-curators/${params.id}?art[url]=c,f&extend=editorialArtwork&extend[apple-curators]=plainEditorialNotes&extend[curators]=plainEditorialNotes&extend[stations]=plainEditorialNotes&fields[albums]=artistName,artistUrl,artwork,contentRating,editorialArtwork,plainEditorialNotes,name,playParams,releaseDate,url,trackCount&format[resources]=map&include=grouping,playlists&include[editorial-elements]=children,contents,room&include[songs]=artists&l=en-US&omit[resource]=autos&platform=web`,
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
		.then((res) => res.json())
		.catch((err) => console.log(err));
	return { media: response || [] };
}

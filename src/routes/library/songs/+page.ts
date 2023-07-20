import type { MusicKit } from 'src/lib/types/musickit';
import { developerToken, musicUserToken } from '../../../stores/musickit.store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	return {
		media: await fetch(
			`https://amp-api.music.apple.com/v1/me/library/songs?fields[albums]=inLibrary&l=en-US&platform=web&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls&include[songs]=artists`,
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

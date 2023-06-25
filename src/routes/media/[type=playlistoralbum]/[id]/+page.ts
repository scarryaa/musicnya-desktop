import { getDominantColor } from '../../../../lib/services/color-service';
import {
	developerToken,
	libraryPlaylists,
	musicUserToken
} from '../../../../stores/musickit.store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	if (params.type === 'playlist') {
		const playlist = get(libraryPlaylists).find((playlist) => playlist.id === params.id);
		if (playlist) {
			playlist.color = await getDominantColor(
				(
					playlist.attributes?.artwork?.url ||
					playlist.relationships.tracks.data?.[0].attributes?.artwork.url ||
					''
				)
					.replace('{w}x{h}', '100x100')
					.replace('{f}', 'png')
			);
			return { media: playlist };
		} else {
			const response = await fetch(
				`http://localhost:3001/v1/catalog/us/playlists/${params.id}?l=en-US&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls&include[songs]=artists`,
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
			);
			const json = await response.json();
			console.log(json.data?.[0]);

			if (json.data) {
				json.data[0].color = await getDominantColor(
					json.data?.[0].attributes.artwork.url.replace('{w}x{h}', '100x100').replace('{f}', 'png')
				);
				return { media: json.data?.[0] };
			}

			return { media: json.data?.[0] };
		}
	} else if (params.type === 'album') {
		const response = await fetch(
			`http://localhost:3001/v1/catalog/us/albums/${params.id}?l=en-US&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls`,
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
		);
		const data = await response.json();
		const album = data.data?.[0];

		if (album) {
			album.color = await getDominantColor(
				album.attributes.artwork.url.replace('{w}x{h}', '100x100').replace('{f}', 'png')
			);
			return { media: album };
		}
	}
}

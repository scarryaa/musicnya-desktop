import type { MusicKit } from 'src/lib/types/musickit';
import { getDominantColor } from '../../../../lib/services/color-service';
import {
	developerToken,
	libraryPlaylists,
	musicUserToken
} from '../../../../stores/musickit.store';
import { get } from 'svelte/store';

const headers = {
	'media-user-token': get(musicUserToken),
	authorization: `Bearer ${get(developerToken)}`,
	origin: 'https://beta.music.apple.com',
	'access-control-allow-origin': '*',
	'allowed-headers': '*'
};

const resolveArtworkURL = (url: string) => url.replace('{w}x{h}', '100x100').replace('{f}', 'png');

const getMediaColor = async (media: MusicKit.MediaItem | undefined) => {
	const url =
		media?.attributes?.artwork?.url ||
		media?.relationships?.tracks?.data?.[0]?.attributes?.artwork?.url ||
		'';
	if (media) {
		media.color = await getDominantColor(resolveArtworkURL(url));
	}
	return media;
};

export async function load({ fetch, params }) {
	if (params.type === 'playlist') {
		let playlistFromLibrary = get(libraryPlaylists).find((playlist) => playlist.id === params.id);
		if (playlistFromLibrary) {
			playlistFromLibrary = {
				...playlistFromLibrary,
				...{
					attributes: {
						...playlistFromLibrary.attributes,
						inLibrary: true
					}
				}
			};
		}
		if (!playlistFromLibrary) {
			let playlistData;
			let libraryData;
			try {
				const [playlistResponse, libraryResponse] = await Promise.all([
					fetch(
						`http://localhost:3001/v1/catalog/us/playlists/${params.id}?platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls&include[songs]=artists`,
						{ headers, mode: 'cors' }
					),
					fetch(
						`http://localhost:3001/v1/catalog/us/playlists/${params.id}?fields%5Bplaylists%5D=inLibrary&fields%5Balbums%5D=inLibrary&relate=library`,
						{
							headers,
							mode: 'cors'
						}
					)
				]);

				[playlistData, libraryData] = await Promise.all([
					playlistResponse.json(),
					libraryResponse.json()
				]);
			} catch (error) {
				console.error('An error occurred while fetching the data: ', error);
			}

			const playlist = playlistData?.data?.[0];
			const library = libraryData?.data?.[0];
			const merged = {
				...playlist,
				...{
					attributes: {
						...playlist.attributes,
						inLibrary: library.attributes.inLibrary
					},
					libraryId: library.id
				}
			};

			console.log(merged);

			return { media: await getMediaColor(merged) };
		}

		return { media: await getMediaColor(playlistFromLibrary) };
	}

	if (params.type === 'album') {
		let album;
		let library;
		try {
			const [albumResponse, libraryResponse] = await Promise.all([
				fetch(
					`http://localhost:3001/v1/catalog/us/albums/${params.id}?l=en-US&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls`,
					{ headers, mode: 'cors' }
				),
				fetch(
					`http://localhost:3001/v1/catalog/us/albums/${params.id}?fields%5Bplaylists%5D=inLibrary&fields%5Balbums%5D=inLibrary&relate=library`,
					{
						headers,
						mode: 'cors'
					}
				)
			]);

			[album, library] = await Promise.all([albumResponse.json(), libraryResponse.json()]);
		} catch (error) {
			console.error('An error occurred while fetching the data: ', error);
		}

		// merge attributes from album and library
		const merged = {
			...album.data?.[0],
			...{
				attributes: {
					...album.data?.[0].attributes,
					...library.data?.[0].attributes
				},
				relationships: {
					...album.data?.[0].relationships,
					...library.data?.[0].relationships
				}
			}
		};
		console.log(merged);

		return { media: await getMediaColor(merged) };
	}
}

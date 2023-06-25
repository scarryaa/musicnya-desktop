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

const loadMediaItem = async ({ fetch, params, mediaType, libraryType }) => {
	const itemFromLibrary = get(libraryPlaylists).find((item) => item.id === params.id);

	if (itemFromLibrary) {
		console.log(itemFromLibrary);
		return await getMediaColor({
			...itemFromLibrary,
			attributes: {
				...itemFromLibrary.attributes,
				inLibrary: true
			}
		});
	}

	const fetchMediaItem = fetch(
		`http://localhost:3001/v1/${libraryType}/${mediaType}s/${params.id}?fields[${mediaType}]=inLibrary&l=en-US&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls&include[songs]=artists`,
		{
			headers,
			mode: 'cors'
		}
	);

	const fetchInLibrary = fetch(
		`http://localhost:3001/v1/catalog/us/${mediaType}s/${params.id}?fields%5Bplaylists%5D=inLibrary&fields%5Balbums%5D=inLibrary&relate=library`,
		{
			headers,
			mode: 'cors'
		}
	);

	// Running both fetch operations in parallel
	const [responseMediaItem, responseInLibrary] = await Promise.all([
		fetchMediaItem,
		fetchInLibrary
	]);

	const jsonMediaItem = await responseMediaItem.json();
	const item = jsonMediaItem.data?.[0];
	console.log(item);

	if (!item) {
		return { status: 404 };
	}

	if (item?.type.includes('library')) {
		item.attributes.inLibrary = true;
		return await getMediaColor(item);
	}

	const jsonInLibrary = await responseInLibrary.json();
	if (!jsonInLibrary.data) {
		return await getMediaColor(item);
	} else if (!jsonInLibrary.data[0]) {
		return await getMediaColor(item);
	}

	const merged = {
		...item,
		...{
			attributes: {
				...item.attributes,
				...jsonInLibrary.data[0].attributes
			}
		}
	};

	return await getMediaColor(merged);
};

export async function load(context) {
	const { params } = context;

	const mediaTypes = {
		playlist: 'catalog/us',
		'library-playlist': 'me/library',
		album: 'catalog/us',
		'library-album': 'me/library'
	};

	const libraryType = mediaTypes[params.type];
	const mediaType =
		params.type === 'library-playlist'
			? 'playlist'
			: params.type === 'library-album'
			? 'album'
			: params.type.split('-')[0];

	if (!libraryType) {
		return { status: 404 };
	}

	return { media: loadMediaItem({ ...context, mediaType, libraryType }) };
}

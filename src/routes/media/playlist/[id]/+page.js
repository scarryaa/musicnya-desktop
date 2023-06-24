import { developerToken, libraryPlaylists, musicUserToken } from '../../../../store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        libraryPlaylist: get(libraryPlaylists).find(playlist => playlist.id === params.id) || fetch(
            `http://localhost:3001/v1/me/library/playlists/${params.id}/tracks?include=name%2CartistName%2CcuratorName%2CcomposerName%2Cartwork%2CplayParams%2CcontentRating%2CalbumName%2Curl%2CdurationInMillis%2CaudioTraits%2CextendedAssetUrls&l=en-US&offset=0&omit%5Bresource%5D=autos&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls`,
            {
              headers: {
                'media-user-token': get(musicUserToken),
                authorization: `Bearer ${get(developerToken)}`,
                origin: 'https://beta.music.apple.com',
                'access-control-allow-origin': '*',
                'allowed-headers': '*',
              },
              mode: 'cors',
            }
          ).then((response) => response.json().then((data) => {
            return data.data[0];
            }))
    };
}
import { get } from 'svelte/store';
import { developerToken, musicUserToken } from '../../stores/musickit.store';

export const getLibraryPlaylists = async () => {
    const response = await fetch(
      `http://localhost:3001/v1/me/library/playlist-folders/p.playlistsroot/children?art%5Burl%5D=f&include=name%2CcanDelete%2CcanEdit&l=en-US&offset=0&omit%5Bresource%5D=autos&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls`,
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
    ).catch((e) => {
      console.log(e);
      Promise.reject(e);
    });

    if (!response) {
      return Promise.reject('No response');
    }
    const json = await response.json();

    // map over the playlists and get the tracks for each one
    const playlists = await Promise.all(
        json.data?.map(async (playlist) => {
            const tracks = await fetch(
              // include catalog relationship
              `http://localhost:3001/v1/me/library/playlists/${playlist.id}/tracks?art[url]=f&extend[tracks]=name&extend[albums]=name&extend[catalog]=id&fields[curators]=name,url&fields[songs]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls&format[resources]=flat&include=catalog&include[songs]=artists,albums&l=en-US&limit[tracks]=50`,
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
            );

            const tracksJson = await tracks.json();
            return {
                ...playlist,
                relationships: {
                    tracks: tracksJson,
                }
            };

        })
    );
    return playlists;
  }

  export const getLibraryPlaylist = async (playlistId) => {
    const response = await fetch(
      `http://localhost:3001/v1/me/library/playlists/${playlistId}/tracks?include=name%2CartistName%2CcuratorName%2CcomposerName%2Cartwork%2CplayParams%2CcontentRating%2CalbumName%2Curl%2CdurationInMillis%2CaudioTraits%2CextendedAssetUrls&l=en-US&offset=0&omit%5Bresource%5D=autos&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls`,
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
    );
    const json = await response.json();
    return json;
  }

  export const getAlbum = async (albumId) => {
    const response = await fetch(
      `http://localhost:3001/v1/catalog/us/albums/${albumId}?l=en-US&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls`,
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
    );
    const json = await response.json();
    return json.data?.[0]
  }
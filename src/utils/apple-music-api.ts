
export const getLibraryPlaylists = async (instance) => {
    const response = await fetch(
      `http://localhost:3001/v1/me/library/playlist-folders/p.playlistsroot/children?art%5Burl%5D=f&include=name%2CcanDelete%2CcanEdit&l=en-US&offset=0&omit%5Bresource%5D=autos&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls`,
      {
        headers: {
          'media-user-token': instance.musicUserToken,
          authorization: `Bearer ${instance.developerToken}`,
          origin: 'https://beta.music.apple.com',
          'access-control-allow-origin': '*',
          'allowed-headers': '*',
        },
        mode: 'cors',
      }
    );
    const json = await response.json();
    console.log(json);

    // map over the playlists and get the tracks for each one
    const playlists = await Promise.all(
        json.data.map(async (playlist) => {
            const tracks = await fetch(
                `http://localhost:3001/v1/me/library/playlists/${playlist.id}/tracks?include=name%2CartistName%2CcuratorName%2CcomposerName%2Cartwork%2CplayParams%2CcontentRating%2CalbumName%2Curl%2CdurationInMillis%2CaudioTraits%2CextendedAssetUrls&l=en-US&offset=0&omit%5Bresource%5D=autos&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls`,
                {
                    headers: {
                        'media-user-token': instance.musicUserToken,
                        authorization: `Bearer ${instance.developerToken}`,
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
                    tracks: tracksJson.data,
                }
            };

        })
    );

    console.log('playlists', playlists);
    return playlists;
  }
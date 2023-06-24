import { getLibraryPlaylist } from '../../../../lib/api/apple-music-api';
import { getDominantColor } from '../../../../lib/services/color-service';
import { developerToken, libraryPlaylists, musicUserToken } from '../../../../store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  if (params.type === 'playlist') {
    return {
      media: get(libraryPlaylists).find(playlist => playlist.id === params.id) || getLibraryPlaylist(params.id).then(playlist => {
          libraryPlaylists.update(playlists => {
              playlists.push(playlist);
              return playlists;
          }
          );
      }).then((playlist: any) => {
          getDominantColor(playlist.attributes.artwork.url).then(color => {
              playlist.color = color;
          }
          );
          return { media: playlist };
      })
  };
  } else if (params.type === 'album') {
    return fetch(
      `http://localhost:3001/v1/catalog/us/albums/${params.id}?l=en-US&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls`,
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
    ).then((response) => {
      return response.json();
    }).then(async (data) => {
      return { media: data.data?.[0] };
    });
  }
}
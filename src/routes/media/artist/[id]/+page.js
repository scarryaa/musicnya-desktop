import { developerToken, musicUserToken } from '../../../../store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const response = await fetch(
        `http://localhost:3001/v1/catalog/us/artists/${params.id}?l=en-US&platform=web&include=tracks&fields[tracks]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls`,
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
      return { artist: json.data?.[0] }
}
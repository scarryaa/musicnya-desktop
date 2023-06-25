import type { MusicKit } from 'src/lib/types/musickit';
import { developerToken, musicUserToken } from '../store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const response = await fetch(
        `http://localhost:3001/v1/me/recommendations?art%5Burl%5D=f&displayFilter%5Bkind%5D=MusicCircleCoverShelf%2CMusicCoverGrid%2CMusicCoverShelf%2CMusicNotesHeroShelf%2CMusicSocialCardShelf%2CMusicSuperHeroShelf&extend=editorialVideo%2CplainEditorialCard%2CplainEditorialNotes&extend%5Bplaylists%5D=artistNames&extend%5Bstations%5D=airTime%2CsupportsAirTimeUpdates&fields%5Bartists%5D=name%2Cartwork%2Curl&include%5Balbums%5D=artists&include%5Bpersonal-recommendation%5D=primary-content&meta%5Bstations%5D=inflectionPoints&name=listen-now&omit%5Bresource%5D=autos&platform=web&timezone=-07%3A00&types=activities%2Calbums%2Capple-curators%2Cartists%2Ccurators%2Ceditorial-items%2Clibrary-albums%2Clibrary-playlists%2Cmusic-movies%2Cplaylists%2Csocial-profiles%2Csocial-upsells%2Csongs%2Cstations%2Ctv-shows%2Cuploaded-audios%2Cuploaded-videos&with=friendsMix%2Clibrary%2Csocial`,
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
      return { data: json.data }
}
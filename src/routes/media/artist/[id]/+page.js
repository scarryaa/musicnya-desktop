import { developerToken, musicUserToken } from '../../../../stores/musickit.store';
import { get } from 'svelte/store';

/** @type {import('../../../../types/musicnya-desktop/src/routes/media/artist/[id]/$types').PageLoad} */
export async function load({ fetch, params }) {
    const response = await fetch(
        `https://amp-api.music.apple.com/v1/catalog/us/artists/${params.id}?views=featured-release%2Cfull-albums%2Cappears-on-albums%2Cfeatured-albums%2Cfeatured-on-albums%2Csingles%2Ccompilation-albums%2Clive-albums%2Clatest-release%2Ctop-music-videos%2Csimilar-artists%2Ctop-songs%2Cplaylists%2Cmore-to-hear%2Cmore-to-see&extend=centeredFullscreenBackground%2CartistBio%2CbornOrFormed%2CeditorialArtwork%2CeditorialVideo%2CisGroup%2Corigin%2Chero&extend%5Bplaylists%5D=trackCount&include%5Bsongs%5D=albums&fields%5Balbums%5D=artistName%2CartistUrl%2Cartwork%2CcontentRating%2CeditorialArtwork%2CeditorialVideo%2Cname%2CplayParams%2CreleaseDate%2Curl%2CtrackCount&limit%5Bartists%3Atop-songs%5D=20&art%5Burl%5D=f&l=en-us`,
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
      ).then((res) => res.json());
      return { artist: response.data?.[0] }
}
import type { MusicKit } from 'src/lib/types/musickit';
import { developerToken, musicUserToken } from '../stores/musickit.store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	return {
		data: await fetch(
			`http://localhost:3001/v1/me/recommendations?art[url]=f&displayFilter[kind]=MusicCircleCoverShelf,MusicCoverGrid,MusicCoverShelf,MusicNotesHeroShelf,MusicSocialCardShelf,MusicSuperHeroShelf&extend=editorialVideo,plainEditorialCard,plainEditorialNotes&extend[playlists]=artistNames&extend[stations]=airTime,supportsAirTimeUpdates&fields[artists]=name,artwork,url&include[albums]=artists&include[personal-recommendation]=primary-content&meta[stations]=inflectionPoints&name=listen-now&omit[resource]=autos&platform=web&timezone=-07:00&types=activities,albums,apple-curators,artists,curators,editorial-items,library-albums,library-playlists,music-movies,playlists,social-profiles,social-upsells,songs,stations,tv-shows,uploaded-audios,uploaded-videos&with=friendsMix,library,social`,
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
		)
			.then((response) => {
				return response.json().then((json) => {
					return json.data;
				});
			})
			.catch((err) => {
				console.log(err);
			})
	};
}

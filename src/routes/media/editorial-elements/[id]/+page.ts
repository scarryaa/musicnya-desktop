import { developerToken, musicUserToken } from '../../../../stores/musickit.store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	return {
		media: await fetch(
			`http://localhost:3001/v1/editorial/us/multirooms/${params.id}?platform=web&extend=editorialArtwork%2Cuber%2ClockupStyle&l=en-us`,
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
					console.log(json);
					return json.data[0];
				});
			})
			.catch(async (err) => {
				return await fetch(
					`
                        https://amp-api.music.apple.com/v1/editorial/us/multiplex/${params.id}?art%5Burl%5D=f&format%5Bresources%5D=map&platform=web`,
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
				).then((response) => {
					return response.json().then(async (res) => {
						return await fetch(
							`http://localhost:3001/v1/editorial/us/multirooms/${res.results.target.id}?platform=web&extend=editorialArtwork%2Cuber%2ClockupStyle&l=en-us`,
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
									console.log(json);
									return json.data[0];
								});
							})
							.catch((err) => {
								console.log(err);
							});
					});
				});
			})
			.catch((err) => {
				console.log(err);
			})
	};
}

<script lang="ts">
	import { get } from 'svelte/store';
	import { developerToken, musicUserToken, nowPlayingItem } from '../../../stores/musickit.store';
	import { goto } from '$app/navigation';

	export let albumId: string;
	export let artistId: string;

	const lookupArtist = () => {
		fetch(
			`https://amp-api.music.apple.com/v1/catalog/us/search?term=${$nowPlayingItem?.artistName}&limit=1&types=artists`,
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
		).then((res) => {
			res.json().then((data) => {
				goto(`/media/artist/${data.results.artists.data[0].id}`, { replaceState: true });
			});
		});
	};
</script>

<div class="now-playing-tile">
	<img
		loading="lazy"
		style="visibility: {$nowPlayingItem ? 'visible' : 'hidden'}"
		src={($nowPlayingItem?.attributes?.artwork?.url)
			.replace('{w}x{h}', '60x60')
			.replace('{f}', 'webp')}
		alt="Album Artwork"
	/>
	<div class="song-info">
		<a
			class="song-title"
			title={$nowPlayingItem?.attributes?.name || ''}
			href="media/{$nowPlayingItem?._container?.type?.slice(0, -1)}/{$nowPlayingItem?._container
				?.id || $nowPlayingItem?.href?.split('/')[3]}">{$nowPlayingItem?.attributes?.name || ''}</a
		>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<a class="song-artist" on:click={lookupArtist} title={$nowPlayingItem?.artistName || ''}
			>{$nowPlayingItem?.artistName || ''}</a
		>
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.now-playing-tile {
		display: flex;
		flex-direction: row;
		position: relative;
		margin-left: 0.95rem;
		margin-top: 0.6rem;
		flex-grow: 0.2;

		img {
			display: block;
			border: 1px solid $border;
			min-width: 60px;
			min-height: 60px;
			max-width: 60px;
			object-fit: cover;
			border-radius: $border-radius-half;
			filter: drop-shadow($drop-shadow);
		}

		.song-info {
			display: flex;
			flex-direction: column;
			margin-left: 0.8rem;
			margin-top: 0.5rem;
			flex-grow: 0;
			max-width: 12vw;
			min-width: 12vw;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			.song-title {
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				max-width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;

				&:hover {
					text-decoration: underline;
				}
			}

			.song-artist {
				max-width: 100%;
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: $text-light;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>

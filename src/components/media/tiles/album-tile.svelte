<script lang="ts">
	import { play, playLater, playNext } from '../../..//lib/services/playback-service';
	import ButtonOptions from '../../../components/buttons/button-options.svelte';
	import ButtonPlay from '../../../components/buttons/button-play.svelte';
	import {
		addToListenLater,
		inListenLater,
		removeFromListenLater
	} from '../../../lib/services/favorites.service';
	import ButtonPlus from '../../../components/buttons/button-plus.svelte';
	import { listenLater } from '../../../stores/app.store';
	import ButtonMinus from '../../../components/buttons/button-minus.svelte';
	import { onMount } from 'svelte';
	import { createContextMenu } from '../../../lib/services/context-menu.service';
	import { developerToken, musicUserToken } from '../../../stores/musickit.store';
	import { get } from 'svelte/store';
	import { setUpAlbumTileMenu } from '../../../lib/api/context-menu.api';

	let albumTile: any;
	export let id: string;
	export let artistId: string;
	export let src: string;
	export let title: string;
	export let artist: string;
	export let year: string;
	export let type: string;
	export let subtitle: 'artist' | 'year' | 'none' = 'artist';
	export let shareLink: string | undefined;
	export let inLibrary: boolean | undefined = undefined;
	export let favorited: -1 | 0 | 1 | undefined = undefined;

	onMount(() => {
		// right click listener
		if (type !== 'stations') {
			albumTile.addEventListener('contextmenu', async (e: any) => {
				setUpAlbumTileMenu(
					e,
					this,
					id,
					type,
					unfavorite,
					favorite,
					dislike,
					playAlbum,
					_playNext,
					_playLater,
					share,
					addToPlaylist,
					addToLibrary,
					removeFromLibrary,
					shareLink,
					favorited,
					inLibrary
				);
			});
		}
	});

	const playAlbum = (e: MouseEvent) => {
		e.preventDefault();
		play(type.slice(0, -1).replace('library-', ''), id);
	};

	const _playNext = (e: MouseEvent) => {
		e.preventDefault();
		playNext(type.slice(0, -1).replace('library-', ''), id);
	};

	const _playLater = (e: MouseEvent) => {
		e.preventDefault();
		playLater(type.slice(0, -1).replace('library-', ''), id);
	};

	const addToPlaylist = (e: MouseEvent) => {
		e.preventDefault();
		// addToPlaylistModal(type.slice(0, -1).replace('library-', ''), id);
	};

	const dislike = async (e: MouseEvent, catalogId: string) => {
		e.preventDefault();

		// dislike
		await fetch(
			`https://amp-api.music.apple.com/v1/me/ratings/${type.replace('library-', '')}/${catalogId}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${get(developerToken)}`,
					'media-user-token': get(musicUserToken)
				},
				body: JSON.stringify({
					attributes: {
						value: -1
					}
				})
			}
		).then(() => (favorited = -1));
	};

	const unfavorite = async (e: MouseEvent, catalogId: string) => {
		e.preventDefault();

		// remove from favorites
		await fetch(
			`https://amp-api.music.apple.com/v1/me/ratings/${type.replace('library-', '')}/${catalogId}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${get(developerToken)}`,
					'media-user-token': get(musicUserToken)
				}
			}
		).then(() => (favorited = 0));
	};

	const favorite = async (e: MouseEvent, catalogId: string) => {
		e.preventDefault();

		// add to favorites
		await fetch(
			`https://amp-api.music.apple.com/v1/me/ratings/${type.replace('library-', '')}/${catalogId}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${get(developerToken)}`,
					'media-user-token': get(musicUserToken)
				},
				body: JSON.stringify({
					attributes: {
						value: 1
					},
					type: 'rating'
				})
			}
		).then(() => (favorited = 1));
	};

	const share = async (e: MouseEvent, url?: string) => {
		e.preventDefault();
		// copy to clipboard
		if (navigator.clipboard && shareLink) {
			navigator.clipboard.writeText(shareLink).then(() => {
				console.log('Copied to clipboard successfully!');
			});
		} else {
			if (window.location.pathname.includes('library')) {
				url = await fetch(
					`https://amp-api.music.apple.com/v1/me/library/${type.replace(
						'library-',
						''
					)}/${id}/catalog`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${get(developerToken)}`,
							'media-user-token': get(musicUserToken)
						}
					}
				).then(async (res) => {
					if (res.status === 401) {
						throw new Error('Unauthorized');
					}
					const json = await res.json();
					console.log(json);
					return json['data'][0]['attributes']['url'];
				});
			}

			if (url && !window.location.pathname.includes('library')) {
				const shareUrl = url.data[0].attributes.url;
				console.log(shareUrl);
				if (navigator.clipboard && shareUrl) {
					navigator.clipboard.writeText(shareUrl).then(() => {
						console.log('Copied to clipboard successfully!');
					});
				}
			} else {
				navigator.clipboard.writeText(url || '').then(() => {
					console.log('Copied to clipboard successfully!');
				});
			}
		}
	};

	const addToLibrary = async (e: MouseEvent) => {
		e.preventDefault();

		// add to library
		await fetch(`https://amp-api.music.apple.com/v1/me/library?ids[${type}]=${id}`, {
			method: 'POST',
			headers: {
				'media-user-token': get(musicUserToken),
				authorization: `Bearer ${get(developerToken)}`
			}
		}).finally(() => {
			inLibrary = true;
		});
	};

	const removeFromLibrary = async (e: MouseEvent) => {
		e.preventDefault();

		// remove from library
		await fetch(
			`https://amp-api.music.apple.com/v1/me/library/${type.replace(
				'library-',
				''
			)}/${id}?art[url]=f`,
			{
				method: 'DELETE',
				headers: {
					'media-user-token': get(musicUserToken),
					authorization: `Bearer ${get(developerToken)}`
				}
			}
		).finally(() => {
			if (window.location.pathname.includes('library')) {
				albumTile.remove();
			}
		});
	};

	const _addToListenLater = (e: MouseEvent) => {
		e.preventDefault();
		inListenLater(type.slice(0, -1), id)
			? removeFromListenLater(type.slice(0, -1), id)
			: addToListenLater(type, id, title, src, artist, artistId);
	};
</script>

<div class="album-tile" bind:this={albumTile}>
	<div class="album-overlay-container">
		<a
			class="album-overlay"
			href={type !== 'stations' ? `/media/${type.slice(0, -1)}/${id}` : null}
		>
			<ButtonPlay color="white" on:click={playAlbum} />
			<ButtonOptions
				on:click={(e) => {
					if (type !== 'stations') {
						setUpAlbumTileMenu(
							e,
							this,
							id,
							type,
							unfavorite,
							favorite,
							dislike,
							playAlbum,
							_playNext,
							_playLater,
							share,
							addToPlaylist,
							addToLibrary,
							removeFromLibrary,
							shareLink,
							favorited,
							inLibrary
						);
					}
				}}
			/>
			<div
				title={$listenLater.some((item) => item.id === id)
					? 'Remove from Listen Later'
					: 'Add to Listen Later'}
			>
				<svelte:component
					this={$listenLater.some((item) => item.id === id) ? ButtonMinus : ButtonPlus}
					on:click={_addToListenLater}
				/>
			</div>
		</a>
		<div class="album-image">
			<img src={src || '/images/music_note.png'} alt="" loading="lazy" />
		</div>
	</div>
	<div class="album-info">
		{#if type === 'stations'}
			<span class="station-title" {title}>{title}</span>
		{:else}
			<a href="/media/{type.slice(0, -1)}/{id}" class="album-title" {title}>{title}</a>
		{/if}
		{#if subtitle === 'artist'}
			<a
				tabindex={artist ? 0 : -1}
				href={artistId ? '/media/artist/' + artistId : null}
				class="album-artist"
				style={!artistId ? 'text-decoration: none; cursor: default;' : ''}
				title={artist}>{artist || ''}</a
			>
		{:else if subtitle === 'year'}
			<div class="album-year" title={year}>{year}</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	$drop-shadow: 0 0 8px rgba(0, 0, 0, 0.2);

	.album-tile {
		margin-top: 0.2rem;
		align-items: center;
		border-radius: $border-radius-half;
		max-width: 12rem;
		max-height: 12rem;
		display: flex;
		flex-direction: column;
		aspect-ratio: 1;
		align-items: flex-start;
		overflow: visible;

		.album-overlay-container {
			z-index: 99;
			position: relative;
			width: 100%;
			height: 100%;
			min-width: 100%;
			min-height: 100%;
			border-radius: $border-radius-half;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: all 0.2s ease-in-out;
			box-shadow: $drop-shadow;

			&:hover .album-overlay,
			&:focus-visible .album-overlay,
			&:focus-within .album-overlay {
				background-color: rgba(0, 0, 0, 0.4);
				opacity: 1;
			}

			.album-overlay {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				width: 100%;
				height: 100%;
				transition: all 0.2s ease-in-out;
				opacity: 0;
			}
		}

		.album-image {
			min-width: 10rem;
			max-width: 12rem;
			min-height: 12rem;
			max-height: 12rem;

			img {
				min-width: 10rem;
				max-width: 12rem;
				border-radius: $border-radius-half;
			}
		}

		.album-info {
			min-width: 10rem;
			max-width: 12rem;
			display: flex;
			flex-direction: column;
			margin-top: 0.5rem;

			.album-title {
				max-width: 100%;
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				color: var(--text);
				white-space: nowrap;
				overflow: hidden;
				overflow-y: visible;
				text-overflow: ellipsis;

				&:hover {
					text-decoration: underline;
				}
			}

			.station-title {
				color: var(--text);
			}

			.album-artist,
			.album-year {
				max-width: 100%;
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: var(--text-light);
				overflow-y: visible;
			}

			.album-artist {
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>

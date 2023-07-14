<script lang="ts">
	import { play } from '../../..//lib/services/playback-service';
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
	import ContextMenu from '../../../components/context-menu.svelte';
	import { createContextMenu } from '../../../lib/services/context-menu.service';

	let albumTile;
	export let id: string;
	export let artistId: string;
	export let src: string;
	export let title: string;
	export let artist: string;
	export let year: string;
	export let type: string;
	export let subtitle: 'artist' | 'year' = 'artist';

	onMount(() => {
		// right click listener
		albumTile.addEventListener('contextmenu', (e) => {
			console.log(e.clientX);
			e.preventDefault();
			createContextMenu({
				x: e.clientX,
				y: e.clientY,
				items: [
					{
						text: 'Play',
						icon: 'play',
						onClick: () => playAlbum(e)
					},
					{
						text: 'Add to Listen Later',
						icon: 'plus',
						onClick: () => favorite(e)
					}
				],
				target: albumTile
			});
		});
	});

	const playAlbum = (e: MouseEvent) => {
		e.preventDefault();
		play(type.slice(0, -1).replace('library-', ''), id);
	};

	const favorite = (e: MouseEvent) => {
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
			<ButtonOptions on:click={() => {}} />
			<div
				title={$listenLater.some((item) => item.id === id)
					? 'Remove from Listen Later'
					: 'Add to Listen Later'}
			>
				<svelte:component
					this={$listenLater.some((item) => item.id === id) ? ButtonMinus : ButtonPlus}
					on:click={favorite}
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

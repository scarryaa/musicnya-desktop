<script lang="ts">
	import { play } from '../../..//lib/services/playback-service';
	import {
		addToListenLater,
		inListenLater,
		removeFromListenLater
	} from '../../../lib/services/favorites.service';
	import AlbumTile from './album-tile.svelte';

	export let id: string;
	export let artistId: string;
	export let src: string;
	export let title: string;
	export let artist: string;
	export let year: string;
	export let type: string;
	export let subtitle: 'artist' | 'year' = 'artist';
</script>

<div class="glass-tile">
	<AlbumTile {id} {artistId} {src} {title} {artist} {year} {type} {subtitle} />
	<div class="glass-info" style="background-image: url({src})">
		<div class="glass-info__inner">
			<span class="glass-title">{title}</span>
			<span class="glass-artist">{artist}</span>
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	$drop-shadow: 0 0 8px rgba(0, 0, 0, 0.2);

	.glass-tile {
		max-width: 12rem;
		border-radius: $border-radius-half;
		display: flex;
		flex-direction: column;

		.glass-info {
			overflow: hidden;
			display: flex;
			flex-direction: column;
			width: 100%;
			background-position: bottom;
			background-repeat: no-repeat;
			color: $white;
			border-bottom-left-radius: $border-radius;
			border-bottom-right-radius: $border-radius;

			.glass-title {
				font-size: 0.9rem;
				width: 100% !important;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				text-align: center;
			}

			.glass-artist {
				font-size: 0.8rem;
				width: 100%;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				text-align: center;
			}
		}

		.glass-info__inner {
			border-bottom-left-radius: $border-radius;
			border-bottom-right-radius: $border-radius;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;
			padding-block: 1rem;
			padding-inline: 0.5rem;
			backdrop-filter: blur(50px) saturate(180%) brightness(50%);
		}

		:global(.album-tile img) {
			border-bottom-left-radius: 0 !important;
			border-bottom-right-radius: 0 !important;
		}

		:global(.album-tile .album-overlay-container) {
			border-top-left-radius: $border-radius-half;
			border-top-right-radius: $border-radius-half;
			border-bottom-left-radius: 0 !important;
			border-bottom-right-radius: 0 !important;
		}

		:global(.album-info) {
			display: none !important;
		}
	}
</style>

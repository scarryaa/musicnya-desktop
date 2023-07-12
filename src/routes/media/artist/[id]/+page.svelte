<script lang="ts">
	import { play } from '../../../../lib/services/playback-service';
	import ButtonPlay from '../../../../components/buttons/button-play.svelte';
	import ArtistGroup from '../../../../components/media/groupings/artist-group.svelte';
	import SongTile from '../../../../components/media/tiles/song-tile.svelte';

	export let data: {
		artist: any;
	};
</script>

<div class="page-wrapper">
	<div
		class="page-wrapper__background"
		style="background: url({(
			data.artist.attributes?.editorialArtwork?.bannerUber?.url ||
			data.artist.attributes?.artwork?.url
		)
			.replace('{w}x{h}', '1200x1200')
			.replace('{f}', 'webp')}), url({(
			data.artist.attributes?.editorialArtwork?.bannerUber?.url ||
			data.artist.attributes?.artwork?.url
		)
			.replace('{w}x{h}', '200x200')
			.replace('{f}', 'webp')}), linear-gradient({data.artist.attributes?.editorialArtwork
			?.bannerUber?.bgColor || '#000'}, rgba(0, 0, 0))"
	>
		<div class="page-wrapper__artist-info">
			<h1 class="page-wrapper__artist-info__title">{data.artist.attributes?.name}</h1>
			<div class="page-wrapper__artist-info__buttons">
				<ButtonPlay
					color="white"
					size="2.2rem"
					background={true}
					on:click={() => play('artist', data.artist.id)}
				/>
			</div>
		</div>
	</div>
	<div class="page-wrapper__content">
		<ArtistGroup groupTitle="Top Songs" viewType="top-songs" {data} contentType="songs" />
		{#if data.artist.views?.['latest-release'].data.length > 0}
			<ArtistGroup
				groupTitle="Latest Release"
				viewType="latest-release"
				{data}
				contentType="albums"
			/>
		{/if}
		{#if data.artist.views?.['full-albums']?.data.length > 0}
			<ArtistGroup groupTitle="Albums" viewType="full-albums" {data} contentType="albums" />
		{/if}
		{#if data.artist.views?.['top-music-videos']?.data?.length > 0}
			<ArtistGroup
				groupTitle="Top Videos"
				viewType="top-music-videos"
				{data}
				contentType="videos"
			/>
		{/if}
		{#if data.artist.views?.['playlists']?.data?.length > 0}
			<ArtistGroup groupTitle="Artist Playlists" viewType="playlists" {data} contentType="albums" />
		{/if}
		{#if data.artist.views?.['singles']?.data?.length > 0}
			<ArtistGroup groupTitle="Singles" viewType="singles" {data} contentType="albums" />
		{/if}
		{#if data.artist.views?.['live-albums']?.data?.length > 0}
			<ArtistGroup groupTitle="Live Albums" viewType="live-albums" {data} contentType="albums" />
		{/if}
		{#if data.artist.views?.['compilation-albums']?.data?.length > 0}
			<ArtistGroup
				groupTitle="Compilations"
				viewType="compilation-albums"
				{data}
				contentType="albums"
			/>
		{/if}
		{#if data.artist.views?.['similar-artists']?.data?.length > 0}
			<ArtistGroup
				groupTitle="Similar Artists"
				viewType="similar-artists"
				{data}
				contentType="artists"
			/>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '../../../../variables.scss' as *;

	:root {
		--background: #1c1c1c;
	}

	.page-wrapper {
		overflow: overlay;
		overflow-x: hidden;
		height: 100%;
		width: 100%;
		padding: 0;
		backdrop-filter: blur(10px);

		&__background {
			position: relative;
			width: 100%;
			height: 40vh;
			overflow: hidden;
			display: flex;
			align-items: flex-end;
			justify-content: flex-end;
			background-size: unset;
			background-position: center !important;
			background-repeat: no-repeat !important;
			border-radius: $border-radius;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			border-bottom: 3px solid $accent;
		}

		&__artist-info {
			display: flex;
			flex-direction: row;
			align-items: flex-end;
			justify-content: flex-end;
			width: 100%;
			height: 100%;
			padding: 1rem;

			& > * {
				margin-bottom: 0.5rem;
			}

			&__title {
				position: absolute;
				bottom: 0rem;
				left: 3rem;
				font-size: 2rem;
				font-weight: 700;
				color: white;
				text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
				width: 100%;
			}

			&__buttons {
				position: absolute;
				width: 100%;
				left: 1rem;
				bottom: 0.4rem;
				display: flex;
				align-items: flex-end;
				justify-content: flex-start;
			}
		}

		&__content {
			display: flex;
			flex-direction: column;
			background-color: var(--drawer-background);
			border-radius: $border-radius-half;
			margin-top: -1rem;
		}
	}
</style>

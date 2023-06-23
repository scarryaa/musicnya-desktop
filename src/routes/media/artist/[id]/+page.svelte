<script lang="ts">
	import ArtistGroup from '../../../../components/media/groupings/artist-group.svelte';
	import SongTile from '../../../../components/media/tiles/song-tile.svelte';

	export let data: {
		artist: any;
	};
</script>

<div class="page-wrapper">
	<div
		class="page-wrapper__background"
		style="background-image: url({data.artist.attributes?.editorialArtwork?.bannerUber?.url
			.replace('{w}x{h}', '1200x1200')
			.replace('{f}', 'webp')}), url({data.artist.attributes?.editorialArtwork?.bannerUber?.url
			.replace('{w}x{h}', '600x600')
			.replace('{f}', 'webp')}),
            
            url({data.artist.attributes?.artwork?.url
			.replace('{w}x{h}', '1200x1200')
			.replace('{f}', 'webp')}), url({data.artist.attributes?.artwork?.url
			.replace('{w}x{h}', '600x600')
			.replace('{f}', 'webp')}), url({data.artist.attributes?.artwork?.url
			.replace('{w}x{h}', '200x200')
			.replace('{f}', 'webp')})"
	>
		<h1 class="page-wrapper__artist-name">{data.artist.attributes.name}</h1>
		<div class="play-button" />
	</div>
	<div class="page-wrapper__content">
		<ArtistGroup groupTitle="Top Songs" viewType="top-songs" {data} contentType="song" />
		<ArtistGroup groupTitle="Latest Release" viewType="latest-release" {data} contentType="album" />
	</div>
</div>

<style lang="scss">
	@use '../../../../variables.scss' as *;

	$background: #1c1c1c;

	.page-wrapper {
		overflow: overlay;
		overflow-x: hidden;
		height: 100%;
		width: 100%;

		&__background {
			position: relative;
			width: 100%;
			height: 40vh;
			overflow: hidden;
			display: flex;
			align-items: flex-end;
			justify-content: flex-end;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			border-radius: $border-radius;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			border-bottom: 3px solid $accent;
		}

		&__artist-name {
			position: absolute;
			bottom: -1rem;
			left: 1rem;
			color: white;
			font-size: 2.6rem;
			font-weight: 700;
			text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		}

		&__content {
			display: flex;
			flex-direction: column;
			background-color: white;
			border-radius: $border-radius-half;
			margin-top: -1rem;
			padding-bottom: 2rem;
		}
	}
</style>

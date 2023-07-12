<script lang="ts">
	import { onMount } from 'svelte';
	import AlbumTile from './tiles/album-tile.svelte';
	import SongTile from './tiles/song-tile.svelte';
	import ArtistTile from './tiles/artist-tile.svelte';
	import VideoTile from './tiles/video-tile.svelte';
	import GlassTile from './tiles/glass-tile.svelte';
	import EditorialTile from './tiles/editorial-tile.svelte';
	import SuperheroTile from './tiles/superhero-tile.svelte';

	let content: HTMLElement;
	export let scrollEvent: { direction: 'left' | 'right'; shouldScroll: boolean };
	export let type:
		| 'songs'
		| 'albums'
		| 'videos'
		| 'editorial-elements'
		| 'artists'
		| 'music-videos'
		| 'uploaded-videos'
		| 'personal-recommendation' = 'albums';
	export let data: {
		media: any[];
	};
	export let scrollable = true;
	export let glass = false;
	export let superhero = false;

	$: scrollable = content?.scrollWidth > content?.clientWidth;
	$: handleScroll(scrollEvent);

	function handleScroll(event: { direction: 'left' | 'right'; shouldScroll: boolean }) {
		if (event?.shouldScroll) {
			const scrollAmount =
				event.direction === 'left'
					? -((document.defaultView?.innerWidth ?? 300) - 300)
					: (document.defaultView?.innerWidth ?? 300) - 300;
			content?.scrollBy({
				left: scrollAmount,
				behavior: 'smooth'
			});
			event.shouldScroll = false;
		}
	}

	$: console.log(data);
</script>

<div class="tile-group__content" bind:this={content}>
	{#each data.media as media}
		{#if glass}
			<GlassTile
				type={media.type}
				subtitle="artist"
				id={media.id}
				title={media.attributes?.name}
				artist={media.attributes?.artistName || media.attributes?.curatorName}
				artistId={media.relationships?.artists?.data?.[0]?.id}
				year={media.attributes?.releaseDate}
				src={media.attributes?.artwork?.url.replace('{w}x{h}', '400x400').replace('{f}', 'webp') ||
					'/images/music_note.png'}
				badge={media.meta?.reason?.stringForDisplay}
			/>
		{:else if superhero}
			<div class="tile-group__content__tile" style="width: 100%;">
				<SuperheroTile
					type={media.type}
					badge={media.meta?.reason?.stringForDisplay}
					showBadge={media.meta?.reason?.stringForDisplay !== undefined}
					id={media.id}
					title={media.attributes?.name}
					href={`/media/${media.type.slice(0, -1)}/${media.id}`}
					src={media.attributes?.artwork?.url
						.replace('{w}x{h}', '800x800')
						.replace('{f}', 'webp') || '/images/music_note.png'}
				/>
			</div>
		{:else}
			{#if type === 'songs'}
				<div class="tile-group__content__song">
					<SongTile
						id={media.id}
						title={media.attributes.name}
						subtitle="artist"
						year={media.attributes.releaseDate}
						artist={media.attributes.artistName || media.attributes?.curatorName}
						src={media.attributes.artwork?.url
							.replace('{w}x{h}', '100x100')
							.replace('{f}', 'webp') || '/images/music_note.png'}
					/>
				</div>
			{/if}

			{#if type === 'albums'}
				<div class="tile-group__content__tile">
					<AlbumTile
						type={media.type}
						subtitle="artist"
						id={media.id}
						title={media.attributes?.name}
						artist={media.attributes?.artistName || media.attributes?.curatorName}
						artistId={media.relationships?.artists?.data?.[0]?.id}
						year={media.attributes?.releaseDate}
						src={media.attributes?.artwork?.url
							.replace('{w}x{h}', '400x400')
							.replace('{f}', 'webp') || '/images/music_note.png'}
					/>
				</div>
			{/if}

			{#if type === 'personal-recommendation'}
				<div class="tile-group__content__tile">
					<AlbumTile
						type={media.type}
						subtitle="artist"
						id={media.id}
						title={media.attributes?.name}
						artist={media.attributes?.artistName || media.attributes?.curatorName}
						artistId={media.relationships?.artists?.data?.[0]?.id}
						year={media.attributes?.releaseDate}
						src={media.attributes?.artwork?.url
							.replace('{w}x{h}', '400x400')
							.replace('{f}', 'webp') || '/images/music_note.png'}
					/>
				</div>
			{/if}

			{#if type === 'artists'}
				<ArtistTile
					id={media.id}
					name={media.attributes.name}
					src={media.attributes.artwork?.url.replace('{w}x{h}', '100x100').replace('{f}', 'webp')}
				/>
			{/if}
			{#if type === 'videos' || type === 'uploaded-videos' || type === 'music-videos'}
				<VideoTile
					type="videos"
					subtitle="year"
					id={media.id}
					title={media.attributes.name}
					artist={media.attributes.artistName}
					artistId={media.attributes.artistId}
					year={media.attributes.releaseDate?.slice(0, 4)}
					src={media.attributes.artwork?.url.replace('{w}x{h}', '400x400').replace('{f}', 'webp')}
				/>
			{/if}

			{#if type === 'editorial-elements'}
				{#if media.type === 'albums'}
					<div class="tile-group__content__tile">
						<AlbumTile
							type={media.type}
							subtitle="artist"
							id={media.id}
							title={media.attributes?.name}
							artist={media.attributes?.artistName || media.attributes?.curatorName}
							artistId={media.relationships?.artists?.data?.[0]?.id}
							year={media.attributes?.releaseDate}
							src={media.attributes?.artwork?.url
								.replace('{w}x{h}', '400x400')
								.replace('{f}', 'webp')}
						/>
					</div>
				{/if}

				{#if media.type === 'playlists'}
					<div class="tile-group__content__tile">
						<AlbumTile
							type={media.type}
							subtitle="artist"
							id={media.id}
							title={media.attributes?.name}
							artist={media.attributes?.artistName || media.attributes?.curatorName}
							artistId={media.relationships?.artists?.data?.[0]?.id}
							year={media.attributes?.releaseDate}
							src={media.attributes?.artwork?.url
								.replace('{w}x{h}', '400x400')
								.replace('{f}', 'webp')}
						/>
					</div>
				{/if}

				{#if media.type === 'videos' || media.type === 'uploaded-videos' || media.type === 'music-videos'}
					<div class="tile-group__content__tile">
						<VideoTile
							type="videos"
							subtitle="year"
							id={media.id}
							title={media.attributes.name}
							artist={media.attributes.artistName}
							artistId={media.attributes.artistId}
							year={media.attributes.releaseDate?.slice(0, 4)}
							src={media.attributes.artwork?.url
								.replace('{w}x{h}', '400x400')
								.replace('{f}', 'webp')}
						/>
					</div>
				{/if}

				{#if media.type === 'stations'}
					<div class="tile-group__content__tile">
						<AlbumTile
							type={media.type}
							subtitle="artist"
							id={media.id}
							title={media.attributes?.name}
							artist={media.attributes?.artistName || media.attributes?.curatorName}
							artistId={media.relationships?.artists?.data?.[0]?.id}
							year={media.attributes?.releaseDate}
							src={media.attributes?.artwork?.url
								.replace('{w}x{h}', '400x400')
								.replace('{f}', 'webp')}
						/>
					</div>
				{/if}

				{#if media.type === 'songs'}
					<div class="tile-group__content__song">
						<SongTile
							id={media.id}
							title={media.attributes.name}
							subtitle="artist"
							year={media.attributes.releaseDate}
							artist={media.attributes.artistName || media.attributes?.curatorName}
							src={media.attributes.artwork?.url
								.replace('{w}x{h}', '100x100')
								.replace('{f}', 'webp')}
						/>
					</div>
				{/if}

				{#if media.type === 'artists'}
					<ArtistTile
						id={media.id}
						title={media.attributes.name}
						href={media.attributes.url}
						src={media.attributes.artwork?.url.replace('{w}x{h}', '100x100').replace('{f}', 'webp')}
					/>
				{/if}
			{/if}
		{/if}
	{/each}
</div>

<style lang="scss">
	.tile-group__content {
		justify-content: start;
		gap: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		padding-right: 1rem;
		display: flex;
		overflow-x: scroll;
		overflow-y: visible;

		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>

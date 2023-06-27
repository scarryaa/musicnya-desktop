<script lang="ts">
	import { onMount } from 'svelte';
	import AlbumTile from './tiles/album-tile.svelte';
	import SongTile from './tiles/song-tile.svelte';
	import ArtistTile from './tiles/artist-tile.svelte';
	import VideoTile from './tiles/video-tile.svelte';

	let content: HTMLElement;
	export let scrollEvent: { direction: 'left' | 'right'; shouldScroll: boolean };
	export let type:
		| 'songs'
		| 'albums'
		| 'videos'
		| 'editorial-elements'
		| 'artists'
		| 'personal-recommendation' = 'albums';
	export let data: {
		media: any[];
	};
	export let scrollable = true;

	$: scrollable = content?.scrollWidth > content?.clientWidth;
	$: handleScroll(scrollEvent);

	function handleScroll(event: { direction: 'left' | 'right'; shouldScroll: boolean }) {
		if (event.shouldScroll) {
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
</script>

<div class="tile-group__content" bind:this={content}>
	{#each data.media as media}
		{#if type === 'songs'}
			<div class="tile-group__content__song">
				<SongTile
					id={media.id}
					title={media.attributes.name}
					subtitle="artist"
					year={media.attributes.releaseDate}
					artist={media.attributes.artistName || media.attributes?.curatorName}
					src={media.attributes.artwork?.url.replace('{w}x{h}', '100x100').replace('{f}', 'webp')}
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
					src={media.attributes?.artwork?.url.replace('{w}x{h}', '400x400').replace('{f}', 'webp')}
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
					src={media.attributes?.artwork?.url.replace('{w}x{h}', '400x400').replace('{f}', 'webp')}
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
		{#if type === 'videos'}
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
			{#if media.type === 'editorial-elements'}
				{#each media.relationships.children.data as child}
					{#if child.type === 'albums'}
						<div class="tile-group__content__tile">
							<AlbumTile
								type={child.type}
								subtitle="artist"
								id={child.id}
								title={child.attributes?.name}
								artist={child.attributes?.artistName || child.attributes?.curatorName}
								artistId={child.relationships?.artists?.data?.[0]?.id}
								year={child.attributes?.releaseDate}
								src={child.attributes?.artwork?.url
									.replace('{w}x{h}', '400x400')
									.replace('{f}', 'webp')}
							/>
						</div>
					{/if}

					{#if child.type === 'playlists'}
						<div class="tile-group__content__tile">
							<AlbumTile
								type={child.type}
								subtitle="artist"
								id={child.id}
								title={child.attributes?.name}
								artist={child.attributes?.artistName || child.attributes?.curatorName}
								artistId={child.relationships?.artists?.data?.[0]?.id}
								year={child.attributes?.releaseDate}
								src={child.attributes?.artwork?.url
									.replace('{w}x{h}', '400x400')
									.replace('{f}', 'webp')}
							/>
						</div>
					{/if}

					{#if child.type === 'videos' || child.type === 'uploaded-videos'}
						<div class="tile-group__content__tile">
							<!-- TODO implement video tile -->
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

					{#if child.type === 'stations'}
						<div class="tile-group__content__tile">
							<AlbumTile
								type={child.type}
								subtitle="artist"
								id={child.id}
								title={child.attributes?.name}
								artist={child.attributes?.artistName || child.attributes?.curatorName}
								artistId={child.relationships?.artists?.data?.[0]?.id}
								year={child.attributes?.releaseDate}
								src={child.attributes?.artwork?.url
									.replace('{w}x{h}', '400x400')
									.replace('{f}', 'webp')}
							/>
						</div>
					{/if}

					{#if child.type === 'songs'}
						<div class="tile-group__content__song">
							<SongTile
								id={child.id}
								title={child.attributes.name}
								subtitle="artist"
								year={child.attributes.releaseDate}
								artist={child.attributes.artistName || child.attributes?.curatorName}
								src={child.attributes.artwork?.url
									.replace('{w}x{h}', '100x100')
									.replace('{f}', 'webp')}
							/>
						</div>
					{/if}
				{/each}
			{/if}

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

			{#if media.type === 'videos' || media.type === 'uploaded-videos'}
				<div class="tile-group__content__tile">
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
						src={media.attributes.artwork?.url.replace('{w}x{h}', '100x100').replace('{f}', 'webp')}
					/>
				</div>
			{/if}
		{/if}
	{/each}
</div>

<style lang="scss">
	.tile-group__content {
		justify-content: start;
		gap: 1rem;
		content-visibility: auto;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		padding-inline: 1rem;
		display: flex;
		overflow-x: scroll;
		overflow-y: visible;

		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>

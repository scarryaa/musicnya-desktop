<script lang="ts">
	import { onMount } from 'svelte';
	import AlbumTile from './tiles/album-tile.svelte';
	import SongTile from './tiles/song-tile.svelte';

	let content: HTMLElement;
	export let scrollEvent: { direction: 'left' | 'right'; shouldScroll: boolean };
	export let type: 'song' | 'album' | 'video' = 'album';
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
		{#if type === 'song'}
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

		{#if type === 'album'}
			<div class="tile-group__content__tile">
				<AlbumTile
					type={media.type}
					subtitle="artist"
					id={media.id}
					title={media.attributes.name}
					artist={media.attributes.artistName || media.attributes?.curatorName}
					artistId={media.relationships?.artists?.data?.[0]?.id}
					year={media.attributes.releaseDate}
					src={media.attributes.artwork?.url.replace('{w}x{h}', '400x400').replace('{f}', 'webp')}
				/>
			</div>
		{/if}

		{#if type === 'video'}
			<SongTile
				artist={media.attributes.artistName || media.attributes?.curatorName}
				title={media.attributes.name}
				year={media.attributes.releaseDate}
				src={media.attributes.artwork?.url.replace('{w}x{h}', '100x100').replace('{f}', 'webp')}
			/>
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

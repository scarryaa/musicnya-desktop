<script lang="ts">
	import AlbumTile from './tiles/album-tile.svelte';
	import SongTile from './tiles/song-tile.svelte';

	let content: HTMLElement;
	export let scrollEvent: { direction: 'left' | 'right'; shouldScroll: boolean };
	export let type: 'song' | 'album' | 'video' = 'album';
	export let data: {
		media: any[];
	};

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
					title={media.attributes.name}
					subtitle="artist"
					artist={media.attributes.artistName || media.attributes?.curatorName}
					src={media.attributes.artwork?.url.replace('{w}x{h}', '100x100').replace('{f}', 'webp')}
				/>
			</div>
		{/if}

		{#if type === 'album'}
			<div class="tile-group__content__tile">
				<AlbumTile
					subtitle="artist"
					id={media.id}
					title={media.attributes.name}
					artist={media.attributes.artistName || media.attributes?.curatorName}
					artistId={media.attributes.artistId}
					src={media.attributes.artwork?.url.replace('{w}x{h}', '400x400').replace('{f}', 'webp')}
				/>
			</div>
		{/if}

		{#if type === 'video'}
			<SongTile
				artist={media.attributes.artistName || media.attributes?.curatorName}
				title={media.attributes.name}
				src={media.attributes.artwork?.url.replace('{w}x{h}', '100x100').replace('{f}', 'webp')}
			/>
		{/if}
	{/each}
</div>

<style lang="scss">
	.tile-group__content {
		gap: 1rem;
		content-visibility: auto;
		margin-top: 0.5rem;
		padding-inline: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(1fr, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(2rem, 1fr));
		grid-auto-flow: column dense;
		overflow-y: scroll;

		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>

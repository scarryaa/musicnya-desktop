<script lang="ts">
	import AlbumTile from '../../../components/media/tiles/album-tile.svelte';
	import { listenLater } from '../../../stores/app.store';

	$: data = $listenLater;
	console.log($listenLater);
</script>

<div class="page-wrapper">
	{#if data?.length > 0}
		{#each data as item}
			<AlbumTile
				id={item.id}
				artistId=""
				shareLink={item.attributes.url}
				src={item.attributes.artwork.url
					.replace('{w}', '300')
					.replace('{h}', '300')
					.replace('{f}', 'webp')}
				title={item.attributes.title}
				artist={item.attributes.artist}
				year={item.attributes.year}
				type="library-albums"
				subtitle="artist"
			/>
		{/each}
	{/if}
</div>

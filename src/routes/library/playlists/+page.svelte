<script lang="ts">
	import AlbumTile from '../../../components/media/tiles/album-tile.svelte';

	export let data;
	console.log(data.media);
</script>

<div class="page-wrapper px-1">
	<h1>Playlists</h1>
	<div class="playlists">
		{#if data?.media.length > 0}
			{#each data.media as item}
				<AlbumTile
					id={item.id}
					artistId=""
					shareLink={item.attributes?.url}
					src={item.attributes?.artwork?.url
						.replace('{w}', '300')
						.replace('{h}', '300')
						.replace('{f}', 'webp') ||
						item.relationships?.tracks?.data?.[0]?.attributes?.artwork?.url
							.replace('{w}', '300')
							.replace('{h}', '300')
							.replace('{f}', 'webp') ||
						''}
					title={item.attributes?.name || ''}
					artist={item.attributes?.artist || ''}
					year={item.attributes?.year || ''}
					type="library-playlists"
					subtitle="none"
				/>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	h1 {
		padding: 0;
	}
	.page-wrapper {
		display: flex;
		flex-direction: column;

		.playlists {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0.5rem;
			row-gap: 1rem;
		}
	}
</style>

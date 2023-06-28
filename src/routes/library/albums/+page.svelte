<script lang="ts">
	import AlbumTile from '../../../components/media/tiles/album-tile.svelte';

	export let data;
	console.log(data.media);
</script>

<div class="page-wrapper">
	<h1>Albums</h1>
	<div class="albums">
		{#if data?.media.length > 0}
			{#each data.media as item}
				<AlbumTile
					id={item.id}
					artistId=""
					src={item.attributes?.artwork?.url
						.replace('{w}', '300')
						.replace('{h}', '300')
						.replace('{f}', 'webp') ||
						item.relationships?.tracks?.data?.[0]?.attributes?.artwork?.url
							.replace('{w}', '300')
							.replace('{h}', '300')
							.replace('{f}', 'webp')}
					title={item.attributes.name}
					artist={item.attributes.artist}
					year={item.attributes.year}
					type="library-albums"
					subtitle="none"
				/>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.page-wrapper {
		display: flex;
		flex-direction: column;

		.albums {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0.5rem;
			row-gap: 1rem;
		}
	}
</style>

<script lang="ts">
	import ArtistTile from '../../../components/media/tiles/artist-tile.svelte';

	export let data;
	console.log(data.media);
</script>

<div class="page-wrapper px-1">
	<h1>Artists</h1>
	<div class="artists">
		{#if data?.media.length > 0}
			{#each data.media as item}
				<ArtistTile
					id={item.id}
					href={`/media/artist/${item.relationships?.catalog?.data?.[0]?.id}`}
					src={item.attributes?.artwork?.url
						.replace('{w}', '500')
						.replace('{h}', '500')
						.replace('{f}', 'webp') ||
						item.relationships?.catalog?.data?.[0]?.attributes?.artwork?.url
							.replace('{w}', '500')
							.replace('{h}', '500')
							.replace('{f}', 'webp')}
					title={item.attributes.name}
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

		.artists {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 1rem;
			row-gap: 1rem;
		}
	}
</style>

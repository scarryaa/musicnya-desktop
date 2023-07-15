<script lang="ts">
	import TableTile from '../../../components/media/tiles/table-tile.svelte';

	export let data;
	console.log(data.media);
</script>

<div class="page-wrapper px-1">
	<h1>Songs</h1>
	<div class="songs">
		{#if data?.media.length > 0}
			{#each data.media as item, i}
				<TableTile
					id={item.id}
					artistId=""
					playlistId=""
					number={i}
					durationInMillis={item.attributes?.durationInMillis}
					albumName={item.relationships?.albums?.data?.[0]?.attributes?.name}
					albumId={item.relationships?.albums?.data?.[0]?.id}
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
					type=""
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

		.songs {
			display: table;
			width: 100%;
		}
	}
</style>

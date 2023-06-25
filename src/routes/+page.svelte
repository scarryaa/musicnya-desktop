<script lang="ts">
	import TileGroup from '../components/media/groupings/tile-group.svelte';

	export let data: {
		streamed: {
			data: any[];
		};
	};
</script>

<div class="page-wrapper">
	{#if data?.data?.length > 0}
		{#each data?.data as item}
			<TileGroup
				groupTitle={item?.attributes?.title?.stringForDisplay || ''}
				contentType={'album'}
				data={{ media: item?.relationships?.contents?.data }}
			/>
		{/each}
	{/if}
</div>

<style lang="scss">
	.page-wrapper {
		padding-block: 1rem;
		padding-top: 2rem;
		overflow-x: hidden;
	}
</style>

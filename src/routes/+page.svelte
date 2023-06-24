<script lang="ts">
	import TileGroup from '../components/media/groupings/tile-group.svelte';

	export let data: {
		data: any[];
	};
</script>

<div class="page-wrapper">
	{#each data.data as item}
		<TileGroup
			groupTitle={item.attributes?.title?.stringForDisplay || ''}
			contentType={'album'}
			data={{ media: item.relationships?.contents.data }}
		/>
	{/each}
</div>

<style lang="scss">
	.page-wrapper {
		padding-block: 1rem;
		padding-top: 2rem;
	}
</style>

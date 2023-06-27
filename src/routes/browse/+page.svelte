<script lang="ts">
	import TileGroup from '../../components/media/groupings/tile-group.svelte';

	export let data;
	console.log(data?.data?.[0]?.relationships?.tabs?.data?.[0]?.relationships?.children?.data);
</script>

<div class="page-wrapper">
	{#if data?.data?.[0]?.relationships?.tabs?.data?.[0]?.relationships?.children?.data.length > 0}
		{#each data?.data?.[0]?.relationships?.tabs?.data?.[0]?.relationships?.children?.data as item}
			<TileGroup
				groupTitle={item?.attributes?.name || ''}
				data={{ media: item?.relationships?.contents?.data || [] }}
				contentType={item?.type || ''}
			/>
		{/each}
	{/if}
</div>

<script lang="ts">
	import TileGroup from '../components/media/groupings/tile-group.svelte';
	import ButtonFilled from '../components/buttons/button-filled.svelte';
	import ButtonIcon from '../components/buttons/button-icon.svelte';
	import BookmarkMusic from 'svelte-material-icons/BookmarkMusic.svelte';
	import { scrollPosition } from '../stores/app.store';

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
				contentType={item?.type || ''}
				data={{ media: item?.relationships?.contents?.data }}
			/>
		{/each}
	{/if}
</div>

<style lang="scss">
	.page-wrapper {
		overflow-x: hidden;
		margin-top: 1rem;
	}
</style>

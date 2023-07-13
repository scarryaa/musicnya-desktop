<script lang="ts">
	import { onMount } from 'svelte';
	import TileGroup from '../components/media/groupings/tile-group.svelte';

	onMount(async () => {
		window.onunhandledrejection = (e) => {
			// window.location.href = '/';
		};
	});

	export let data: {
		streamed: {
			data: any[];
		};
	};

	$: console.log(data);
</script>

{#await data}
	<p>loading...</p>
{:then data}
	<div class="page-wrapper">
		{#if data?.data?.length > 0}
			{#each data?.data as item}
				<TileGroup
					groupTitle={item?.attributes?.title?.stringForDisplay || ''}
					contentType={item?.type || ''}
					data={{ media: item }}
				/>
			{/each}
		{/if}
	</div>
{:catch error}
	<p>Something went wrong</p>
{/await}

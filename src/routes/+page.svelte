<script lang="ts">
	import TileGroup from '../components/media/groupings/tile-group.svelte';

	export let data: {
		streamed: {
			data: any;
		};
	};
</script>

{#await data}
	<p>Loading...</p>
{:then { data }}
	<div class="page-wrapper" />

	<style lang="scss">
		.page-wrapper {
			padding-block: 1rem;
			padding-top: 2rem;
		}
	</style>
{/await}

<script>
	import Search from '../../components/search.svelte';

	export let data;
</script>

<div class="page-wrapper">
	<h1 class="page-wrapper__title">Search</h1>
	<Search />
	<div class="page-wrapper__content">
		{#each data.data?.[2].relationships?.contents?.data as item}
			<div>{item}</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.page-wrapper {
		padding-block: 1rem;
		padding-top: 2rem;
		padding-left: 1rem;
		overflow-x: hidden;
	}
</style>

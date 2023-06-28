<script lang="ts">
	import TileGroup from '../../../../components/media/groupings/tile-group.svelte';

	export let data: {
		media: any;
	};

	console.log(data);
	console.log(data.media?.relationships?.children?.data?.[1].relationships);
</script>

<div class="page-wrapper">
	<img
		src={data.media.attributes?.uber?.masterArt?.url.replace('{w}x{h}', '1920x1080')}
		alt={data.media?.attributes?.name}
	/>
	<div class="page-content">
		<h1 class="title">{data.media?.attributes?.title}</h1>
		{#each data.media?.relationships?.children?.data as item}
			{#if item.attributes?.editorialElementKind === '404'}
				<p class="description">
					{item.attributes?.description}
				</p>
			{:else if item.attributes?.editorialElementKind === '345'}
				<TileGroup
					data={{ media: item.relationships?.contents.data }}
					groupTitle={item.attributes?.title}
					contentType={item.type}
				/>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.page-wrapper {
		overflow-x: hidden;
	}

	.title {
		padding-left: 1rem;
	}

	.description {
		padding-left: 1rem;
	}

	img {
		width: 100%;
		height: auto;
		max-height: 30vh;
		object-fit: cover;
	}
</style>

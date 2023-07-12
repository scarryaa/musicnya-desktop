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
				{#if item.attributes?.title}
					<h2 class="title">
						{item.attributes?.title}
					</h2>
				{/if}
				<p class="description">
					{@html item.attributes?.description}
				</p>
			{:else if item.attributes?.editorialElementKind === '345'}
				<TileGroup
					wrap={true}
					data={{ media: item }}
					groupTitle={item.attributes?.title || ''}
					contentType={item.type}
				/>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.page-wrapper {
		margin-top: -2rem;
		max-width: 1800px;
		margin-inline: auto;
	}

	.title {
		padding-left: 1rem;
	}

	.description {
		padding-left: 1rem;
		color: var(--text);
	}

	img {
		width: 100%;
		height: auto;
		max-height: 30vh;
		object-fit: cover;
	}
</style>

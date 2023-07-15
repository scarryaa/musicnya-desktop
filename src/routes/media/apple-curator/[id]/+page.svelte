<script lang="ts">
	import { play } from '../../../../lib/services/playback-service';
	import ButtonPlay from '../../../../components/buttons/button-play.svelte';
	import ArtistGroup from '../../../../components/media/groupings/artist-group.svelte';
	import TileGroup from '../../../../components/media/groupings/tile-group.svelte';
	import AlbumTile from '../../../../components/media/tiles/album-tile.svelte';
	import TileSelector from '../../../../components/media/tile-selector.svelte';

	export let data: {
		media: any;
	};

	console.log(data);

	const transformedData = Object.entries(data.media.resources['editorial-elements']).map(
		(element: any) => {
			// get the ids and types of the resources
			const ids = element[1].relationships?.contents?.data.map((resource: any) => resource.id);
			const types = element[1].relationships?.contents?.data.map((resource: any) => resource.type);

			// get the resources from the data
			const resources = types?.map((type: any, index: number) => {
				return data.media.resources[type][ids[index]];
			});

			// return the resources
			return {
				name: element[1].attributes?.name,
				resources: resources
			};
		}
	);

	console.log(transformedData);
</script>

<div class="page-wrapper">
	{#if data.media.resources['apple-curators'][data.media?.data?.[0]?.id].attributes?.editorialArtwork?.bannerUber?.url}
		<div class="image-wrapper">
			<img
				src={data.media.resources['apple-curators'][
					data.media?.data?.[0]?.id
				].attributes?.editorialArtwork?.bannerUber?.url
					.replace('{w}x{h}', '1920x1080')
					.replace('{c}', '')
					.replace('{f}', 'webp')}
				alt={data.media?.attributes?.name}
			/>
		</div>
	{/if}
	<div class="page-content">
		<h1 class="title">
			{data.media.resources['apple-curators'][data.media?.data?.[0]?.id].attributes?.name}
		</h1>
		<p class="description">
			{@html data.media.resources['apple-curators'][data.media?.data?.[0]?.id].attributes
				?.plainEditorialNotes?.standard || ''}
		</p>
		{#each transformedData as item}
			{#if item.resources && item.name}
				<div class="item">
					<h1 class="title">{item.name}</h1>
					<div class="resources">
						{#each item.resources as resource}
							<AlbumTile
								shareLink={resource.attributes?.url}
								type={resource.type}
								title={resource.attributes?.name}
								artist={resource.attributes?.artistName}
								artistId={resource.attributes?.artistId}
								id={resource.id}
								src={resource.attributes?.artwork?.url
									.replace('{w}x{h}', '300x300')
									.replace('{c}', 'cc')
									.replace('{f}', 'webp')}
								year={resource.attributes?.releaseDate?.substring(0, 4)}
								subtitle={resource.attributes?.genreNames?.[0]}
							/>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.page-wrapper {
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

	.image-wrapper {
		width: 100%;
		height: 30vh;
		overflow: hidden;
		margin-top: -2rem;

		img {
			width: 100%;
			height: auto;
			max-height: 30vh;
			object-fit: cover;
		}
	}

	.item {
		padding-top: 2rem;

		.resources {
			padding-inline: 1rem;
			display: flex;
			gap: 0.5rem;
			overflow-y: hidden;
			overflow-x: auto;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
</style>

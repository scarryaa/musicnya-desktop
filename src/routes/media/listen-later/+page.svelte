<script lang="ts">
	import AlbumTile from '../../../components/media/tiles/album-tile.svelte';
	import { listenLater } from '../../../stores/app.store';

	console.log($listenLater);
</script>

<div class="page-wrapper">
	<h1>Listen Later</h1>
	<div class="content">
		{#each $listenLater as item}
			<AlbumTile
				id={item.id}
				src={item.artwork}
				title={item.name}
				artist={item.artistName}
				year={''}
				type={item.type}
				artistId={item.artistId}
				subtitle="artist"
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	h1 {
		margin-bottom: 1rem;
	}

	.content {
		padding-left: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: 1rem;
	}
</style>

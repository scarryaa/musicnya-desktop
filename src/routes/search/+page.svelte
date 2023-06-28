<script>
	import Search from '../../components/search.svelte';

	export let data;
	console.log(data);
</script>

<div class="page-wrapper">
	<h1 class="page-wrapper__title">Search</h1>
	<Search />
	<div class="page-wrapper__content">
		{#each data?.data?.[2].relationships?.contents?.data as item}
			<div
				class="search-tile"
				style="background-image: url('{item.attributes?.editorialArtwork?.bannerUber?.url
					.replace('{w}x{h}', '700x700')
					.replace('{c}', '')
					.replace('{f}', 'webp') ||
					item.attributes?.editorialArtwork?.subscriptionHero?.url
						.replace('{w}x{h}', '700x700')
						.replace('{c}', '')
						.replace('{f}', 'webp')}')"
			>
				<div class="search-tile__info">
					<h2 class="search-tile__info__title">
						{item.attributes?.editorialNotes?.name || item.attributes?.name}
					</h2>
				</div>
				<div class="search-tile__overlay" />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../../variables.scss';

	.page-wrapper {
		&__content {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		}

		.search-tile {
			aspect-ratio: 3/1;
			background-size: cover;
			background-position: center;
			margin-right: 0.5rem;
			margin-bottom: 0.5rem;
			border-radius: $border-radius-half;
			position: relative;
			filter: drop-shadow($drop-shadow);

			&:hover {
				.search-tile__overlay {
					opacity: 1;
				}
			}
		}

		.search-tile__overlay {
			transition: opacity 0.2s ease-in-out;
			background-color: rgba(0, 0, 0, 0.2);
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: $border-radius-half;
		}

		.search-tile__info__title {
			color: $white;
			position: absolute;
			bottom: 0.6rem;
			left: 0.6rem;
			font-size: 1.4rem;
			font-weight: 600;
			margin-block: 0;
		}
	}

	@media (min-width: 1470px) {
		.page-wrapper__content {
			grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		}
	}

	@media (max-width: 1469px) {
		.page-wrapper__content {
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		}
	}
</style>

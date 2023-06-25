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
					.replace('{w}x{h}', '500x500')
					.replace('{c}', '')
					.replace('{f}', 'webp') ||
					item.attributes?.editorialArtwork?.subscriptionHero?.url
						.replace('{w}x{h}', '500x500')
						.replace('{c}', '')
						.replace('{f}', 'webp')}')"
			>
				<div class="search-tile__info">
					<h2 class="search-tile__info__title">
						{item.attributes?.editorialNotes?.name || item.attributes?.name}
					</h2>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../../variables.scss';

	.page-wrapper {
		overflow-x: hidden;
		padding-block: 1rem;
		padding-top: 2rem;
		padding-left: 1rem;
		overflow-x: hidden;

		&__content {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); // 2 items per column by default
		}

		.search-tile {
			aspect-ratio: 3/1;
			background-size: cover;
			background-position: center;
			margin-right: 0.5rem;
			margin-bottom: 0.5rem;
			border-radius: $border-radius-half;
			position: relative; // This is the new line
		}

		.search-tile__info__title {
			color: $white;
			position: absolute; // Change this line
			bottom: 0.6rem; // Change this line
			left: 0.6rem; // Change this line
			font-size: 1.4rem;
			font-weight: 600;
		}
	}

	@media (max-width: 1200px) {
		.page-wrapper {
			&__content {
				grid-template-columns: repeat(
					auto-fit,
					minmax(400px, 1fr)
				); // 2 items per column by default
			}
		}
	}

	@media (min-width: 1201px) and (max-width: 1600px) {
		.page-wrapper {
			&__content {
				grid-template-columns: repeat(
					auto-fit,
					minmax(400px, 1fr)
				); // 2 items per column by default
			}
		}
	}

	@media (min-width: 1601px) and (max-width: 1800px) {
		.page-wrapper {
			&__content {
				grid-template-columns: repeat(
					auto-fit,
					minmax(500px, 1fr)
				); // 2 items per column by default
				grid-auto-rows: minmax(250px, auto); // Minimum 2 rows
			}
		}
	}

	@media (min-width: 1801px) and (max-width: 2200px) {
		.page-wrapper {
			&__content {
				grid-template-columns: repeat(
					auto-fit,
					minmax(600px, 1fr)
				); // 2 items per column by default
				grid-auto-rows: minmax(300px, auto); // Minimum 2 rows
			}
		}
	}

	@media (min-width: 2201px) {
		.page-wrapper {
			&__content {
				grid-template-columns: repeat(
					auto-fit,
					minmax(700px, 1fr)
				); // 2 items per column by default
				grid-auto-rows: minmax(350px, auto); // Minimum 2 rows
			}
		}
	}
</style>

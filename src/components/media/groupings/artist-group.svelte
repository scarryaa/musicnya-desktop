<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import SongTile from '../tiles/song-tile.svelte';

	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import AlbumTile from '../tiles/album-tile.svelte';

	export let data: {
		artist: any;
	};
	export let viewType: string;
	export let groupTitle: string;
	export let contentType: string;

	let scrollButtons: HTMLElement;

	function scroll(direction: 'left' | 'right') {
		const scrollAmount = direction === 'left' ? -200 : 200;
		scrollButtons.scrollBy({
			left: scrollAmount,
			behavior: 'smooth'
		});
	}

	//scroll on arrow click
	onMount(() => {
		scrollButtons = document.querySelector('.scroll-buttons__arrows');
		scrollButtons.addEventListener('click', (e) => {
			if (e.target.classList.contains('scroll-buttons__arrows')) return;
			scroll(e.target.classList.contains('ChevronLeft') ? 'left' : 'right');
		});
	});
</script>

<div class="artist-group">
	<div class="artist-group__title-wrapper">
		<h2 class="artist-group__title-wrapper__title">{groupTitle}</h2>
		<div class="scroll-buttons">
			<div class="scroll-buttons__arrows">
				<ChevronLeft />
				<ChevronRight />
			</div>
		</div>
	</div>
	<div class="artist-group__content">
		{#each data.artist.views?.[viewType]?.data as media}
			{#if contentType === 'song'}
				<div class="artist-group__content__song">
					<SongTile
						title={media.attributes.name}
						subtitle="year"
						artist={media.attributes.artistName}
						year={media.attributes.releaseDate.slice(0, 4)}
						src={media.attributes.artwork?.url.replace('{w}x{h}', '100x100').replace('{f}', 'webp')}
					/>
				</div>
			{/if}

			{#if contentType === 'album'}
				<div class="artist-group__content__tile">
					<AlbumTile
						title={media.attributes.name}
						artist={media.attributes.artistName}
						year={media.attributes.releaseDate.slice(0, 4)}
						src={media.attributes.artwork?.url.replace('{w}x{h}', '400x400').replace('{f}', 'webp')}
					/>
				</div>
			{/if}

			{#if contentType === 'video'}
				<SongTile
					title={media.attributes.name}
					year={media.attributes.releaseDate.slice(0, 4)}
					src={media.attributes.artwork?.url.replace('{w}x{h}', '100x100').replace('{f}', 'webp')}
				/>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.artist-group {
		.artist-group__title-wrapper {
			display: flex;
			flex-direction: row;
			margin-top: 1rem;

			&__title {
				margin-inline: 1rem;
				font-size: 1.2rem;
				font-weight: 700;
				color: $text;
				margin-bottom: 0;
				max-width: max-content;
				border-radius: $border-radius-half;
			}

			.scroll-buttons__arrows {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				width: 2.5rem;
				height: 2.5rem;
				border-radius: $border-radius-half;
				background-color: $background;
				margin-inline: 1rem;
				cursor: pointer;
				transition: background-color 0.2s ease-in-out;
				font-size: 2rem;

				> .scroll-button-arrows__icon {
					font-size: 1.6rem;
					font-weight: 500;
					color: $text;
				}
			}
		}

		&__content {
			margin-top: 0.5rem;
			padding-inline: 1rem;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
			grid-template-rows: repeat(auto-fit, minmax(2rem, 1fr));
			grid-auto-flow: column dense;
			overflow-y: scroll;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
</style>

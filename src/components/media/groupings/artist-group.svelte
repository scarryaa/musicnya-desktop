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

	let scrollButtons: HTMLElement | null;

	function scroll(direction: 'left' | 'right') {
		const scrollAmount =
			direction === 'left'
				? -((document.defaultView?.innerWidth ?? 300) - 300)
				: (document.defaultView?.innerWidth ?? 300) - 300;
		document.querySelector('.artist-group__content')?.scrollBy({
			left: scrollAmount,
			behavior: 'smooth'
		});
	}

	onMount(() => {
		scrollButtons = document.querySelector('.scroll-buttons__arrows');

		scrollButtons = document.querySelector('.scroll-buttons__arrows');

		// hide scroll buttons if not scrollable
		const content = document.querySelector('.artist-group__content');

		//scroll on arrow key press if focused, and key is arrowleft, arrowright, space, or enter
		scrollButtons?.addEventListener('keydown', (e) => {
			if (
				e.key === 'ArrowLeft' ||
				e.key === 'ArrowRight' ||
				e.key === 'Space' ||
				e.key === 'Enter'
			) {
				scroll(document.activeElement === scrollButtons?.children[0] ? 'left' : 'right');
			}

			// TODO hide elements as they scroll out of view
			// if (e.key === 'ArrowLeft' && document.activeElement === scrollButtons?.children[0]) {

			// find first element in view and focus it if tabbing from scroll buttons
			if (e.key === 'Tab' && document.activeElement === scrollButtons?.children[1]) {
				const firstElementInView = document.querySelector(
					'.artist-group__content > *:not(.hidden)'
				);
				firstElementInView?.focus();
			}
		});

		scrollButtons?.addEventListener('click', (e) => {
			scroll(document.activeElement === scrollButtons?.children[0] ? 'left' : 'right');
		});
	});
</script>

<div class="artist-group">
	<div class="artist-group__title-wrapper">
		<h2 class="artist-group__title-wrapper__title">{groupTitle}</h2>
		<div class="scroll-buttons">
			<div class="scroll-buttons__arrows">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div tabindex="0" class="scroll-button-arrows__icon">
					<ChevronLeft />
				</div>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div tabindex="0" class="scroll-button-arrows__icon">
					<ChevronRight />
				</div>
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
						subtitle="year"
						id={media.id}
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
				margin-top: 0.5rem;
				outline-offset: 0.2rem;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				width: 2.5rem;
				height: 2.5rem;
				border-radius: $border-radius-half;
				background-color: $background;
				margin-inline: 0.2rem;
				transition: background-color 0.2s ease-in-out;
				font-size: 2rem;

				.scroll-button-arrows__icon {
					align-items: center;
					display: flex;
					font-size: 1.6rem;
					font-weight: 500;
					color: $text;
				}
			}
		}

		&__content {
			content-visibility: auto;
			margin-top: 0.5rem;
			padding-inline: 1rem;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(1fr, 1fr));
			grid-template-rows: repeat(auto-fit, minmax(2rem, 1fr));
			grid-auto-flow: column dense;
			overflow-y: scroll;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
</style>
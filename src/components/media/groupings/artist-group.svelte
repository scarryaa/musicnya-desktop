<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import SongTile from '../tiles/song-tile.svelte';

	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import AlbumTile from '../tiles/album-tile.svelte';
	import ArtistTile from '../tiles/artist-tile.svelte';
	import VideoTile from '../tiles/video-tile.svelte';

	export let data: {
		artist: any;
	};
	export let viewType: string;
	export let groupTitle: string;
	export let contentType: 'albums' | 'songs' | 'videos' | 'artists' = 'album';
	export let scrollable = true;

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

	const content = document.querySelector('.artist-group__content');
	$: scrollable = content?.scrollWidth! > content?.clientWidth!;

	onMount(() => {
		scrollButtons = document.querySelector('.scroll-buttons__arrows');

		// hide elements as they scroll out of view
		content?.addEventListener('scroll', () => {
			const firstElementInView: HTMLElement | null = document.querySelector(
				'.artist-group__content > *:not(.hidden)'
			);
			const lastElementInView: HTMLElement | null = document.querySelector(
				'.artist-group__content > *:not(.hidden):last-child'
			);

			const firstElementInViewRect = firstElementInView?.getBoundingClientRect();
			const lastElementInViewRect = lastElementInView?.getBoundingClientRect();

			const firstElementInViewLeft = firstElementInViewRect?.left ?? 0;
			const lastElementInViewRight = lastElementInViewRect?.right ?? 0;

			const contentRect = content?.getBoundingClientRect();
			const contentLeft = contentRect?.left ?? 0;
			const contentRight = contentRect?.right ?? 0;

			if (firstElementInViewLeft < contentLeft) {
				firstElementInView?.classList.add('hidden');
			} else {
				firstElementInView?.classList.remove('hidden');
			}

			if (lastElementInViewRight > contentRight) {
				lastElementInView?.classList.add('hidden');
			} else {
				lastElementInView?.classList.remove('hidden');
			}
		});

		//scroll on arrow key press if focused, and key is arrowleft, arrowright, space, or enter
		scrollButtons?.addEventListener('keydown', (e) => {
			if (
				e.key === 'ArrowLeft' ||
				e.key === 'ArrowRight' ||
				e.key === 'Space' ||
				e.key === 'Enter'
			) {
				if (e.key === 'Space' || e.key === 'Enter') {
					e.preventDefault();
					scroll(document.activeElement === scrollButtons?.children[0] ? 'left' : 'right');
				} else {
					e.key === 'ArrowLeft' ? scroll('left') : scroll('right');
				}
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
			{#if contentType === 'songs'}
				<div class="artist-group__content__song">
					<SongTile
						id={media.id}
						title={media.attributes.name}
						subtitle="year"
						artist={media.attributes.artistName}
						year={media.attributes.releaseDate?.slice(0, 4)}
						src={media.attributes.artwork?.url.replace('{w}x{h}', '100x100').replace('{f}', 'webp')}
					/>
				</div>
			{/if}

			{#if contentType === 'albums'}
				<div class="artist-group__content__tile">
					<AlbumTile
						type="albums"
						subtitle="year"
						id={media.id}
						title={media.attributes.name}
						artist={media.attributes.artistName}
						artistId={media.attributes.artistId}
						year={media.attributes.releaseDate?.slice(0, 4)}
						src={media.attributes.artwork?.url.replace('{w}x{h}', '400x400').replace('{f}', 'webp')}
					/>
				</div>
			{/if}

			{#if contentType === 'artists'}
				<div class="artist-group__content__artist">
					<ArtistTile
						id={media.id}
						title={media.attributes.name}
						src={media.attributes.artwork?.url.replace('{w}x{h}', '300x300').replace('{f}', 'webp')}
					/>
				</div>
			{/if}

			{#if contentType === 'videos'}
				<VideoTile
					type="videos"
					subtitle="year"
					id={media.id}
					title={media.attributes.name}
					artist={media.attributes.artistName}
					artistId={media.attributes.artistId}
					year={media.attributes.releaseDate?.slice(0, 4)}
					src={media.attributes.artwork?.url.replace('{w}x{h}', '400x400').replace('{f}', 'webp')}
				/>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.artist-group {
		h2 {
			padding-left: 0 !important;
		}

		.artist-group__title-wrapper {
			display: flex;
			flex-direction: row;
			margin-top: 1rem;

			&__title {
				margin-inline: 1rem;
				font-size: 1.2rem;
				font-weight: 700;
				color: var(--text);
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
				color: var(--text);
				margin-inline: 0.2rem;
				transition: color 0.2s ease-in-out;
				font-size: 2rem;

				.scroll-button-arrows__icon {
					align-items: center;
					display: flex;
					font-size: 1.6rem;
					font-weight: 500;
					color: var(--text);
				}
			}
		}

		&__content {
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
			padding-inline: 1rem;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(1fr, 1fr));
			grid-template-rows: repeat(auto-fit, minmax(2rem, 1fr));
			grid-auto-flow: column dense;
			overflow-y: scroll;
			gap: 1rem;
			justify-content: flex-start;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
</style>

<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import SongTile from '../tiles/song-tile.svelte';

	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import AlbumTile from '../tiles/album-tile.svelte';
	import TileSelector from '../tile-selector.svelte';

	export let data: {
		media: any;
	};
	let scrollEvent = {
		direction: 'left',
		shouldScroll: false
	};
	export let groupTitle: string;
	export let contentType: 'album' | 'song' | 'video' = 'album';

	let scrollButtons: HTMLElement | null;

	const eventDispatcher = createEventDispatcher();

	function handleScroll(event: CustomEvent) {
		const scrollAmount =
			event.detail.direction === 'left'
				? -((document.defaultView?.innerWidth ?? 300) - 300)
				: (document.defaultView?.innerWidth ?? 300) - 300;
		console.log(scrollAmount);
	}

	const setupScrolling = (node: HTMLElement) => {
		//scroll on arrow key press if focused, and key is arrowleft, arrowright, space, or enter
		const group = node.querySelector('.tile-group__content');
		node?.addEventListener('keydown', (e) => {
			if (
				e.key === 'ArrowLeft' ||
				e.key === 'ArrowRight' ||
				e.key === 'Space' ||
				e.key === 'Enter'
			) {
				scrollEvent.direction = document.activeElement === node?.children[0] ? 'left' : 'right';
				scrollEvent.shouldScroll = true;
			}
		});

		// TODO hide elements as they scroll out of view
		// TODO find first element in view and focus it if tabbing from scroll buttons

		node?.addEventListener('click', () => {
			scrollEvent.direction = document.activeElement === node?.children[0] ? 'left' : 'right';
			scrollEvent.shouldScroll = true;
		});
	};
</script>

<div class="tile-group">
	<div class="tile-group__title-wrapper">
		<h2 class="tile-group__title-wrapper__title">{groupTitle}</h2>
		<div class="scroll-buttons">
			<div class="scroll-buttons__arrows" use:setupScrolling>
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
	<TileSelector {data} type={contentType} {scrollEvent} />
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.tile-group {
		.tile-group__title-wrapper {
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
	}
</style>

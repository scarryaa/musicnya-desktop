<script lang="ts">
	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import TileSelector from '../tile-selector.svelte';

	let component: HTMLElement;
	let scrollable: boolean = true;
	export let data: {
		media: any;
	};
	let scrollEvent: { direction: 'left' | 'right'; shouldScroll: boolean } = {
		direction: 'left',
		shouldScroll: false
	};
	export let groupTitle: string;
	export let contentType: 'albums' | 'songs' | 'videos' | 'editorial-elements' = 'albums';

	$: scrollable
		? component?.classList.add('scrollable')
		: component?.classList.remove('scrollable');

	const setupScrolling = (node: HTMLElement) => {
		//scroll on arrow key press if focused, and key is arrowleft, arrowright, space, or enter
		node?.addEventListener('keydown', (e) => {
			if (
				e.key === 'ArrowLeft' ||
				e.key === 'ArrowRight' ||
				e.key === 'Space' ||
				e.key === 'Enter'
			) {
				if (e.key === 'ArrowLeft') {
					scrollEvent.direction = 'left';
				} else if (e.key === 'ArrowRight') {
					scrollEvent.direction = 'right';
				} else {
					scrollEvent.direction = document.activeElement === node?.children[0] ? 'left' : 'right';
				}
				scrollEvent.shouldScroll = true;
			}
		});

		// hide elements as they scroll out of view
		node?.addEventListener('scroll', () => {
			const firstElementInView: HTMLElement | null = document.querySelector(
				'.tile-group__content > *:not(.hidden)'
			);
			const lastElementInView: HTMLElement | null = document.querySelector(
				'.tile-group__content > *:not(.hidden):last-child'
			);

			const firstElementInViewRect = firstElementInView?.getBoundingClientRect();
			const lastElementInViewRect = lastElementInView?.getBoundingClientRect();

			const firstElementInViewLeft = firstElementInViewRect?.left ?? 0;
			const lastElementInViewRight = lastElementInViewRect?.right ?? 0;

			const contentRect = node?.getBoundingClientRect();
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

		node?.addEventListener('click', () => {
			scrollEvent.direction = document.activeElement === node?.children[0] ? 'left' : 'right';
			scrollEvent.shouldScroll = true;
		});
	};
</script>

<div class="tile-group">
	<div class="tile-group__title-wrapper">
		<h2 class="tile-group__title-wrapper__title">{groupTitle}</h2>
		<div class="scroll-buttons" bind:this={component}>
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
	<TileSelector {data} type={contentType} {scrollEvent} bind:scrollable />
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.tile-group {
		overflow: visible;

		.tile-group__title-wrapper {
			display: flex;
			flex-direction: row;
			margin-top: 1rem;

			&__title {
				margin-inline: 1rem;
				font-size: 2rem;
				font-weight: 400;
				color: $text;
				margin-bottom: 0;
				max-width: max-content;
				border-radius: $border-radius-half;
			}

			.scroll-buttons__arrows {
				margin-top: 1.6rem;
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

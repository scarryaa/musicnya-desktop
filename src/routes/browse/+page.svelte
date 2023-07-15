<script lang="ts">
	import EditorialTile from '../../components/media/tiles/editorial-tile.svelte';
	import TileGroup from '../../components/media/groupings/tile-group.svelte';
	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import LinkTile from '../../components/media/tiles/link-tile.svelte';

	export let data;
	console.log(data?.data?.[0]?.relationships?.tabs?.data?.[0]?.relationships?.children?.data);

	let scrollEvent: { direction: 'left' | 'right'; shouldScroll: boolean } = {
		direction: 'left',
		shouldScroll: false
	};
	let component: HTMLElement;

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
				'div.editorial-tiles > *:not(.hidden)'
			);
			const lastElementInView: HTMLElement | null = document.querySelector(
				'div.editorial-tiles > *:not(.hidden):last-child'
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

			// scroll
			// TODO kinda hacky, fix this
			(node.parentElement?.parentElement?.nextSibling?.nextSibling as HTMLElement).scrollBy({
				left:
					scrollEvent.direction === 'left'
						? -(document.defaultView?.innerWidth || -800) + 250
						: (document.defaultView?.innerWidth || 800) - 250,
				behavior: 'smooth'
			});
		});
	};
</script>

<div class="page-wrapper">
	{#if data?.data?.[0]?.relationships?.tabs?.data?.[0]?.relationships?.children?.data.length > 0}
		{#each data?.data?.[0]?.relationships?.tabs?.data?.[0]?.relationships?.children?.data as item}
			<!-- svelte-ignore empty-block -->
			{#if item.attributes?.editorialElementKind === '322'}{:else if item.attributes?.editorialElementKind === '323'}{:else if item.attributes?.editorialElementKind === '391'}
				{#if item.attributes.name}
					<div class="editorial-tiles__title mb-1">
						<h2 class="tile-group__title-wrapper__title">
							{item?.attributes?.name || ''}
						</h2>
					</div>
				{/if}
				<div class="link-tiles pl-1">
					{#each item.attributes.links as link}
						<LinkTile
							href={link.url.includes('viewGrouping')
								? `/media/editorial-elements/${link.url?.split('/').pop().split('=')[2]}`
								: link.url}
							target={link.url.includes('viewGrouping') ? '_self' : '_blank'}
							label={link.label}
						/>
					{/each}
				</div>
			{:else if item.relationships?.children?.data.length > 0}
				<div class="editorial-tiles__scroll-title">
					<div class="editorial-tiles__title">
						<h2>
							{item?.attributes?.name || ''}
						</h2>
					</div>
					<div
						class="scroll-buttons"
						bind:this={component}
						style="margin-left: {item.attributes.name ? 0.5 : 0}rem"
					>
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
				<div class="editorial-tiles">
					{#each item.relationships?.children?.data as child}
						<EditorialTile
							href={child.attributes?.editorialElementKind === '320'
								? child.attributes?.link?.url?.includes('viewMultiRoom')
									? `/media/${child.type}/${
											child.attributes?.link?.url?.split('/')?.pop()?.split('=')[2]?.split('&')[0]
									  }`
									: `/media/${child.type}/${
											child.attributes?.link?.url?.split('/').pop()?.split('=')[2]
									  }`
								: child.attributes?.editorialElementKind === '394'
								? `/media/editorial-elements/${
										child.attributes?.link?.url?.split('/').pop()?.split('=')[2]?.split('&')[0]
								  }`
								: `/media/${child.relationships?.contents?.data?.[0]?.type.slice(0, -1)}/${
										child.relationships?.contents?.data?.[0]?.id
								  }`}
							editorialElementKind={child.attributes?.editorialElementKind}
							id={child.relationships?.contents?.data?.[0]?.id}
							type={child.relationships?.contents?.data?.[0]?.type}
							src={child.relationships?.contents?.data?.[0]?.attributes?.editorialArtwork?.superHeroWide?.url
								.replace('{w}', '600')
								.replace('{h}', '400')
								.replace('{f}', 'webp') ||
								child.relationships?.contents?.data?.[0]?.attributes?.editorialArtwork?.superHeroWide?.url
									.replace('{w}', '800')
									.replace('{h}', '600')
									.replace('{f}', 'webp') ||
								child.relationships?.contents?.data?.[0]?.attributes?.editorialArtwork?.subscriptionHero?.url
									.replace('{w}', '800')
									.replace('{h}', '600')
									.replace('{f}', 'webp') ||
								child?.attributes?.artwork?.url
									.replace('{w}', '800')
									.replace('{h}', '600')
									.replace('{f}', 'webp')}
							title={child.relationships?.contents?.data?.[0]?.attributes?.name ||
								child.relationships?.contents?.data?.[0]?.attributes?.plainEditorialNotes?.name ||
								child.attributes?.designTag}
							badge={child.attributes?.designBadge}
							showBadge={child.attributes?.designBadge !== undefined}
							showPlayButton={child.attributes?.editorialElementKind !== '320' &&
								child.type !== 'apple-curators' &&
								child.relationships?.contents?.data?.[0]?.type !== 'apple-curators' &&
								child.attributes?.editorialElementKind !== '394'}
							subtitle={child.relationships?.contents?.data?.[0]?.attributes?.artistName ||
								child.relationships?.contents?.data?.[0]?.attributes?.curatorName ||
								''}
						/>
					{/each}
				</div>
			{:else}
				<TileGroup
					groupTitle={item?.attributes?.name || ''}
					data={{ media: item || [] }}
					contentType={item?.type || ''}
				/>
			{/if}
		{/each}
	{/if}
</div>

<style lang="scss">
	.page-wrapper {
		margin-top: -2rem;

		.editorial-tiles__scroll-title {
			margin-top: 2rem;
			display: flex;
			flex-direction: row;
		}

		.scroll-buttons {
			display: flex;
			flex-direction: row;
			margin-top: 0.2rem;
			margin-left: 1rem;
			color: var(--text);
			font-size: 1.6rem;

			> * {
				display: flex;
			}
		}

		.link-tiles {
			margin-bottom: 1rem;
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			row-gap: 1rem;
			padding-right: 0.5rem;

			&::-webkit-scrollbar {
				display: none;
			}
		}

		.editorial-tiles {
			display: flex;
			flex-direction: row;
			overflow-x: scroll;
			overflow-y: hidden;
			gap: 1rem;
			padding-right: 0.5rem;
			margin-bottom: 2rem;

			&::-webkit-scrollbar {
				display: none;
			}
		}

		.editorial-tiles__title {
			margin-top: 2rem;
			padding-left: 1rem;

			> h2 {
				margin-block: 0;
				padding: 0;
			}
		}

		.scroll-buttons__arrows {
			> * {
				margin-top: 1.9rem;
				align-self: end;
			}
		}
	}
</style>

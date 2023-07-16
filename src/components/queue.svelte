<script lang="ts">
	import { goto } from '$app/navigation';
	import DrawerButton from './drawer/drawer-button.svelte';
	import AllInclusive from 'svelte-material-icons/AllInclusive.svelte';
	import Play from 'svelte-material-icons/Play.svelte';

	$: items = MusicKit.getInstance().queue.items;
	$: console.log(items);

	export const lookupArtist = async (name: string) => {
		await fetch(
			`https://amp-api.music.apple.com/v1/catalog/us/search?term=${name}&limit=1&types=artists`,
			{
				headers: {
					Authorization: `Bearer ${MusicKit.getInstance().developerToken}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'media-user-token': MusicKit.getInstance().musicUserToken
				}
			}
		)
			.then((res) => res.json())
			.then((data) => goto(`/media/artist/${data.results.artists.data[0].id}`));
	};

	export const lookupAlbum = async (name: string, artistName: string) => {
		await fetch(
			`https://amp-api.music.apple.com/v1/catalog/us/search?term=${name} ${artistName}&limit=1&types=albums`,
			{
				headers: {
					Authorization: `Bearer ${MusicKit.getInstance().developerToken}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'media-user-token': MusicKit.getInstance().musicUserToken
				}
			}
		)
			.then((res) => res.json())
			.then((data) => goto(`/media/album/${data.results.albums.data[0].id}`));
	};
</script>

<div class="queue">
	<div class="header">
		<h2>Queue</h2>
		<svelte:component this={AllInclusive} width="2.5rem" on:click />
	</div>
	<div class="content">
		{#each items as item}
			<div class="item">
				<div class="item__image">
					<div
						class="item__image__overlay"
						on:click={() =>
							MusicKit.getInstance().setQueue({
								items: items,
								startWith: items.indexOf(item),
								startPlaying: true
							})}
					>
						<svelte:component this={Play} color="white" size="1.8rem" />
					</div>
					<img src={item.attributes?.artwork?.url.replace('{w}x{h}', '100x100')} />
				</div>
				<div class="item__info">
					<div
						class="title"
						on:click={() => lookupAlbum(item.attributes?.albumName, item.attributes?.artistName)}
					>
						{item.attributes?.name}
					</div>
					<div class="artist" on:click={() => lookupArtist(item.attributes?.artistName)}>
						{item.attributes?.artistName}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	:root[data-theme='dark'] {
		--hover: rgba(255, 255, 255, 0.1);
	}

	:root[data-theme='light'] {
		--hover: rgba(0, 0, 0, 0.1);
	}

	.queue {
		width: 100%;
		height: 100%;
		overflow-y: auto;

		h2 {
			font-size: 1.5rem;
			font-weight: 500;
			padding-left: 0;
			margin: 0;
		}

		.header {
			display: flex;
			align-items: end;
			margin-top: 1rem;
			margin-inline: 1rem;
			margin-bottom: 0.5rem;

			:global(:nth-child(2)) {
				margin-left: auto;
				margin-right: 0.5rem;
				border-radius: 4px;
				padding: 0.2rem;
				color: var(--text);

				&:hover {
					background-color: var(--hover);
				}
			}

			:global(svg) {
				width: 1.5rem;
				height: 1.5rem;
				fill: var(--text);
				margin-top: 0.25rem;
			}
		}

		.content {
			display: flex;
			flex-direction: column;
			margin-inline: 0.5rem;

			.item {
				display: flex;
				font-size: 0.9rem;
				padding: 0.5rem;
				border-radius: 4px;

				&:hover {
					background-color: var(--hover);

					.item__image__overlay {
						opacity: 1;
					}
				}

				&__image {
					position: relative;
					min-width: 40px;
					min-height: 40px;
					max-width: 40px;
					max-height: 40px;
					margin-right: 0.5rem;
					border-radius: 4px;
					overflow: hidden;

					.item__image__overlay {
						position: absolute;
						display: flex;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background-color: rgba(0, 0, 0, 0.5);
						justify-content: center;
						align-items: center;
						border-radius: 4px;
						opacity: 0;

						:global(svg) {
							position: absolute;
							fill: var(--text) !important;

							&:hover {
								transform: scale(1.01) translate(-1px, -1px);
							}
						}
					}

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}

				&__info {
					display: flex;
					flex-direction: column;
					justify-content: center;
					width: 100%;
					overflow: hidden;

					.title {
						font-weight: 500;
						line-clamp: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: var(--text);
						max-width: max-content;
						width: 100%;

						&:hover {
							text-decoration: underline;
						}
					}

					.artist {
						font-size: 0.8rem;
						line-clamp: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: var(--text-light);
						max-width: max-content;
						width: 100%;

						&:hover {
							text-decoration: underline;
						}
					}
				}
			}
		}
	}
</style>

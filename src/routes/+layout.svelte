<script lang="ts">
	import '../app.scss';
	import '../variables.scss';

	import { drawerOpen, firstLaunch, listenLater } from '../stores/app.store';
	import { developerToken, libraryPlaylists, musicUserToken } from '../stores/musickit.store';
	import { initMusicKit } from '../lib/api/music.api';
	import { onMount } from 'svelte';
	import { getLibraryPlaylists } from '../lib/api/musickit.api';

	import Drawer from '../components/drawer/drawer.svelte';
	import Footer from '../components/footer.svelte';
	import NowPlayingTile from '../components/media/tiles/now-playing-tile.svelte';
	import DrawerChip from '../components/drawer/drawer-chip.svelte';
	import MediaTile from '../components/media/tiles/media-tile.svelte';
	import Titlebar from '../components/window/titlebar.svelte';
	import DrawerButton from '../components/drawer/drawer-button.svelte';
	import NavigationButtons from '../components/window/navigation-buttons.svelte';

	import BookmarkMusic from 'svelte-material-icons/BookmarkMusic.svelte';
	import HomeVariant from 'svelte-material-icons/HomeVariant.svelte';
	import ViewGridOutline from 'svelte-material-icons/ViewGridOutline.svelte';
	import Broadcast from 'svelte-material-icons/Broadcast.svelte';
	import Album from 'svelte-material-icons/Album.svelte';
	import AccountGroup from 'svelte-material-icons/AccountGroup.svelte';
	import MusicNote from 'svelte-material-icons/MusicNote.svelte';
	import MusicBoxMultiple from 'svelte-material-icons/MusicBoxMultiple.svelte';
	import Plus from 'svelte-material-icons/Plus.svelte';
	import PlaylistMusic from 'svelte-material-icons/PlaylistMusic.svelte';
	import MediaControls from '../components/media/media-controls.svelte';
	import Magnify from 'svelte-material-icons/Magnify.svelte';
	import Search from '../components/search.svelte';
	import WindowButtons from '../components/window/window-buttons.svelte';
	import Modal from '../components/window/modal.svelte';
	import type { MusicKit } from '../lib/types/musickit';
	import { addEventHandlers } from '../lib/event-handlers/apple-music-events';

	let playlists = [];
	let drawer;
	let modal;

	onMount(async () => {
		// initializer
		firstLaunch.set(false);
		// if ($firstLaunch) {
		// 	modal = new Modal({
		// 		target: document.body,
		// 		props: {
		// 			component: Startup
		// 		}
		// 	});
		// }

		//read in listen later
		localStorage.getItem('listenLater') === null
			? localStorage.setItem('listenLater', JSON.stringify([]))
			: listenLater.set(JSON.parse(localStorage.getItem('listenLater')));
	});
</script>

<main>
	<Titlebar>
		<WindowButtons />
	</Titlebar>

	<Drawer bind:this={drawer}>
		<div slot="top-left">
			<a href="/search" tabindex="-1">
				<DrawerButton>
					<Magnify slot="icon" />
					<span>Search</span>
				</DrawerButton>
			</a>
			<a href="/" tabindex="-1">
				<DrawerButton>
					<HomeVariant slot="icon" />
					<span>Home</span>
				</DrawerButton>
			</a>
			<a href="/browse" tabindex="-1">
				<DrawerButton>
					<ViewGridOutline slot="icon" />
					<span>Browse</span>
				</DrawerButton>
			</a>
			<a href="/radio" tabindex="-1">
				<DrawerButton>
					<Broadcast slot="icon" />
					<span>Radio</span>
				</DrawerButton>
			</a>
		</div>
		<div slot="bottom-left">
			<div class="bottom-left__container">
				<DrawerButton on:click={drawer.toggle}>
					<MusicBoxMultiple slot="icon" />
					<span>Library</span>
				</DrawerButton>
				<DrawerButton --showPlus={$drawerOpen ? 'block' : 'none'} --margin-left="2.7rem">
					<Plus slot="icon" />
				</DrawerButton>
			</div>
			<div class="bottom-left-container__chips" style="display: {$drawerOpen ? 'flex' : 'none'}">
				<a href="/library/songs" tabindex="-1">
					<DrawerChip>
						<MusicNote />
					</DrawerChip>
				</a>
				<a href="/library/playlists" tabindex="-1">
					<DrawerChip>
						<PlaylistMusic />
					</DrawerChip>
				</a>
				<a href="/library/albums" tabindex="-1">
					<DrawerChip>
						<Album />
					</DrawerChip>
				</a>
				<a href="/library/artists" tabindex="-1">
					<DrawerChip>
						<AccountGroup />
					</DrawerChip>
				</a>
			</div>
			<div class="divider-wrapper">
				<div class="divider" />
			</div>
			<div
				class="bottom-left__scroll-wrapper"
				style="width: {$drawerOpen ? '95%' : '70%'}; padding-right: {$drawerOpen ? '0' : '0.8rem'}"
			>
				{#each $libraryPlaylists as playlist, i (i)}
					<MediaTile
						href={`/media/playlist/${playlist.id}`}
						tabindex="-1"
						--showInfo={$drawerOpen ? 'block' : 'none'}
						title={playlist.attributes?.name || 'Untitled'}
						artist={playlist.attributes?.curatorName || 'Me'}
						src={playlist.attributes?.artwork?.url
							.replace('{w}x{h}', '100x100')
							.replace('{f}', 'webp') ||
							playlist?.relationships?.tracks?.data?.[0]?.attributes?.artwork?.url
								.replace('{w}x{h}', '100x100')
								.replace('{f}', 'webp') ||
							''}
					/>
				{/each}
			</div>
		</div>
		<div slot="main">
			<div class="content">
				<div class="nav-buttons-wrapper">
					<NavigationButtons />
					<!-- <Search /> -->
				</div>
				<div class="content-wrapper">
					<slot />
				</div>
			</div>
		</div>
	</Drawer>
	<Footer>
		<div class="footer-wrapper">
			<NowPlayingTile />
			<MediaControls />
		</div>
	</Footer>
</main>

<style lang="scss">
	@use '../variables.scss' as *;

	main {
		padding: 1em;
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.content {
		padding-top: 0;
		padding-bottom: 0;
		margin: 0;
		height: 100%;
		overflow-y: hidden;
		padding-right: 0.6rem;
		margin-right: -0.6rem;
	}

	.content-wrapper {
		height: inherit;
		overflow-y: overlay;
		overflow-x: hidden;
	}

	.bottom-left__container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: $drawer-left-width;
	}

	.bottom-left-container__chips {
		display: flex;
		flex-direction: row;
		align-items: center;
		column-gap: 2rem;
		margin-left: -1rem;
		gap: 0.8rem;

		:global(> *) {
			margin-top: -0.8rem;
		}
	}

	.divider-wrapper {
		position: relative;
		width: 100%;
		margin-left: -1.6rem;
		height: 0;
	}

	.divider {
		position: absolute;
		left: 0;
		pointer-events: none;
		height: 0rem;
		background-color: transparent;
		border-top: 1px solid rgba(0, 0, 0, 0.15);
		margin-top: -0.8rem;
		z-index: 100;
		width: 100%;
		filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.4)) drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.4))
			drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.4)) drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.4))
			drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.4)) drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.4))
			drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.15));
	}

	.nav-buttons-wrapper {
		position: relative;
	}

	.bottom-left__scroll-wrapper {
		width: 95%;
		display: block;
		position: relative;
		height: inherit;
		overflow-y: hidden;
		overflow-x: hidden;
		margin-top: -1.5rem !important;
		padding-top: 0.5rem;
		margin-left: -0.85rem;

		&:hover {
			overflow-y: overlay;
		}

		:global(.album-tile) {
			margin-bottom: 0.5rem;
		}

		:global(button) {
			width: 125%;
		}
	}

	.footer-wrapper {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
	}
</style>

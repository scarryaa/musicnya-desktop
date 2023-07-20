<script lang="ts">
	import '../app.scss';
	import '../variables.scss';
	import '@fontsource/inter';
	import '@fontsource/readex-pro';
	import '@fontsource/uncut-sans';
	import '@fontsource/montserrat';
	import '@fontsource/noto-sans-jp';

	import {
		drawerOpen,
		drawerRightOpen,
		listenLater,
		loggedIn,
		lyricsOpen,
		queueOpen,
		scrollPositionY
	} from '../stores/app.store';
	import { libraryPlaylists } from '../stores/musickit.store';
	import { onMount } from 'svelte';

	import Drawer from '../components/drawer/drawer.svelte';
	import { toasts } from '../stores/toasts.store';
	import Footer from '../components/footer.svelte';
	import NowPlayingTile from '../components/media/tiles/now-playing-tile.svelte';
	import DrawerChip from '../components/drawer/drawer-chip.svelte';
	import DrawerTile from '../components/media/tiles/drawer-tile.svelte';
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
	import WindowButtons from '../components/window/window-buttons.svelte';
	import { navigating } from '$app/stores';
	import LoadingSpinner from '../components/loading-spinner.svelte';
	import Lyrics from '../components/lyrics.svelte';
	import Queue from '../components/queue.svelte';
	import Modal from '../components/window/modal.svelte';
	import Login from '../components/login.svelte';
	import { goto } from '$app/navigation';
	import { show } from '../lib/services/modal.service';
	import { newPlaylist } from '$lib/api/actions.api';
	import Toast from '../components/toast.svelte';

	let drawer;

	const setQueueOpen = () => {
		queueOpen.set(!$queueOpen);
		lyricsOpen.set(false);

		if (!$queueOpen) drawerRightOpen.set(false);
		else drawerRightOpen.set(true);
	};

	const setLyricsOpen = () => {
		lyricsOpen.set(!$lyricsOpen);
		queueOpen.set(false);

		if (!$lyricsOpen) drawerRightOpen.set(false);
		else drawerRightOpen.set(true);
	};

	onMount(async () => {
		const setTheme = (theme) => {
			document.documentElement.dataset.theme = theme;
		};

		document.documentElement.dataset.theme = localStorage.getItem('theme') || 'light';

		const hasSetDarkMode = document.documentElement.dataset.theme === 'dark';
		const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark').matches;

		setTheme(prefersDarkMode || hasSetDarkMode ? 'dark' : 'light');

		//check if user is logged in
		if (!$loggedIn) {
			show(Login, 700, 400);
		} else {
			// redirect to home if user is logged in
			if (window.location.pathname === '/') {
				goto('/home');
			}
		}

		//read in listen later
		localStorage.getItem('listenLater') === null
			? localStorage.setItem('listenLater', JSON.stringify([]))
			: listenLater.set(JSON.parse(localStorage.getItem('listenLater') || ''));

		const report_error = (msg: string = 'unknown error') => {
			$toasts.push({
				message: `Unhandled error: ${msg}`,
				type: 'error'
			});

			console.error(msg);
		};

		const handle_rejection = (e: PromiseRejectionEvent) => {
			e.preventDefault();
			report_error(e?.reason);
		};

		const handle_error = (e: ErrorEvent) => {
			report_error(e?.message);
		};

		window.addEventListener('unhandledrejection', handle_rejection);
		window.addEventListener('error', handle_error);

		return () => {
			window.removeEventListener('unhandledrejection', handle_rejection);
			window.removeEventListener('error', handle_error);
		};
	});
</script>

<svelte:window bind:scrollY={$scrollPositionY} />

<main>
	<Titlebar>
		<WindowButtons />
	</Titlebar>

	<Drawer bind:this={drawer}>
		<div slot="top-left">
			<a href="/media/listen-later" tabindex="-1">
				<DrawerButton title="Listen Later">
					<BookmarkMusic slot="icon" />
					<span class="drawer-text">Listen Later</span>
				</DrawerButton>
			</a>
			<a href="/search" tabindex="-1">
				<DrawerButton title="Search">
					<Magnify slot="icon" />
					<span class="drawer-text">Search</span>
				</DrawerButton>
			</a>
			<a href="/home" tabindex="-1">
				<DrawerButton title="Home">
					<HomeVariant slot="icon" />
					<span class="drawer-text">Home</span>
				</DrawerButton>
			</a>
			<a href="/browse" tabindex="-1">
				<DrawerButton title="Browse">
					<ViewGridOutline slot="icon" />
					<span class="drawer-text">Browse</span>
				</DrawerButton>
			</a>
			<a href="/radio" tabindex="-1">
				<DrawerButton title="Radio">
					<Broadcast slot="icon" />
					<span class="drawer-text">Radio</span>
				</DrawerButton>
			</a>
		</div>
		<div slot="bottom-left">
			<div class="bottom-left__container">
				<DrawerButton title="Your Library" on:click={drawer.toggle}>
					<MusicBoxMultiple slot="icon" />
					<span class="drawer-text">Library</span>
				</DrawerButton>
				<DrawerButton
					title="New Playlist"
					--showPlus={$drawerOpen ? 'block' : 'none'}
					--margin-left="2.7rem"
					on:click={(e) => newPlaylist(e)}
				>
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
				style="width: {$drawerOpen ? '80%' : '70%'}; padding-right: {$drawerOpen
					? '30px'
					: '0.8rem'}"
			>
				{#each $libraryPlaylists as playlist, i (i)}
					<DrawerTile
						id={playlist.id}
						type="library-playlists"
						href={`/media/playlist/${playlist.id}`}
						tabindex="-1"
						--showInfo={$drawerOpen ? 'block' : 'none'}
						title={playlist.attributes?.name || 'Untitled'}
						artist={playlist.attributes?.curatorName || ''}
						src={playlist.attributes?.artwork?.url
							.replace('{w}x{h}', '100x100')
							.replace('{f}', 'webp') ||
							playlist?.relationships?.tracks?.data?.[0]?.attributes?.artwork?.url
								.replace('{w}x{h}', '100x100')
								.replace('{f}', 'webp') ||
							'/images/music_note.png'}
					/>
				{/each}
			</div>
		</div>
		<div slot="right">
			{#if $lyricsOpen}
				<svelte:component this={Lyrics} />
			{:else if $queueOpen}
				<svelte:component this={Queue} />
			{/if}
		</div>
		<div slot="main">
			<div class="content">
				<div class="nav-buttons-wrapper">
					<NavigationButtons />
					<!-- <Search /> -->
				</div>
				<div class="content-wrapper">
					{#if $navigating}
						<svelte:component this={LoadingSpinner} />
					{:else}
						<slot />
					{/if}
					<Toast />
				</div>
			</div>
		</div>
	</Drawer>
	<Footer>
		<div class="footer-wrapper">
			<NowPlayingTile />
			<MediaControls onLyricsClick={() => setLyricsOpen()} onQueueClick={() => setQueueOpen()} />
		</div>
	</Footer>
</main>

<style lang="scss">
	@use '../variables.scss' as *;

	main {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.drawer-text {
			font-size: 1.1rem !important;
			margin-bottom: 0.1rem;
		}
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
		overflow-x: hidden;

		:global(> *) {
			padding-top: 2rem;
			padding-bottom: 1rem;
			overflow-y: overlay;
			overflow-x: hidden;
		}
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
		width: 90%;
		padding-right: 10px;
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

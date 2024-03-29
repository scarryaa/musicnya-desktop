<script lang="ts">
	import type { MusicKit } from '../lib/types/musickit';
	import { search } from '../lib/api/musickit.api';
	import debounce from 'lodash/debounce';
	import ButtonPlay from './buttons/button-play.svelte';
	import { play } from '../lib/services/playback-service';

	let results: MusicKit.SearchResult<MusicKit.MediaItem> = {
		artists: {
			data: []
		},

		songs: {
			data: []
		},

		albums: {
			data: []
		},

		playlists: {
			data: []
		}
	};

	// debounce search input
	const _search = debounce(async (query: string) => {
		if (query.length > 0) {
			const response = await search(query);
			results = response.results;
		} else {
			// hide results if query is empty
			results = {
				artists: {
					data: []
				},
				songs: {
					data: []
				},

				albums: {
					data: []
				},

				playlists: {
					data: []
				}
			};
		}
	}, 500);

	let timeout: ReturnType<typeof setTimeout>;

	// show results on focus
	const _showResults = () => {
		clearTimeout(timeout);
		document.querySelector('.search .search__results')?.classList.add('active');
	};

	// hide results on blur, with timeout
	const _hideResults = () => {
		// check if child is focused
		timeout = setTimeout(() => {
			if (!document.querySelector('.search .search__results *:focus')) {
				document.querySelector('.search .search__results')?.classList.remove('active');
			}
		}, 100);
	};

	// hide results on tab
	const _hideResultsTab = (e: KeyboardEvent) => {
		if (e.key === 'Tab') {
			document.querySelector('.search .search__results')?.classList.remove('active');
		}
	};
</script>

<div class="search">
	<div class="content">
		<input
			type="text"
			placeholder="Search"
			on:input={(e) => _search(e.target.value)}
			on:focusin={_showResults}
			on:focusout={_hideResults}
			on:keydown={_hideResultsTab}
		/>
		<div class="icon">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="M15.5 14h-.79l-.28-.27a6.47 6.47 0 001.48-4.18c0-3.59-2.91-6.5-6.5-6.5S2 5.96 2 9.55s2.91 6.5 6.5 6.5c1.54 0 2.95-.54 4.06-1.44l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0a4.5 4.5 0 11.01-8.99A4.5 4.5 0 019.5 14z"
				/>
			</svg>
		</div>
		<div class="search__results">
			{#each results?.artists?.data as artist}
				<a class="search__results__result artist-result" href={`/media/artist/${artist.id}`}>
					<div class="search__results__result__image__overlay">
						<div class="search__results__result__image__overlay__play">
							<ButtonPlay size="2rem" color="white" />
						</div>
						<img
							loading="eager"
							src={artist.attributes?.artwork?.url?.replace('{w}x{h}', '100x100')}
							alt=""
							class="search__results__result__image__artist"
						/>
					</div>
					<div class="search__results__result__info">
						<div>{artist.attributes?.name}</div>
					</div>
					<div class="search__results__result__type">
						<span>Artist</span>
					</div>
				</a>
			{/each}
			{#each results?.albums?.data as album}
				<a class="search__results__result" href={`/media/album/${album.id}`}>
					<div class="search__results__result__image__overlay">
						<div class="search__results__result__image__overlay__play">
							<ButtonPlay size="2rem" color="white" />
						</div>
						<img
							loading="eager"
							src={album.attributes?.artwork?.url?.replace('{w}x{h}', '100x100')}
							alt=""
						/>
					</div>
					<div class="search__results__result__info">
						<div>{album.attributes?.name}</div>
						<div>{album.attributes?.artistName}</div>
					</div>
					<div class="search__results__result__type">
						<span>Album</span>
					</div>
				</a>
			{/each}
			{#each results?.songs?.data as song}
				<a
					class="search__results__result"
					href={`/media/album/${song.attributes?.url?.split('/').pop().split('?')[0]}`}
				>
					<div class="search__results__result__image__overlay">
						<div class="search__results__result__image__overlay__play">
							<ButtonPlay size="2rem" on:click={() => play('song', song.id)} color="white" />
						</div>
						<img
							loading="eager"
							src={song.attributes?.artwork?.url?.replace('{w}x{h}', '100x100')}
							alt=""
						/>
					</div>
					<div class="search__results__result__info">
						<div>{song.attributes?.name}</div>
						<div>{song.attributes?.artistName}</div>
					</div>
					<div class="search__results__result__type">
						<span>Song</span>
					</div></a
				>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@use '../variables.scss' as *;

	.search {
		position: absolute;
		top: 0.5rem;
		left: 8.5rem;
		z-index: 99;

		input {
			width: 100%;
			max-width: 16rem;
			height: 100%;
			padding: 0.6rem 0.5rem;
			padding-left: 2.4rem;
			border-radius: $border-radius;
			border: none;
			font-size: 1rem;
			font-weight: 500;
			outline: none;
			background-color: var(--text-inverse);
			color: var(--text);
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
			border-bottom: 2px solid transparent;

			&:focus {
				border-bottom: 2px solid $accent;
			}
		}

		.search__results__result__info {
			margin-block: auto;
			margin-left: 0.2rem;
			max-width: 120px;
			overflow: hidden;

			> * {
				-webkit-line-clamp: 2;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;

				&:nth-child(2) {
					color: var(--text-light);
				}
			}
		}

		.artist-result {
			.search__results__result__image__overlay {
				border-radius: 50%;
			}
		}

		.search__results {
			background-color: var(--text-inverse);
			border-radius: $border-radius;
			overflow-y: scroll;
			max-height: 60vh;
			width: 17.5rem;
			margin-left: 0.5rem;

			&:not(.active) {
				display: none;
			}
		}

		.icon {
			position: absolute;
			top: 0.4rem;
			left: 0.5rem;
			width: 1.5rem;
			height: 1.5rem;
			fill: $accent;
			color: $accent;
		}

		.search__results__result {
			height: 65px;
			display: flex;
			flex-direction: row;
			color: var(--text);

			.search__results__result__type {
				margin-left: auto;
				margin-block: auto;
				margin-right: 0.5rem;
				color: var(--text-light);
			}

			&:hover {
				background-color: rgba(0, 0, 0, 0.1);

				.search__results__result__image__overlay__play {
					opacity: 1;
				}
			}

			.search__results__result__image__overlay__play {
				opacity: 0;
				background-color: rgba(0, 0, 0, 0.5);
				width: 100%;
				height: 100%;
			}

			&__image__overlay {
				position: relative;
				height: 50px;
				min-width: 50px;
				margin: 0.5rem;
				border-radius: $border-radius;
				overflow: hidden;

				&__play {
					position: absolute;
					padding-left: 0.55rem;
					padding-top: 0.55rem;
				}

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}

			img {
				aspect-ratio: 1;
				max-width: 50px;
				max-height: 50px;
				width: 50px;
				height: 50px;
				border-radius: $border-radius-half;

				&.search__results__result__image__artist {
					border-radius: 50%;
				}
			}
		}
	}
</style>

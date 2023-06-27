<script lang="ts">
	import type { MusicKit } from '../lib/types/musickit';
	import { search } from '../lib/api/musickit.api';
	import debounce from 'lodash/debounce';
	import ButtonPlay from './buttons/button-play.svelte';
	import { play } from '../lib/services/playback-service';

	let results: MusicKit.SearchResult<MusicKit.MediaItem> = {
		songs: {
			data: []
		},

		albums: {
			data: []
		},

		playlists: {
			data: []
		},

		artists: {
			data: []
		}
	};

	// debounce search input
	const _search = debounce(async (query: string) => {
		if (query.length > 2) {
			const response = await search(query);
			results = response.results;
		}
	}, 500);
</script>

<div class="search">
	<div class="content">
		<input type="text" placeholder="Search" on:input={(e) => _search(e.target.value)} />
		<div class="icon">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="M15.5 14h-.79l-.28-.27a6.47 6.47 0 001.48-4.18c0-3.59-2.91-6.5-6.5-6.5S2 5.96 2 9.55s2.91 6.5 6.5 6.5c1.54 0 2.95-.54 4.06-1.44l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0a4.5 4.5 0 11.01-8.99A4.5 4.5 0 019.5 14z"
				/>
			</svg>
		</div>
		{#if results?.songs?.data.length === 0 && results?.albums?.data.length === 0 && results?.playlists?.data.length === 0 && results?.artists?.data.length === 0}
			<div class="search__results">
				<div class="search__results__result">
					<div class="search__results__result__info">
						<h3>No results found</h3>
					</div>
				</div>
			</div>
		{:else}
			<div class="search__results">
				{#each results?.songs?.data as song}
					<a
						class="search__results__result"
						href={`/media/album/${song.attributes?.url?.split('/').pop().split('?')[0]}`}
					>
						<div class="search__results__result__image__overlay">
							<div class="search__results__result__image__overlay__play">
								<ButtonPlay size="2rem" on:click={() => play('song', song.id)} />
							</div>
							<img src={song.attributes?.artwork?.url?.replace('{w}x{h}', '100x100')} alt="" />
						</div>
						<div class="search__results__result__info">
							<h3>{song.attributes?.name}</h3>
							<p>{song.attributes?.artistName}</p>
						</div>
						<div class="search__results__result__type">
							<span>Song</span>
						</div></a
					>
				{/each}
				{#each results?.albums?.data as album}
					<a class="search__results__result" href={`/media/album/${album.id}`}>
						<div class="search__results__result__image__overlay">
							<div class="search__results__result__image__overlay__play">
								<ButtonPlay size="2rem" />
							</div>
							<img src={album.attributes?.artwork?.url?.replace('{w}x{h}', '100x100')} alt="" />
						</div>
						<div class="search__results__result__info">
							<h3>{album.attributes?.name}</h3>
							<p>{album.attributes?.artistName}</p>
						</div>
						<div class="search__results__result__type">
							<span>Album</span>
						</div>
					</a>
				{/each}
				{#each results?.artists?.data as artist}
					<a class="search__results__result" href={`/media/artist/${artist.id}`}>
						<div class="search__results__result__image__overlay">
							<div class="search__results__result__image__overlay__play">
								<ButtonPlay size="2rem" />
							</div>
							<img
								src={artist.attributes?.artwork?.url?.replace('{w}x{h}', '100x100')}
								alt=""
								class="search__results__result__image__artist"
							/>
						</div>
						<div class="search__results__result__info">
							<h3>{artist.attributes?.name}</h3>
						</div>
						<div class="search__results__result__type">
							<span>Artist</span>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '../variables.scss' as *;

	.search {
		position: absolute;
		top: 0.5rem;
		left: 8rem;
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
			background-color: white;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
			border-bottom: 2px solid transparent;

			&:focus {
				border-bottom: 2px solid $accent;

				& + .search__results {
					visibility: visible !important;
				}
			}
		}

		.icon {
			position: absolute;
			top: 0.4rem;
			left: 0.5rem;
			width: 1.5rem;
			height: 1.5rem;
			fill: $accent;
		}

		.search__results {
			background-color: $white;
			overflow-y: scroll;
			max-height: 60vh;
			width: 115%;
		}

		.search__results__result {
			display: flex;
		}
	}
</style>

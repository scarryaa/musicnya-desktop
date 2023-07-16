<script lang="ts">
	import ButtonFilled from '../../../../components/buttons/button-filled.svelte';
	import TableTile from '../../../../components/media/tiles/table-tile.svelte';
	import ButtonIcon from '../../../../components/buttons/button-icon.svelte';
	import { play, shuffle } from '../../../../lib/services/playback-service';
	import { addToLibrary, removeFromLibrary } from '../../../../lib/api/musickit.api';
	import { replaceUrlPlaceholders } from '../../../../utils/utils';

	import Play from 'svelte-material-icons/Play.svelte';
	import Shuffle from 'svelte-material-icons/Shuffle.svelte';
	import Download from 'svelte-material-icons/Download.svelte';
	import Check from 'svelte-material-icons/Check.svelte';
	import DotsHorizontal from 'svelte-material-icons/DotsHorizontal.svelte';
	import ClockTimeFiveOutline from 'svelte-material-icons/ClockTimeFiveOutline.svelte';
	import { setUpMediaPageMenu } from '$lib/api/context-menu.api.js';
	import { developerToken, musicUserToken } from '../../../../stores/musickit.store.js';
	import { get } from 'svelte/store';
	import { show } from '$lib/services/modal.service.js';
	import { showToast } from '../../../../components/toast.svelte';

	export let data;

	let type = data.media?.type;
	let id = data.media?.id;
	let favorited = data.media?.attributes?.userRating?.value || 0;
	let shareLink = data.media?.attributes?.url;
	$: inLibrary = data.media?.attributes?.inLibrary;

	const addToPlaylist = () => {
		console.log('add to playlist');
	};

	const _removeFromLibrary = async () => {
		await removeFromLibrary(
			data.media?.relationships?.library?.data?.[0]?.id || data.media?.id,
			getTypeWithoutPrefix(data.media?.type)
		).then(() => {
			inLibrary = false;
		});
	};

	const _addToLibrary = async () => {
		await addToLibrary(
			data.media?.relationships?.library?.data?.[0]?.id || data.media?.id,
			getTypeWithoutPrefix(data.media?.type)
		).then(() => {
			inLibrary = true;
		});
	};

	const getTypeWithoutPrefix = (type) => {
		return type?.replace('library-', '') || '';
	};

	const getUrlWithSize = (url) => {
		return replaceUrlPlaceholders(url, '300x300');
	};

	const playShuffle = (type, id) => {
		return type === 'library' ? shuffle(type, [id || '']) : play(type, [id || '']);
	};

	const dislike = async (e: MouseEvent, catalogId: string) => {
		e.preventDefault();

		// dislike
		await fetch(
			`https://amp-api.music.apple.com/v1/me/ratings/${type.replace('library-', '')}/${catalogId}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${get(developerToken)}`,
					'media-user-token': get(musicUserToken)
				},
				body: JSON.stringify({
					attributes: {
						value: -1
					}
				})
			}
		).then(() => (favorited = -1));
	};

	const unfavorite = async (e: MouseEvent, catalogId: string) => {
		e.preventDefault();

		// remove from favorites
		await fetch(
			`https://amp-api.music.apple.com/v1/me/ratings/${type.replace('library-', '')}/${catalogId}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${get(developerToken)}`,
					'media-user-token': get(musicUserToken)
				}
			}
		).then(() => (favorited = 0));
	};

	const favorite = async (e: MouseEvent, catalogId: string) => {
		e.preventDefault();

		// add to favorites
		await fetch(
			`https://amp-api.music.apple.com/v1/me/ratings/${type.replace('library-', '')}/${catalogId}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${get(developerToken)}`,
					'media-user-token': get(musicUserToken)
				},
				body: JSON.stringify({
					attributes: {
						value: 1
					},
					type: 'rating'
				})
			}
		).then(() => (favorited = 1));
	};

	const share = async (e: MouseEvent, url?: string) => {
		e.preventDefault();
		// copy to clipboard
		if (navigator.clipboard && shareLink) {
			navigator.clipboard.writeText(shareLink).then(() => {
				showToast('Copied to clipboard!');
			});
		} else {
			if (window.location.pathname.includes('library')) {
				url = await fetch(
					`https://amp-api.music.apple.com/v1/me/library/${type.replace(
						'library-',
						''
					)}/${id}/catalog`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${get(developerToken)}`,
							'media-user-token': get(musicUserToken)
						}
					}
				).then(async (res) => {
					if (res.status === 401) {
						throw new Error('Unauthorized');
					}
					const json = await res.json();
					console.log(json);
					return json['data'][0]['attributes']['url'];
				});
			}

			if (url && !window.location.pathname.includes('library')) {
				const shareUrl = url.data[0].attributes.url;
				console.log(shareUrl);
				if (navigator.clipboard && shareUrl) {
					navigator.clipboard.writeText(shareUrl).then(() => {
						showToast('Copied to clipboard!');
					});
				}
			} else {
				navigator.clipboard.writeText(url || '').then(() => {
					showToast('Copied to clipboard!');
				});
			}
		}
	};
</script>

<div class="media-wrapper" style="background: {data.media?.color?.hex || '#a0a0a0'}">
	<div class="media-info">
		<img
			loading="lazy"
			src={data.media?.attributes?.artwork?.url
				.replace('{w}x{h}', '300x300')
				.replace('{f}', 'webp') ||
				data.media?.relationships?.tracks?.data?.[0]?.attributes?.artwork?.url
					.replace('{w}x{h}', '300x300')
					.replace('{f}', 'webp') ||
				'/static/images/music_note.png'}
			alt="Media Art"
		/>
		<div class="media-info__title-desc">
			<div>
				<div class="media-title">
					<span>{data.media?.attributes?.name}</span>
				</div>
				{#if data.media?.attributes?.curatorName || data.media?.attributes?.artistName}
					<span class="media-desc">
						<a
							href={data.media?.relationships?.artists?.data?.[0]?.id
								? '/media/artist/' + data.media?.relationships?.artists?.data?.[0]?.id
								: data.media?.relationships?.curator?.data?.[0]?.id
								? '/media/apple-curator/' + data.media?.relationships?.curator?.data?.[0]?.id
								: null}
							id="artist"
							style="display:inline;
							{data.media?.relationships?.artists?.data?.[0]?.id ||
							data.media?.relationships?.curator?.data?.[0]?.id
								? 'hover: text-decoration: underline;'
								: 'text-decoration: none;'}"
							>{data.media?.attributes?.curatorName || data.media?.attributes?.artistName}</a
						>
						{#if data.media?.attributes?.releaseDate}
							<span class="dot media-desc" style="display: inline;">•</span>
							<span>{data.media?.attributes?.releaseDate?.split('-')[0]}</span>
						{/if}
					</span>
					<span class="media-desc" />
				{/if}
			</div>
			<div style="display: flex; flex-direction: row; width: inherit;">
				<div class="play-shuffle">
					<ButtonFilled
						bg=""
						width="6rem"
						height="2.5rem"
						text="Play"
						icon={Play}
						on:click={() =>
							play(data.media?.type.replace('library-', '') || '', [data.media?.id || ''])}
					/>
					<ButtonFilled
						bg=""
						width="7rem"
						height="2.5rem"
						class="shuffle-button"
						text="Shuffle"
						icon={Shuffle}
						on:click={() =>
							shuffle(data.media?.type.replace('library-', '') || '', [data.media?.id || ''])}
					/>
				</div>
				<div class="download-more-options">
					<ButtonIcon
						bg="transparent"
						width="2rem"
						height="2rem"
						icon={inLibrary ? Check : Download}
						on:click={() => (inLibrary ? _removeFromLibrary() : _addToLibrary())}
					/>
					<ButtonIcon
						bg="transparent"
						width="2rem"
						height="2rem"
						icon={DotsHorizontal}
						on:click={(e) =>
							setUpMediaPageMenu(
								e,
								id,
								type,
								unfavorite,
								favorite,
								dislike,
								share,
								addToPlaylist,
								shareLink,
								favorited,
								inLibrary
							)}
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Table -->
	<div class="media-table">
		<table>
			<thead>
				<tr>
					<th class="table-number">#</th>
					<th class="table-title">Title</th>
					{#if data.media?.type !== 'albums' && data.media?.type !== 'library-albums'}
						<th class="table-album">Album</th>
					{/if}
					<th class="table-duration" id="table-duration-header">
						<ClockTimeFiveOutline />
					</th>
				</tr>
			</thead>
			<tbody>
				<div style="height: 1rem;" />
				{#if data.media?.type === 'playlists' || (data.media?.type === 'library-playlists' && data.media?.relationships?.tracks?.data?.length > 0)}
					{#each data.media.relationships?.tracks.data as track, i}
						<TableTile
							title={track.attributes?.name}
							artist={track.attributes?.artistName}
							src={track.attributes?.artwork?.url
								.replace('{w}x{h}', '300x300')
								.replace('{f}', 'webp')}
							id={track.id}
							number={i}
							type={data.media.type}
							artistId={track.relationships?.catalog?.data?.[0]?.relationships?.artists?.data?.[0]
								?.id || track.relationships?.artists?.data?.[0]?.id}
							albumId={track.relationships?.catalog?.data?.[0]?.relationships?.albums?.data?.[0]
								?.id || track.attributes?.url.split('/').pop().split('?')[0]}
							playlistId={data.media.id}
							albumName={track.relationships?.catalog?.data?.[0]?.attributes?.albumName ||
								track.attributes?.albumName}
							durationInMillis={track.attributes?.durationInMillis}
						/>
					{/each}
				{/if}
				{#if data.media?.type === 'albums' || data.media?.type === 'library-albums'}
					{#each data.media.relationships?.tracks.data as track, i}
						<TableTile
							title={track.attributes?.name}
							artist={track.attributes?.artistName}
							src={track.attributes?.artwork?.url
								.replace('{w}x{h}', '300x300')
								.replace('{f}', 'webp')}
							id={track.id}
							number={i}
							type={data.media.type}
							artistId={data.media.relationships?.artists?.data?.[0]?.id ||
								track.relationships?.artists?.data?.[0]?.id}
							albumId={data.media.id}
							playlistId={null}
							albumName={track.attributes?.albumName || data.media.attributes?.name}
							durationInMillis={track.attributes?.durationInMillis}
						/>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>

<style lang="scss">
	@use '../../../../variables.scss' as *;

	$table-background: var(--drawer-background);
	$table-text: #000000;
	$table-text-hover: #494949;
	$table-text-active: #a0a0a0;
	$drop-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px;
	$drop-shadow-light: rgba(0, 0, 0, 0.5) 0px 0px 1px;
	$drop-shadow-text: rgba(0, 0, 0, 0.2) 0px 0px 1px;

	.media-wrapper {
		padding-left: 1rem;
		overflow: auto;
		overflow-x: hidden !important;
		padding-top: 4rem;
		height: calc(100% - 4rem);
		width: calc(100% - 1rem);
		padding-bottom: 0;
		scrollbar-gutter: stable both-edges;
		scrollbar-track-color: transparent;

		.media-info {
			width: inherit;
			display: flex;
			font-family: 'Inter';

			.media-info__title-desc {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 1.4rem;
				width: 100%;

				.media-title {
					position: relative;
					font-size: 2.4rem;
					font-weight: 600;
					margin-top: 0.2rem;
					color: $white;
					line-clamp: 2;
					overflow: hidden;
					filter: drop-shadow($drop-shadow) drop-shadow($drop-shadow);
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.media-desc {
					position: relative;
					font-size: 1.4rem;
					font-weight: 600;
					margin-top: 0.2rem;
					color: var(--text-inverse-dark);
					line-clamp: 1;
					overflow: hidden;
					filter: drop-shadow($drop-shadow-light);
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;

					#artist:hover {
						text-decoration: underline;
					}
				}
			}
		}

		.play-shuffle {
			display: flex;
			flex-direction: row;
			filter: drop-shadow($drop-shadow);
			gap: 1rem;
			align-self: flex-end;
		}

		.download-more-options {
			margin-top: 0.3rem;
			display: flex;
			flex-direction: row;
			gap: 1rem;
			filter: drop-shadow($drop-shadow);
			position: relative;
			margin-left: auto;
			opacity: 0.8;
		}

		img {
			margin-left: -0.35rem;
			max-width: 220px;
			border-radius: $border-radius-half;
			filter: drop-shadow(rgba(0, 0, 0, 0.6) 0px 0px 6px);
		}

		.media-table {
			min-height: 100%;
			height: auto;
			margin-top: 2rem;
			margin-left: -2rem;
			padding: 0.5rem;
			padding-top: 0;
			padding-inline: 1rem;
			padding-left: 1.5rem;
			background-color: $table-background;
			border-radius: $border-radius-half;
			overflow: visible;

			table {
				width: 100%;
				border-spacing: 0;

				thead {
					tr {
						th {
							text-align: left;
							padding: 1rem 1rem 0.5rem 1rem;
							font-size: 0.98rem;
							font-weight: 400;
							color: var(--text-light);
							border-bottom: 1px solid rgba(0, 0, 0, 0.2);

							&::before {
								content: '';
								display: block;
								height: 0.5rem;
							}
						}
					}
				}
			}
		}
	}
</style>

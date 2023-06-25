<script lang="ts">
	import ButtonFilled from '../../../../components/buttons/button-filled.svelte';
	import TableTile from '../../../../components/media/tiles/table-tile.svelte';
	import ButtonIcon from '../../../../components/buttons/button-icon.svelte';
	import { play, shuffle } from '../../../../lib/services/playback-service';
	import { addToLibrary, removeFromLibrary } from '../../../../lib/api/musickit.api';

	import Play from 'svelte-material-icons/Play.svelte';
	import Shuffle from 'svelte-material-icons/Shuffle.svelte';
	import DownloadCircle from 'svelte-material-icons/DownloadCircle.svelte';
	import CheckCircle from 'svelte-material-icons/CheckCircle.svelte';
	import DotsHorizontalCircle from 'svelte-material-icons/DotsHorizontalCircle.svelte';
	import ClockTimeFiveOutline from 'svelte-material-icons/ClockTimeFiveOutline.svelte';

	export let data;

	$: inLibrary = data.media?.attributes?.inLibrary;

	const _removeFromLibrary = async () => {
		await removeFromLibrary(
			data.media.relationships?.library?.data?.[0]?.id || data.media?.id,
			data.media?.type.replace('library-', '') || ''
		).then(() => {
			inLibrary = false;
		});
	};

	const _addToLibrary = async () => {
		await addToLibrary(
			data.media.relationships?.library?.data?.[0]?.id || data.media?.id,
			data.media?.type.replace('library-', '') || ''
		).then(() => {
			inLibrary = true;
		});
	};
</script>

<div class="media-wrapper" style="background: {data.media.color?.hex || '#a0a0a0'}">
	<div class="media-info">
		<img
			loading="eager"
			src={data.media?.attributes?.artwork?.url
				.replace('{w}x{h}', '300x300')
				.replace('{f}', 'webp') ||
				data.media.relationships?.tracks?.data?.[0]?.attributes?.artwork?.url
					.replace('{w}x{h}', '300x300')
					.replace('{f}', 'webp')}
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
							href="/media/artist/{data.media?.relationships?.artists?.data?.[0]?.id}"
							id="artist"
							style="display:inline"
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
						width="8rem"
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
						icon={inLibrary ? CheckCircle : DownloadCircle}
						on:click={() => (inLibrary ? _removeFromLibrary(data) : _addToLibrary(data))}
					/>
					<ButtonIcon
						bg="transparent"
						width="2rem"
						height="2rem"
						icon={DotsHorizontalCircle}
						on:click={() => console.log('more')}
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
				{#if data.media?.type === 'playlists' || data.media?.type === 'library-playlists'}
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

	$table-background: #fff;
	$table-background-hover: #f2f2f2;
	$table-background-active: #e6e6e6;
	$table-text: #000000;
	$table-text-hover: #494949;
	$table-text-active: #a0a0a0;
	$drop-shadow: rgba(0, 0, 0, 0.2) 0px 0px 3px;
	$drop-shadow-light: rgba(0, 0, 0, 0.7) 0px 0px 2px;
	$drop-shadow-text: rgba(0, 0, 0, 0.2) 0px 0px 1px;

	.media-wrapper {
		overflow: auto;
		overflow-x: hidden !important;
		padding-top: 4rem;
		padding-left: 1rem;
		height: calc(100% - 4rem);
		width: calc(100% - 1rem);
		scrollbar-gutter: stable both-edges;
		scrollbar-track-color: transparent;

		&:hover {
			overflow-y: overlay;
		}

		.media-info {
			width: inherit;
			display: flex;

			.media-info__title-desc {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 1.4rem;
				width: 100%;

				.media-title {
					position: relative;
					font-size: 2.6rem;
					font-weight: 600;
					margin-top: 0rem;
					color: $text-inverse;
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
					font-weight: 500;
					margin-top: 0.4rem;
					color: $text-inverse-dark;
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
			margin-top: 0.35rem;
			display: flex;
			flex-direction: row;
			gap: 1rem;
			filter: drop-shadow($drop-shadow);
			position: relative;
			margin-left: auto;
			opacity: 0.8;
		}

		img {
			max-width: 220px;
			border-radius: $border-radius-half;
			filter: drop-shadow(rgba(0, 0, 0, 0.8) 0px 0px 10px);
		}

		.media-table {
			min-height: 100%;
			height: auto;
			margin-top: 2rem;
			margin-left: -1rem;
			padding: 0.5rem;
			padding-top: 0;
			padding-inline: 1rem;
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
							color: $text-light;
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

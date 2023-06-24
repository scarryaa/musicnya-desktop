<script>
	import ButtonFilled from '../../../../components/buttons/button-filled.svelte';

	import Play from 'svelte-material-icons/Play.svelte';
	import Shuffle from 'svelte-material-icons/Shuffle.svelte';
	import ButtonIcon from '../../../../components/buttons/button-icon.svelte';
	import Download from 'svelte-material-icons/Download.svelte';
	import DotsHorizontal from 'svelte-material-icons/DotsHorizontal.svelte';
	import ClockTimeFiveOutline from 'svelte-material-icons/ClockTimeFiveOutline.svelte';
	import { onMount } from 'svelte';
	import { getDominantColor } from '../../../../lib/services/color-service';
	import { play } from '../../../../lib/services/playback-service';

	export let data;

	onMount(async () => {
		data.album.color = await getDominantColor(
			data.album.attributes?.artwork?.url.replace('{w}x{h}', '300x300').replace('{f}', 'webp') ||
				data.album.relationships?.tracks?.[0]?.attributes?.artwork?.url
					.replace('{w}x{h}', '300x300')
					.replace('{f}', 'webp')
		);
	});
</script>

<div class="media-wrapper" style="background: {data.album.color?.hex || '#a0a0a0'}">
	<div class="media-info">
		<img
			loading="eager"
			src={data.album.attributes?.artwork?.url
				.replace('{w}x{h}', '300x300')
				.replace('{f}', 'webp') ||
				data.album.relationships?.tracks?.[0]?.attributes?.artwork?.url
					.replace('{w}x{h}', '300x300')
					.replace('{f}', 'webp')}
			alt="Media Art"
		/>
		<div class="media-info__title-desc">
			<div>
				<div class="media-title">
					<span>{data.album.attributes?.name}</span>
				</div>
				{#if data.album.attributes?.curatorName || data.album.attributes?.artistName}
					<span class="media-desc">
						<a
							href="/media/artist/{data.album?.relationships?.artists?.data?.[0]?.id}"
							id="artist"
							style="display:inline"
							>{data.album.attributes?.curatorName || data.album.attributes?.artistName}</a
						>
						<span class="dot media-desc" style="display: inline;">•</span>
						<span>{data.album.attributes?.releaseDate?.split('-')[0]}</span>
					</span>
					<span class="media-desc" />
				{/if}
			</div>
			<div style="display: flex; flex-direction: row; width: inherit;">
				<div class="play-shuffle">
					<ButtonFilled bg="" width="6rem" height="2.5rem" text="Play" icon={Play} />
					<ButtonFilled
						bg=""
						width="8rem"
						height="2.5rem"
						class="shuffle-button"
						text="Shuffle"
						icon={Shuffle}
					/>
				</div>
				<div class="download-more-options">
					<ButtonIcon bg="" width="1rem" height="1rem" icon={Download} />
					<ButtonIcon bg="" width="1rem" height="1rem" icon={DotsHorizontal} />
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
					{#if data.album.type !== 'albums' && data.album.type !== 'library-albums'}
						<th class="table-album">Album</th>
					{/if}
					<th class="table-duration" id="table-duration-header">
						<ClockTimeFiveOutline />
					</th>
				</tr>
			</thead>
			<tbody>
				{#each data.album.relationships?.tracks?.data as track, i}
					<tr class="table-row" id="table-row" on:dblclick={() => play(track.id)}>
						<td class="table-number" id="table-number">{i + 1}</td>
						<td class="table-title" id="table-title">
							<div class="table-title__wrapper">
								{#if data.album.type !== 'albums' && data.album.type !== 'library-albums'}
									<img
										class="table-title__wrapper-img"
										src={track.attributes.artwork?.url
											.replace('{w}x{h}', '50x50')
											.replace('{f}', 'webp') ||
											track.attributes.artwork?.url
												.replace('{w}x{h}', '50x50')
												.replace('{f}', 'webp')}
										alt="Track Art"
									/>
								{/if}
								<div class="table-title__wrapper-text">
									<span class="table-title__wrapper-text-title">{track.attributes.name}</span>
									<a
										href="/media/artist/{data.album.relationships?.artists?.data?.[0]?.id}"
										class="table-title__wrapper-text-artist-wrapper"
									>
										<span class="table-title__wrapper-text-artist"
											>{track.attributes.artistName}</span
										></a
									>
								</div>
							</div>
						</td>
						{#if data.album.type !== 'albums' && data.album.type !== 'library-albums'}
							<td class="table-album" id="table-album">
								<a href="/media/album/{track.attributes.albumId}" class="table-album__link"
									><div class="table-album__text-wrapper">
										<span class="table-album__text-wrapper__text">{track.attributes.albumName}</span
										>
									</div></a
								></td
							>
						{/if}
						<td class="table-duration" id="table-duration"
							>{Math.floor(track.attributes.durationInMillis / 1000 / 60) +
								':' +
								((track.attributes.durationInMillis / 1000) % 60).toFixed(0).padStart(2, '0')}</td
						>
					</tr>
				{/each}
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
	$drop-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px;
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
					margin-top: 2rem;
					color: $text-inverse;
					line-clamp: 2;
					overflow: hidden;
					filter: drop-shadow($drop-shadow) drop-shadow($drop-shadow) drop-shadow($drop-shadow);
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
					filter: drop-shadow($drop-shadow) drop-shadow($drop-shadow) drop-shadow($drop-shadow);
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
			margin-top: 0.2rem;
			display: flex;
			flex-direction: row;
			gap: 1rem;
			filter: drop-shadow($drop-shadow);
			position: relative;
			margin-left: auto;
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
							padding: 1rem 0 0.5rem 0;
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

				tbody {
					tr {
						height: 3rem;
						margin-block: 1rem;

						td {
							padding: 0.4rem 0;
							font-size: 1rem;
							font-weight: 400;
							color: $text;

							// border radius
							&:first-child {
								border-top-left-radius: $border-radius-half;
								border-bottom-left-radius: $border-radius-half;
							}

							&:last-child {
								border-top-right-radius: $border-radius-half;
								border-bottom-right-radius: $border-radius-half;
							}
						}

						&:hover {
							background-color: $table-background-hover;
						}
					}

					&::before {
						content: '';
						display: block;
						height: 1rem;
					}
				}
			}

			.table-title__wrapper {
				display: flex;
				flex-direction: row;
				gap: 1rem;
				align-items: center;
				width: 100%;

				.table-title__wrapper-img {
					width: 40px;
					margin-right: 0.2rem;
					border-radius: $border-radius-half;
					filter: drop-shadow(rgba(0, 0, 0, 0.8) 0px 0px 2px);
				}

				.table-title__wrapper-text {
					display: flex;
					flex-direction: column;
					gap: 0.1rem;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					margin-right: 1rem;

					.table-title__wrapper-text-artist-wrapper {
						max-width: max-content;
						outline-offset: -0.2rem;
					}

					span {
						font-size: 1rem;
						font-weight: 400;
						color: $text;
						line-clamp: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						filter: drop-shadow($drop-shadow-text);
					}

					span:nth-child(2) {
						font-size: 0.95rem;
						color: $text-light;
					}

					.table-title__wrapper-text-artist {
						font-size: 0.95rem;
						color: $text-light;
						max-width: max-content;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 100%;

						&:hover {
							text-decoration: underline;
						}
					}
				}
			}

			#table-number,
			#table-album,
			#table-duration {
				filter: drop-shadow($drop-shadow-text);
				color: $text-light;

				.table-album__text-wrapper {
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}

				.table-album__text-wrapper__text {
					width: max-content;

					&:hover {
						text-decoration: underline;
					}
				}
			}

			#table-duration-header {
				text-align: end;
				font-size: 1.2rem;
			}

			.table-number {
				width: 25px;
				padding-left: 1rem;
				padding-right: 1rem;
				text-align: end;
			}

			#table-number {
				color: $text-light;
			}

			.table-title {
				padding-left: 1rem;
				max-width: 200px;
				min-width: 200px;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}

			.table-album {
				width: 40%;
			}

			#table-album {
				color: $text-light;
				width: max-content;
				min-width: 100px;
				max-width: 100px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			#table-duration {
				width: 25px;
				color: $text-light;
				text-align: end;
			}

			.table-duration {
				width: 25px;
				padding-right: 2.5rem;
			}
		}
	}
</style>

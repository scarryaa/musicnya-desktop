<script lang="ts">
	import ButtonPlay from '../../../components/buttons/button-play.svelte';
	import { play } from '../../../lib/services/playback-service';

	export let title: string;
	export let artist: string;
	export let src: string;
	export let id: string;
	export let number: number;
	export let type: string;
	export let artistId: string;
	export let albumId: string;
	export let albumName: string;
	export let durationInMillis: number;
	export let playlistId: string | null;
</script>

<tr class="table-row" id="table-row" on:dblclick={() => play('song', id)}>
	<td class="table-number" id="table-number">
		<div class="table-number__wrapper">
			<span class="table-number__wrapper-number">{number + 1}</span>
			<div class="table-number__wrapper-icons">
				<div class="table-number__wrapper-icons__play">
					<ButtonPlay
						color="var(--text)"
						size="1.8rem"
						on:click={() =>
							play(type.slice(0, -1).replace('library-', ''), playlistId || albumId, number)}
					/>
				</div>
			</div>
		</div></td
	>
	<td class="table-title" id="table-title">
		<div class="table-title__wrapper">
			{#if type !== 'albums' && type !== 'library-albums'}
				<img loading="lazy" class="table-title__wrapper-img" {src} alt="Track Art" />
			{/if}
			<div class="table-title__wrapper-text">
				<span class="table-title__wrapper-text-title">{title}</span>
				<a href="/media/artist/{artistId}" class="table-title__wrapper-text-artist-wrapper">
					<span class="table-title__wrapper-text-artist">{artist}</span></a
				>
			</div>
		</div>
	</td>
	{#if type !== 'albums' && type !== 'library-albums'}
		<td class="table-album" id="table-album">
			<a href="/media/album/{albumId}" class="table-album__link"
				><div class="table-album__text-wrapper">
					<span class="table-album__text-wrapper__text">{albumName}</span>
				</div></a
			></td
		>
	{/if}
	<td class="table-duration" id="table-duration"
		>{Math.floor(durationInMillis / 1000 / 60) +
			':' +
			((durationInMillis / 1000) % 60).toFixed(0).padStart(2, '0')}</td
	>
</tr>

<style lang="scss">
	@import './../../../variables.scss';

	$table-background: var(--drawer-background);
	$table-text: #000000;
	$table-text-hover: #494949;
	$table-text-active: #a0a0a0;
	$drop-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px;
	$drop-shadow-text: rgba(0, 0, 0, 0.2) 0px 0px 1px;

	:root[data-theme='light'] {
		--table-background-hover: #f2f2f2;
		--table-background-active: #e6e6e6;
	}

	:root[data-theme='dark'] {
		--table-background-hover: #2c2c2c;
		--table-background-active: #383838;
	}

	tr {
		height: 3rem;
		margin-block: 1rem;

		td {
			padding: 0.4rem 0;
			font-size: 1rem;
			font-weight: 400;
			color: var(--text);

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

		&:hover,
		&:focus-within {
			background-color: var(--table-background-hover);

			.table-number__wrapper-number {
				opacity: 0;
			}
		}

		.table-number__wrapper-icons {
			display: flex;
			flex-direction: row;
			gap: 0.5rem;
			align-items: center;
			justify-content: center;
			position: absolute;
			right: 0.5rem;
			top: 0.5rem;
			opacity: 0;

			.table-number__wrapper-icons__play,
			.table-number__wrapper-icons__more {
				width: 1.5rem;
				height: 1.5rem;
				cursor: pointer;
				position: absolute;
				margin-right: 1.9rem;
				margin-top: 1.9rem;
			}
		}

		&:hover .table-number__wrapper-icons,
		&:focus-within .table-number__wrapper-icons {
			opacity: 1;
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
				color: var(--text);
				line-clamp: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				filter: drop-shadow($drop-shadow-text);
			}

			span:nth-child(2) {
				font-size: 0.95rem;
				color: var(--text-light);
			}

			.table-title__wrapper-text-artist {
				font-size: 0.95rem;
				display: block;
				color: var(--text-light);
				max-width: max-content;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
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
		color: var(--text-light);

		.table-album__text-wrapper {
			padding-right: 2rem;
			padding-left: 1rem;
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
		padding-right: 1rem;
		text-align: end;
	}

	#table-number {
		color: var(--text-light);
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
		max-width: 200px;
	}

	#table-album {
		color: var(--text-light);
		width: max-content;
		min-width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	#table-duration {
		width: 25px;
		color: var(--text-light);
		text-align: end;
	}

	.table-duration {
		width: 25px;
		padding-right: 2.5rem;
	}
</style>

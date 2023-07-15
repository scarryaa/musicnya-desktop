<script lang="ts">
	import AlbumTile from './album-tile.svelte';

	export let id: string;
	export let artistId: string;
	export let src: string;
	export let title: string;
	export let artist: string;
	export let year: string;
	export let type: string;
	export let subtitle: 'artist' | 'year' = 'artist';
	export let badge: string;
	export let shareLink: string;
</script>

<div class="glass-tile">
	{#if badge}
		<div class="badge">{badge}</div>
	{/if}
	<AlbumTile {id} {artistId} {src} {title} {artist} {year} {type} {subtitle} {shareLink} />
	<div class="glass-info" style="background-image: url({src})">
		<div class="glass-info__inner">
			<a
				class="glass-title"
				href={type === 'stations' ? null : `/media/${type.slice(0, -1)}/${id}`}
			>
				{title}
			</a>
			{#if artist}
				<a
					class="glass-artist"
					href={artistId ? '/media/artist/' + artistId : null}
					style={!artistId ? 'text-decoration: none; cursor: default;' : ''}>{artist}</a
				>
			{:else if year}
				<span class="glass-year">{year}</span>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	$drop-shadow: 0 0 8px rgba(0, 0, 0, 0.2);

	.glass-tile {
		max-width: 12rem;
		border-radius: $border-radius-half;
		display: flex;
		flex-direction: column;

		.badge {
			display: -webkit-box;
			line-clamp: 1;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
			color: var(--text-light);
			padding: 0.2rem;
			font-weight: 600;
			border-radius: $border-radius-half;
		}

		.glass-info {
			overflow: hidden;
			display: flex;
			flex-direction: column;
			width: 100%;
			min-height: 4rem;
			background-position: bottom;
			background-repeat: no-repeat;
			color: $white;
			border-bottom-left-radius: $border-radius;
			border-bottom-right-radius: $border-radius;

			.glass-title {
				font-size: 0.8rem;
				width: 100% !important;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				text-align: center;

				&:hover {
					text-decoration: underline;
				}
			}

			.glass-artist {
				font-size: 0.7rem;
				width: 100%;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				display: list-item;
				text-align: center;

				&:hover {
					text-decoration: underline;
				}
			}
		}

		.glass-info__inner {
			border-bottom-left-radius: $border-radius;
			border-bottom-right-radius: $border-radius;
			outline: 4px solid black;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;
			padding-block: 0.5rem;
			padding-inline: 0.5rem;
			backdrop-filter: blur(50px) saturate(180%) brightness(50%);
		}

		:global(.album-tile img) {
			border-bottom-left-radius: 0 !important;
			border-bottom-right-radius: 0 !important;
		}

		:global(.album-tile .album-overlay-container) {
			border-top-left-radius: $border-radius-half;
			border-top-right-radius: $border-radius-half;
			border-bottom-left-radius: 0 !important;
			border-bottom-right-radius: 0 !important;
		}

		:global(.album-info) {
			display: none !important;
		}
	}
</style>

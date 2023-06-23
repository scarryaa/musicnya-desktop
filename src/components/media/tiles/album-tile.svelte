<script lang="ts">
	export let id: string;
	export let artistId: string;
	export let src: string;
	export let href: string;
	export let title: string;
	export let artist: string;
	export let year: string;
	export let subtitle: 'artist' | 'year' = 'artist';
</script>

<div class="album-tile">
	<img {src} alt="" />
	<div class="album-info">
		<a href="/media/album/{id}" class="album-title">{title}</a>
		{#if subtitle === 'artist'}
			<a href="/media/artist/{artistId}" class="album-artist">{artist}</a>
		{:else if subtitle === 'year'}
			<div class="album-year">{year}</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.album-tile {
		margin-top: 1rem;
		align-items: center;
		border-radius: $border-radius-half;

		img {
			border-radius: $border-radius-half;
			filter: drop-shadow($drop-shadow);
			min-width: 10rem;
			max-width: 10rem;
		}

		.album-info {
			display: flex;
			flex-direction: column;
			margin-top: 0.5rem;

			.album-title {
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				&:hover {
					text-decoration: underline;
				}
			}

			.album-artist,
			.album-year {
				align-self: flex-start;
				font-size: 1rem;
				font-weight: 400;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: $text-light;
			}

			.album-artist {
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>

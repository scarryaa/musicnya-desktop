<script lang="ts">
	import ButtonPlay from '../../../components/buttons/button-play.svelte';

	export let src: string;
	export let title: string;
	export let id: string;
	export let href: string;
</script>

<div class="artist-tile">
	<div class="artist-tile__overlay-wrapper">
		<a class="artist-tile__overlay-wrapper__overlay" {href}>
			<ButtonPlay color="white" size="3rem" />
		</a>
		<img {src} alt="Album Art" loading="lazy" />
	</div>
	<div class="artist-info">
		<div class="artist-title">{title}</div>
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.artist-tile {
		display: flex;
		flex-direction: column;
		max-width: 8.5rem;
		overflow: hidden;

		img {
			aspect-ratio: 1;
			border-radius: 50%;
			max-height: 8.5rem;
			max-width: 8.5rem;
			min-width: 8.5rem;
			min-height: 8.5rem;
		}

		.artist-tile__overlay-wrapper {
			position: relative;
			width: 100%;
			height: 100%;
			aspect-ratio: 1;

			&:hover .artist-tile__overlay-wrapper__overlay {
				opacity: 1;
			}

			&:hover .artist-tile__overlay-wrapper__overlay,
			&:focus-visible .artist-tile__overlay-wrapper__overlay,
			&:focus-within .artist-tile__overlay-wrapper__overlay {
				background-color: rgba(0, 0, 0, 0.4);
				opacity: 1;
			}

			.artist-tile__overlay-wrapper__overlay {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				width: 100%;
				height: 100%;
				max-height: 8.5rem;
				max-width: 8.5rem;
				min-width: 8.5rem;
				min-height: 8.5rem;
				border-radius: 50%;
				transition: all 0.2s ease-in-out;
				opacity: 0;
			}
		}
		.artist-info {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
			text-align: center;
			max-width: 100%;
			overflow: hidden;
		}
	}
</style>

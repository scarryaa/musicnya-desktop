<script lang="ts">
	import { play } from '../../../lib/services/playback-service';
	import ButtonPlay from '../../../components/buttons/button-play.svelte';

	export let src: string;
	export let badge: string;
	export let showBadge = false;
	export let title: string;
	export let type: string;
	export let id: string;
	export let href: string;
</script>

<div class="superhero-tile">
	<div class="superhero-tile__content">
		{#if showBadge}
			<div class="superhero-tile__content__badge">
				<span>{badge}</span>
			</div>
		{/if}
		<div class="superhero-tile__content__title">
			<h2>{title}</h2>
		</div>
	</div>
	<div class="superhero-tile__overlay-wrapper">
		<a class="superhero-tile__overlay" {href}>
			<div class="superhero-tile__overlay__icon">
				<ButtonPlay color="white" size="4rem" on:click={() => play(type, [id])} />
			</div>
		</a>
		<div class="superhero-tile__image">
			<img alt="Album Artwork" {src} />
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.superhero-tile {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition: background-color 0.2s ease-in-out 0.1s, opacity 0.2s ease-in-out;
		color: var(--text);
		max-width: 64rem;

		&:focus-visible .superhero-tile__overlay,
		&:focus-within .superhero-tile__overlay {
			opacity: 1;
		}

		&__content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-bottom: 1rem;
			height: 100%;
		}

		&__content__badge {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 3rem;
			height: 3rem;
			border-radius: 50%;
			background-color: var(--primary);
			color: var(--white);
			font-size: 1.2rem;
			font-weight: bold;
			margin-bottom: 1rem;
		}

		&__content__title {
			font-size: 1.2rem;
			font-weight: bold;
			margin-bottom: 0.5rem;

			> h2 {
				margin: 0;
				padding: 0;
			}
		}

		&__overlay-wrapper {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			transition: opacity 0.2s ease-in-out;
		}

		&__overlay {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			opacity: 0;
			transition: opacity 0.2s ease-in-out;
			background-color: rgba(0, 0, 0, 0.5);
		}

		&__overlay__icon {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 4rem;
			height: 4rem;
			border-radius: 50%;
			background-color: var;
		}

		&__image {
			border-radius: $border-radius;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			overflow: hidden;
			aspect-ratio: 2;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&:hover .superhero-tile__overlay,
		&:hover .superhero-tile__overlay-wrapper {
			border-radius: $border-radius;
			opacity: 1;
		}

		&:focus-visible .superhero-tile__overlay,
		&:focus-within .superhero-tile__overlay {
			opacity: 1;
		}
	}
</style>

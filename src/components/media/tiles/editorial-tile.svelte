<script lang="ts">
	import { play } from '../../../lib/services/playback-service';
	import ButtonPlay from '../../../components/buttons/button-play.svelte';
	import LinkVariant from 'svelte-material-icons/LinkVariant.svelte';

	export let src: string;
	export let badge: string;
	export let showBadge = false;
	export let showPlayButton = true;
	export let title: string;
	export let subtitle: string;
	export let type: string;
	export let id: string;
	export let href: string;
</script>

<div class="editorial-tile">
	<div class="editorial-tile__content">
		{#if showBadge}
			<div class="editorial-tile__content__badge">
				<span>{badge}</span>
			</div>
		{/if}
		<div class="editorial-tile__content__title">
			<div>{title}</div>
		</div>
		{#if subtitle}
			<div class="editorial-tile__content__subtitle">
				<div>{subtitle}</div>
			</div>
		{/if}
	</div>
	<div class="editorial-tile__overlay-wrapper">
		<a class="editorial-tile__overlay" href={type !== 'stations' ? href : undefined}>
			{#if showPlayButton}
				<div class="editorial-tile__overlay__icon">
					<ButtonPlay color="white" size="4rem" on:click={() => play(type, [id])} />
				</div>
			{:else}
				<div class="editorial-tile__overlay__icon">
					<LinkVariant size="2.5rem" />
				</div>
			{/if}
		</a>
		<div class="editorial-tile__image">
			<img alt="Album Artwork" {src} />
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.editorial-tile {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition: background-color 0.2s ease-in-out 0.1s, opacity 0.2s ease-in-out;
		color: var(--text);

		&:focus-visible .editorial-tile__overlay,
		&:focus-within .editorial-tile__overlay {
			opacity: 1;
		}

		&:hover .editorial-tile__overlay {
			opacity: 1;
		}
	}

	.editorial-tile__overlay-wrapper {
		position: relative;
		width: 100%;
	}

	.editorial-tile__overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		max-height: 14rem;
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: $border-radius;
	}

	.editorial-tile__overlay__icon {
		transition: opacity 0.2s ease-in-out;
	}

	.editorial-tile__image {
		width: 24rem;
		height: 16rem;
		max-height: 12rem;
		max-width: 24rem;
		overflow: visible;
		padding-bottom: 0.05rem;

		img {
			border-radius: $border-radius;
			width: 100%;
			height: 100%;
			image-rendering: optimizespeed;
			object-fit: cover;
			box-shadow: $drop-shadow;
		}
	}

	.editorial-tile__content {
		padding-block: 1rem;
	}

	.editorial-tile__content__badge {
		margin-bottom: 0.5rem;
	}

	.editorial-tile__content__badge span {
		background-color: $accent;
		color: $white;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
	}

	.editorial-tile__content__title {
		margin-bottom: 0.25rem;
	}

	.editorial-tile__content__subtitle {
		color: gray;
	}
</style>

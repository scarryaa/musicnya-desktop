<script lang="ts">
	import LinkVariant from 'svelte-material-icons/LinkVariant.svelte';

	export let type: string;
	export let id: string;
	export let src: string;
	export let title: string;
</script>

<div class="curator-tile">
	<div class="curator-tile__overlay-wrapper">
		<a class="curator-tile__overlay" href={'media/' + type.slice(0, -1) + '/' + id}>
			<LinkVariant size="2.5rem" />
		</a>
		<div class="curator-tile__image">
			<img alt="Album Artwork" {src} />
		</div>
	</div>
	<div class="curator-tile__content">
		<div class="curator-tile__content__title">
			{title}
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../variables.scss' as *;

	.curator-tile {
		display: flex;
		flex-direction: column;
		transition: background-color 0.2s ease-in-out 0.1s, opacity 0.2s ease-in-out;
		color: var(--text);

		&:focus-visible .curator-tile__overlay,
		&:focus-within .curator-tile__overlay {
			opacity: 1;
		}

		&:hover .curator-tile__overlay {
			opacity: 1;
		}

		&__overlay-wrapper {
			position: relative;
			width: 100%;
			max-height: 12rem;
			overflow: hidden;
			transition: opacity 0.2s ease-in-out;
		}

		&__overlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			text-decoration: none;
			opacity: 0;
			transition: opacity 0.2s ease-in-out;
			background-color: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&__image {
			width: 100%;
			height: 100%;
			overflow: hidden;
			transition: opacity 0.2s ease-in-out;
			background-color: var(--background);

			img {
				border-radius: $border-radius-half;
				max-width: 12rem;
				max-height: 12rem;
				object-fit: cover;
			}
		}

		&__content {
			transition: opacity 0.2s ease-in-out;
			width: 12rem;
			display: block;
			margin-top: 0.5rem;

			&__title {
				width: 12rem;
				overflow: hidden;
				text-overflow: ellipsis;
				color: var(--text);
				display: block;
			}
		}
	}
</style>

<script lang="ts">
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';

	export let href: string;
	export let label: string;
	export let target: string;
</script>

<a class="link-tile" {href} {target}>
	<div class="link-tile__content">{label}</div>
	<ChevronRight size="2rem" />
</a>

<style lang="scss">
	@use '../../../variables.scss' as *;

	:root[data-theme='dark'] {
		--tile-background: #0f0f0f;
		--tile-background-hover: #161616;
	}

	:root[data-theme='light'] {
		--tile-background: #cfcfcf;
		--tile-background-hover: #e0e0e0;
	}

	.link-tile {
		-webkit-user-drag: none;
		display: flex;
		background-color: var(--tile-background);
		color: $accent;
		cursor: default;
		height: 3.5rem;
		width: 16rem;
		align-items: center;
		border-radius: $border-radius;
		transition: background-color 0.2s ease-in-out;
		padding-right: 0.2rem;

		&:hover {
			background-color: var(--tile-background-hover);
		}

		&__content {
			margin-left: 1rem;
			color: $accent !important;
			margin-right: auto;
		}
	}
</style>

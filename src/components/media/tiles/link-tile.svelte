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
		--background: #131313;
		--background-hover: #1a1a1a;
	}

	:root[data-theme='light'] {
		--background: #cfcfcf;
		--background-hover: #e0e0e0;
	}

	.link-tile {
		-webkit-user-drag: none;
		display: flex;
		background-color: var(--background);
		color: $accent;
		cursor: default;
		height: 3.5rem;
		width: 16rem;
		align-items: center;
		border-radius: $border-radius;
		transition: background-color 0.2s ease-in-out;

		&:hover {
			background-color: var(--background-hover);
		}

		&__content {
			margin-left: 1rem;
			color: $accent !important;
			margin-right: 0.2rem;
		}
	}
</style>

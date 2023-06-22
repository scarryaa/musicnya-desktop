<script>
	import { goBack, goForward } from '../routing/router.svelte';

	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
</script>

<div class="nav-buttons">
	<button
		class="left"
		tabindex="0"
		on:click={goBack}
		on:keydown={(key) => (key.key === 'Enter' || key.key === 'Space') && goBack()}
	>
		<ChevronLeft />
	</button>
	<button
		class="right"
		tabindex="0"
		on:click={goForward}
		on:keydown={(key) => (key.key === 'Enter' || key.key === 'Space') && goForward()}
	>
		<ChevronRight />
	</button>
</div>

<style lang="scss">
	@use '../../variables.scss' as *;

	$navigation-chip-background: #474747d5;
	$navigation-chip-background-hover: #616161d5;
	$navigation-chip-background-active: #a0a0a0d5;

	.nav-buttons {
		z-index: 99;
		display: flex;
		position: fixed;
		flex-direction: row;
		gap: 0.5rem;
		margin-top: 0.5rem;
		margin-left: 1rem;
	}

	.left,
	.right {
		width: 2.25rem;
		height: 2.25rem;
		display: block;
		flex-direction: row;
		border-radius: 50%;
		top: 0;
		left: 0;
		background-color: $navigation-chip-background;
		color: $text-inverse;
		font-size: 2rem;
		outline-offset: 1px;

		&:hover {
			background-color: $navigation-chip-background-hover;
		}

		&:focus-visible {
			background-color: $navigation-chip-background-hover;
		}

		&:active {
			background-color: $navigation-chip-background-active;
		}
	}

	.left {
		:global(:is(svg)) {
			margin-right: 0.15rem;
			margin-top: 0.1rem;
		}
	}

	.right {
		:global(:is(svg)) {
			margin-left: 0.15rem;
			margin-top: 0.1rem;
		}
	}
</style>

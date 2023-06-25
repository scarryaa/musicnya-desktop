<script lang="ts">
	export let icon: ConstructorOfATypedSvelteComponent;
	export let text: string;
	export let bg: string;
	export let width: string;
	export let height: String;
</script>

<button
	on:click
	class="button-filled {$$restProps.class ?? ''}"
	style="background-color: {bg}; width: {width}; height: {height}"
>
	<div class="button-filled__icon-text">
		<svelte:component this={icon} />
		<span class="text">{text}</span>
	</div>
</button>

<style lang="scss">
	@use '../../variables.scss' as *;

	$default-color: #fff;
	$drop-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	.button-filled {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: $border-radius-half;
		padding-inline: 3.5rem;
		padding-block: 1.4rem;
		background-color: $default-color;

		&:hover {
			filter: brightness(1.1);
		}

		&:focus-visible {
			filter: brightness(1.1);
		}

		&:active {
			filter: brightness(0.9);
		}

		> .button-filled__icon-text {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			font-size: 1.6rem;
			font-weight: 500;
			color: $text;

			:global(.text) {
				margin-left: 0.8rem;
				font-size: 1.2rem;
				display: var(--shown);
				align-self: center;
				margin-top: 0.1rem;
				padding-right: 0.1rem;
			}
		}
	}
</style>

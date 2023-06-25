<script lang="ts">
	export let icon: ConstructorOfATypedSvelteComponent;
	export let bg: string;
	export let width: string;
	export let height: string;
	export let size: string = '2rem';
	export let fill = '#fff';
</script>

<button
	class="button-icon"
	on:click
	style="background-color: {bg}; width: {width}; height: {height}; color: {fill}"
>
	<div class="button-icon__icon" style="font-size: {size};">
		<svelte:component this={icon} />
	</div>
</button>

<style lang="scss">
	@use '../../variables.scss' as *;

	$default-color: #fff;
	$drop-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

	.button-icon {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: $border-radius-half;
		padding-inline: 1rem;
		color: $text;
		padding-block: 1rem;
		background-color: $default-color;
		border-radius: 50%;

		&:hover {
			filter: brightness(1.1);
		}

		&:focus-visible {
			filter: brightness(1.1);
		}

		&:active {
			filter: brightness(0.9);
		}

		> .button-icon__icon {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			font-size: 1.2rem;
			font-weight: 500;
			background-blend-mode: color;
		}
	}
</style>

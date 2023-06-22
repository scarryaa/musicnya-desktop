<script>
	export let icon, bg, width, height;
</script>

<button class="button-icon" style="background-color: {bg}; width: {width}; height: {height}">
	<div class="button-icon__icon">
		<svelte:component this={icon} />
	</div>
</button>

<style lang="scss">
	@use '../../variables.scss' as *;

	$default-color: #cfcbcb;
	$drop-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	.button-icon {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: $border-radius-half;
		padding-inline: 1rem;
		color: $default-color;
		padding-block: 1rem;

		&:hover {
			color: $text-light;
		}

		&:focus-visible {
			color: $text-light;
		}

		&:active {
			color: $text-very-light;
		}

		> .button-icon__icon {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			font-size: 1.6rem;
			font-weight: 500;
		}
	}
</style>

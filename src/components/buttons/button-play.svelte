<script lang="ts">
	export let size: string = '3rem';
	export let color: string;
	export let background = false;
</script>

<button
	class="button-play"
	on:click
	style="width: {size}; height: {size}; background-color: {background ? 'auto' : 'transparent'}"
>
	<div class="button-play__icon" style="width: {size}; height: {size};" title="Play">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M8 5v14l11-7z" fill={color} rx="4" ry="4" />
		</svg>
	</div>
</button>

<style lang="scss">
	@import '../../variables';

	.button-play {
		filter: drop-shadow($drop-shadow);
		background-color: var(--color-primary);
		display: flex;
		border-radius: 50%;
		justify-content: center;
		align-items: center;
		transition: background-color 0.2s ease-in-out;
		background-color: $accent;

		&:hover {
			transform: scale(1.1);
		}

		&:focus-visible {
			transform: scale(1.2);
			background-blend-mode: color;
		}

		&:active {
			transform: scale(0.99);
		}
	}
</style>

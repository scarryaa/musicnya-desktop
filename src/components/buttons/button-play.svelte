<script lang="ts">
	export let size: string = '3rem';
	export let color: string;
</script>

<button class="button-play" on:click style="width: {size}; height: {size};">
	<div class="button-play__icon" style="width: {size}; height: {size};">
		<svg viewBox="0 0 24 24">
			<path d="M8 5v14l11-7z" fill={color} />
		</svg>
	</div>
</button>

<style lang="scss">
	@import '../../variables';

	.button-play {
		background-color: var(--color-primary);
		display: flex;
		justify-content: center;
		align-items: center;
		transition: background-color 0.2s ease-in-out;

		&:hover {
			transform: scale(1.1);
		}

		&:focus-visible {
			border: 2px solid $white;
			transform: scale(1.2);
		}

		&:active {
			transform: scale(0.99);
		}
	}
</style>

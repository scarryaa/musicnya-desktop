<button class="button-play" on:click>
	<div class="button-play__icon">
		<svg viewBox="0 0 24 24">
			<path d="M8 5v14l11-7z" fill="white" />
		</svg>
	</div>
</button>

<style lang="scss">
	@import '../../variables';

	.button-play {
		width: 3rem;
		height: 3rem;
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

		&__icon {
			width: 3rem;
			fill: $white;
			filter: drop-shadow(0 0 0.2rem rgba(0, 0, 0, 0.5));
		}
	}
</style>

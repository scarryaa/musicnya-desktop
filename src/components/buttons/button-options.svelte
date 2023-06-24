<button class="button-options" on:click>
	<div class="button-options__icon">
		<svg viewBox="0 0 24 24">
			<path
				d="M12 5.5A2.5 2.5 0 119.5 8 2.5 2.5 0 0112 5.5m0 13A2.5 2.5 0 119.5 21 2.5 2.5 0 0112 18.5m0-6.5A2.5 2.5 0 119.5 15 2.5 2.5 0 0112 12.5"
			/>
		</svg>
	</div>
</button>

<style lang="scss">
	@import '../../variables';

	.button-options {
		position: absolute;
		bottom: 0.2rem;
		right: 0.2rem;
		width: 1.5rem;
		height: 2rem;
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

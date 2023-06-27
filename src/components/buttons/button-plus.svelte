<button class="button-plus" on:click>
	<div class="button-plus__icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path d="M0 0h24v24H0z" fill="none" />
			<path
				d="M12 5v14M5 12h14"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke="white"
			/>
		</svg>
	</div>
</button>

<style lang="scss">
	@import '../../variables';

	.button-plus {
		position: absolute;
		top: 0.2rem;
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

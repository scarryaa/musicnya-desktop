<button class="button-minus" on:click>
	<div class="button-minus__icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path d="M0 9h24v6H0z" fill="none" />
			<path d="M19 13H5v-2h14v2z" />
		</svg>
	</div>
</button>

<style lang="scss">
	@import '../../variables';

	.button-minus {
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

<button class="button-favorite" on:click>
	<div class="button-favorite__icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<polygon
				points="12,2 15.46,8.64 22,9.36 17,14.64 18.18,21 12,17.27 5.82,21 7,14.64 2,9.36 8.54,8.64"
				fill="none"
				stroke="white"
				stroke-width="2"
			/>
			<polygon
				points="12,2 15.46,8.64 22,9.36 17,14.64 18.18,21 12,17.27 5.82,21 7,14.64 2,9.36 8.54,8.64"
				fill="transparent"
			/>
		</svg>
	</div>
</button>

<style lang="scss">
	@import '../../variables';

	.button-favorite {
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

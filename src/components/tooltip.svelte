<script lang="ts">
	// props
	export let text: string = 'Tooltip';
	export let position: 'left' | 'right' | 'top' | 'bottom';
</script>

<div class="tooltip-wrapper">
	<div class="tooltip-wrapper__tooltip tooltip--{position}">
		<div class="tooltip__content">
			<div class="tooltip__content__text">
				{text}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../variables.scss';

	.tooltip-wrapper {
		position: relative;

		&__tooltip {
			position: absolute;
			z-index: 1000;
			top: -4rem;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			width: calc(100% + 4rem);
			left: -2rem;
			height: 100%;
			pointer-events: none;

			.tooltip__content {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0.5rem;
				border-radius: $border-radius;
				background-color: rgba(0, 0, 0, 0.8);
				pointer-events: all;

				.tooltip__content__text {
					color: white;
					font-size: 0.8rem !important;
					font-weight: 500;
				}
			}
		}

		.tooltip--left {
			transform: translateX(-100%);
		}

		.tooltip--right {
			transform: translateX(100%);
		}

		.tooltip--top {
			transform: translateY(-200%);
		}

		.tooltip--bottom {
			transform: translateY(100%);
		}
	}
</style>

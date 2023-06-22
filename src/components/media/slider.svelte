<div class="slider">
	<input type="range" min="0" max="100" value="0" class="input" />
</div>

<style lang="scss">
	@use '../../variables.scss' as *;

	$slider-background: #313131;

	.slider {
		input {
			-webkit-appearance: none;
			appearance: none;
			width: 100%;
			height: 5px;
			border-radius: $border-radius;
			background: $slider-background;

			&::-webkit-slider-thumb {
				-webkit-appearance: none;
				appearance: none;
				width: 12px;
				height: 12px;
				border-radius: 50%;
				background: $accent;
				filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.5));
			}

			&:focus-visible {
				outline: 2px solid $text;
				outline-offset: 2px;
			}
		}
	}
</style>

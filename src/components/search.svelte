<div class="search">
	<div class="content">
		<input type="text" placeholder="Search" />
	</div>
</div>

<style lang="scss">
	@use '../variables.scss' as *;

	.search {
		position: absolute;
		top: 0.5rem;
		left: 8rem;
		z-index: 99;

		input {
			width: 100%;
			height: 100%;
			padding: 0.6rem 0.5rem;
			border-radius: $border-radius;
			border: none;
			font-size: 1rem;
			font-weight: 500;
			outline: none;
			background-color: white;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);

			&:focus {
				border-bottom: 2px solid $accent;
			}
		}
	}
</style>

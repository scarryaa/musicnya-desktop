<div class="footer">
	<div class="content">
		<slot />
	</div>
</div>

<style lang="scss">
	@use '../variables.scss' as *;

	.footer {
		position: absolute;
		width: $footer-width;
		height: $footer-height;
		bottom: 0;
		background-color: $footer-background;

		.content {
			display: flex;
			flex-direction: row;
		}
	}
</style>

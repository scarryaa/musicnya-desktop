<div class="divider" />

<style lang="scss">
	@use '../variables.scss' as *;

	.divider {
		position: absolute;
		left: 0;
		pointer-events: none;
		height: 0rem;
		border-top: 1px solid rgba(0, 0, 0, 0.25);
		z-index: 100;
		width: 100%;
		top: 8rem;
		-webkit-filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))
			drop-shadow(0px 1px 2px rgba(0, 0, 0, 1)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))
			drop-shadow(0px 3px 2px rgba(0, 0, 0, 1)) drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.5));

		filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5))
			drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5))
			drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.5))
			drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25));
	}
</style>

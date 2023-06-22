<div class="titlebar">
	<slot />
</div>

<style lang="scss">
	@use '../../variables.scss' as *;

	$titlebar-height: 20px;
	$titlebar-background: #e9e9e9;

	.titlebar {
		position: relative;
		width: 100vw;
		height: $titlebar-height;
		background-color: $titlebar-background;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
		-webkit-app-region: drag;
	}
</style>

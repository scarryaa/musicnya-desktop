<div class="titlebar">
	<slot />
</div>

<style lang="scss">
	@use '../../variables.scss' as *;

	$titlebar-height: 20px;
	$titlebar-background: var(--app-background);

	.titlebar {
		position: relative;
		width: 100vw;
		height: $titlebar-height;
		background-color: var(--app-background);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
		-webkit-app-region: drag;
	}
</style>

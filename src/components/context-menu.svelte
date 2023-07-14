<script lang="ts">
	let menu;

	export let x;
	export let y;

	const close = () => {
		menu.$destroy();
	};

	const create = () => {
		menu = new this({
			target: document.body,
			props: {
				x,
				y
			},
			intro: true
		});
	};
</script>

<div class="context-menu" bind:this={menu} style="top: {y}px; left: {x}px;">
	<div>e</div>
</div>

<style lang="scss">
	@use '../variables.scss' as *;

	.context-menu {
		position: fixed;
		background-color: var(--background);
		color: var(--text);
		border-radius: 0.5rem;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
		padding: 0.5rem;
		z-index: 99;
		-webkit-app-region: no-drag;
	}
</style>

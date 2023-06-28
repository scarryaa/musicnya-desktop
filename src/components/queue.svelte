<script>
	import DrawerButton from './drawer/drawer-button.svelte';

	import AllInclusive from 'svelte-material-icons/AllInclusive.svelte';
</script>

<div class="queue">
	<div>Queue</div>
	<DrawerButton title="Autoplay">
		<svelte:component this={AllInclusive} />
	</DrawerButton>
</div>

<style lang="scss">
	.queue {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 50%;
	}
</style>

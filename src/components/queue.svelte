<script lang="ts">
	import DrawerButton from './drawer/drawer-button.svelte';
	import AllInclusive from 'svelte-material-icons/AllInclusive.svelte';
	import type { MusicKit } from '../lib/types/musickit';

	console.log(MusicKit.getInstance().queue.items);
</script>

<div class="queue">
	<h2>Queue</h2>
	<DrawerButton title="Autoplay">
		<svelte:component this={AllInclusive} />
	</DrawerButton>
	<div class="content" />
</div>

<style lang="scss">
	.queue {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 75%;

		h2 {
			font-size: 1.5rem;
			font-weight: 500;
			padding-left: 0;
			margin: 0;
		}
	}
</style>

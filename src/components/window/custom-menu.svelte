<script>
	//https://svelte.dev/repl/16c8a02ebaa9425a9cbbfd66feea1a9e?version=3.29.0

	import Menu from './menu.svelte';
	import MenuOption from './menu-option.svelte';
	import MenuDivider from './menu-divider.svelte';
	import { tick } from 'svelte';

	let pos = { x: 0, y: 0 };
	let showMenu = false;

	async function onRightClick(e) {
		if (showMenu) {
			showMenu = false;
			await new Promise((res) => setTimeout(res, 100));
		}

		pos = { x: e.clientX, y: e.clientY };
		showMenu = true;
		console.log('pos:', pos);
	}

	function closeMenu() {
		showMenu = false;
	}
</script>

{#if showMenu}
	<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
		<MenuOption on:click={console.log} text="Do nothing" />
		<MenuOption on:click={console.log} text="Do nothing, but twice" />
		<MenuDivider />
		<MenuOption isDisabled={true} on:click={console.log} text="Whoops, disabled!" />
		<MenuOption on:click={console.log}>
			<span>Look! An icon!</span>
		</MenuOption>
	</Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />

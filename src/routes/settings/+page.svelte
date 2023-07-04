<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		document.querySelector('#dark-mode-toggle')?.addEventListener('change', (e) => {
			if (e.target?.checked) {
				document.documentElement.dataset.theme = 'dark';
				localStorage.setItem('theme', 'dark');
			} else {
				document.documentElement.dataset.theme = 'light';
				localStorage.setItem('theme', 'light');
			}
		});

		if (localStorage.getItem('theme') === 'dark') {
			document.documentElement.dataset.theme = 'dark';
			document.querySelector('#dark-mode-toggle')?.setAttribute('checked', 'true');
		}
	});
</script>

<div class="page-wrapper">
	<h1>Settings</h1>
	<div class="theme-section">
		<h2>Dark Mode</h2>
		<input type="checkbox" id="dark-mode-toggle" />
	</div>
</div>

<style lang="scss">
	.page-wrapper {
		max-width: 900px;

		.theme-section {
			display: flex;
			align-content: center;
			justify-content: space-between;

			> :last-child {
				margin-right: 1rem;
			}
		}
	}
</style>

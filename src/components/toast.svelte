<script lang="ts" context="module">
	import Check from 'svelte-material-icons/Check.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import { writable } from 'svelte/store';

	export const toast = writable({ message: '', show: false });

	export function showToast(message: string) {
		toast.set({ message, show: true });
		setTimeout(() => {
			toast.set({ message: '', show: false });
		}, 3000);
	}

	export function close() {
		toast.set({ message: '', show: false });
	}
</script>

<div class="toast" style="display: {$toast.show ? 'flex' : 'none'}">
	<div class="toast__text">
		{$toast.message}
	</div>
	<div class="toast__close" on:click={close}>
		<Close />
	</div>
</div>

<style lang="scss">
	.toast {
		position: fixed;
		bottom: 6rem;
		right: 1rem;
		background-color: var(--toast-background);
		border-radius: 0.5rem;
		padding: 1rem;
		padding-top: 1rem !important;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
		display: none;
		transition: opacity 0.3s ease-in-out;
		z-index: 1000;

		&__text {
			font-size: 1.2rem;
			color: var(--toast-text);
		}

		&__close {
			border-radius: 4px;
			margin-left: 1rem;

			&:hover {
				background-color: rgba(0, 0, 0, 0.1);
			}
		}
	}

	.toast--show {
		display: flex;
	}
</style>

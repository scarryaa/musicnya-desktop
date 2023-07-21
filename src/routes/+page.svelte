<script lang="ts">
	import { onMount } from 'svelte';
	import { toasts } from '../stores/toasts.store';

	onMount(() => {
		const report_error = (msg: string = 'unknown error') => {
			$toasts.push({
				message: `Unhandled error: ${msg}`,
				type: 'error'
			});

			console.error(msg);
		};

		const handle_rejection = (e: PromiseRejectionEvent) => {
			e.preventDefault();
			report_error(e?.reason);
		};

		const handle_error = (e: ErrorEvent) => {
			report_error(e?.message);
		};

		window.addEventListener('unhandledrejection', handle_rejection);
		window.addEventListener('error', handle_error);

		return () => {
			window.removeEventListener('unhandledrejection', handle_rejection);
			window.removeEventListener('error', handle_error);
		};
	});
</script>

<script lang="ts">
</script>

<div class="loading-spinner">
	<div class="spinner" />
</div>

<style lang="scss">
	@import '../variables.scss';

	.loading-spinner {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}

	.spinner {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		border: 0.5rem solid transparent;
		border-top-color: var(--text);
		animation: spin 1s ease-in-out infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>

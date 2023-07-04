<script>
	import Step from './step.svelte';
	export let steps = [];
</script>

<ul>
	{#each steps as step}
		<Step {step} bind:steps />
	{/each}
</ul>

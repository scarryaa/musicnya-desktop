<script>
  import { activeLink } from "../../store.ts";
  import { updateLink } from "./router.svelte";

  export let to;
</script>

<button
  class="link"
  tabindex="-1"
  class:active="{$activeLink === to}"
  on:click="{() => updateLink(to)}"
  on:keydown="{(e) =>
    (e.key === 'Enter' || e.key === 'Space') && updateLink(to)}"
>
  <slot />
</button>

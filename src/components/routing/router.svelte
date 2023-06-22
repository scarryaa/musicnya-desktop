<script context="module">
  import { history, page, activeLink, historyIndex } from "../../store.ts";
  import { get } from "svelte/store";

  export function goBack() {
    // if we're at the beginning of the history, do nothing
    if (get(historyIndex) === 0) return;

    historyIndex.set(get(historyIndex) - 1);
    setLink(get(history)[get(historyIndex)]);
  }

  export function goForward() {
    // if we're at the end of the history, do nothing
    if (get(historyIndex) === get(history).length - 1) return;

    historyIndex.set(get(historyIndex) + 1);
    setLink(get(history)[get(historyIndex)]);
  }

  export const updateLink = (link) => {
    if (link === get(activeLink)) return;
    // update history, index, and page
    history.set([...get(history).slice(0, get(historyIndex) + 1), link]);

    historyIndex.set(get(historyIndex) + 1);
    setLink(link);
  };

  export const setLink = (link) => {
    if (link === get(activeLink)) return;

    activeLink.set(link);
    page.set(link);
  };
</script>

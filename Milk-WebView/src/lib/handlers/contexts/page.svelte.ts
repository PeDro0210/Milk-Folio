import type { PageContextState } from "$states/declarations.svelte";

// Ik this is a global state, but let's put it fancy
export const page_context: PageContextState = $state({
  links: [],
  content: [],
  start_menu_title: "Home",
});

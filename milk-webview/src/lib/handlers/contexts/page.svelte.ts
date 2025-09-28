import { type PageContextState, Pages } from "$states/declarations.svelte";

// Ik this is a global state, but let's put it fancy
/** context for each page*/
export const page_context: PageContextState = $state({
  links: [],
  content: [],
  start_menu_title: null,
  first_time_links_fetched: true, //For first time fetching
});

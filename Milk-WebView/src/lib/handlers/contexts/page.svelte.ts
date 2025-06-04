import { type PageContextState, Pages } from "$states/declarations.svelte";

// Ik this is a global state, but let's put it fancy
export const page_context: PageContextState = $state({
  links: [],
  content: [],
  start_menu_title: Pages.home,
  first_time_links_fetched: true, //For first time fetching
});

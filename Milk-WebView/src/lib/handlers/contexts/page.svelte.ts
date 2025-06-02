import type { PageContextState } from "$states/declarations.svelte";
import { setContext } from "svelte";

let state: PageContextState = $state({
  links: [],
  content: [],
  start_menu_title: "Home",
});

setContext("page", state);

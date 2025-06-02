import type { Link } from "$models/links.svelte";
import {
  LoadableElements,
  type PageContextState,
  type StartMenuState,
} from "$states/declarations.svelte";
import { api, loading_state } from "$states/global.svelte";
import { page_context } from "../contexts/page.svelte";

function startMenuHandler() {
  let state: StartMenuState = $state({
    links_list: [],
    start_menu_title: "",
  });

  //TODO: implement context grabbing

  let loaderSetter = () => {
    loading_state.setLoaded(LoadableElements.startmenu);
  };

  return {
    getState: () => {
      return state;
    },
    getLinks: async () => {
      state.links_list = page_context.links;
    },
    setLoaded: loaderSetter(),
  };
}

export default startMenuHandler;

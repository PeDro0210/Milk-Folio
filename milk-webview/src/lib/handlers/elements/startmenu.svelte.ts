import { page_context } from "$contexts/page.svelte";
import {
  LoadableElements,
  type PageContextState,
  Pages,
  type StartMenuState,
} from "$states/declarations.svelte";
import { api, loading_state } from "$states/global.svelte";

function startMenuHandler() {
  let state: StartMenuState = $state({
    links_list: [],
    start_menu_title: Pages.home.valueOf(),
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
    setNewStartMenuName: () => {
      state.start_menu_title = page_context.start_menu_title;
    },
  };
}

export default startMenuHandler;

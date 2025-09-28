import { page_context } from "$contexts/page.svelte";
import {
  LoadableElements,
  Pages,
  type StartMenuState,
} from "$states/declarations.svelte";
import { loading_state } from "$states/global.svelte";

function startMenuHandler() {
  let state: StartMenuState = $state({
    links_list: [],
    start_menu_title: Pages.home.valueOf(),
  });

  let loader_setter = () => {
    loading_state.setLoaded(LoadableElements.startmenu);
  };

  return {
    getState: () => {
      return state;
    },
    getLinks: async () => {
      state.links_list = page_context.links;
    },
    setLoaded: loader_setter(),
    setNewStartMenuName: () => {
      state.start_menu_title = page_context.start_menu_title as string;
    },
  };
}

export default startMenuHandler;

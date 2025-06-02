import {
  LoadableElements,
  type PageContextState,
  type StartMenuState,
} from "$states/declarations.svelte";
import { api, loading_state } from "$states/global.svelte";
import { getContext } from "svelte";

function startMenuHandler() {
  let state: StartMenuState = $state({
    content_list: [],
    start_menu_title: "",
  });

  //TODO: implement context grabbing
  let link_fetcher = async () => {
    const state_context: PageContextState = getContext("page");
    return state_context.links;
  };

  let loaderSetter = () => {
    loading_state.setLoaded(LoadableElements.startmenu);
  };

  return {
    getState: () => {
      return state;
    },
    getLinks: async () => {
      link_fetcher()
        .then((result: any) => {
          //TODO: Add later
          //state.content_list = result.data.data.getContents as Content[];
        });
    },
    setLoaded: loaderSetter(),
  };
}

export default startMenuHandler;

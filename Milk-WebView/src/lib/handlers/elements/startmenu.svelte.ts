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
  let link_fetcher = async () => {
    return page_context.links;
  };

  let loaderSetter = () => {
    loading_state.setLoaded(LoadableElements.startmenu);
  };

  return {
    getState: () => {
      return state;
    },
    getLinks: async () => {
      state.links_list = await link_fetcher();
      //link_fetcher()
      // .then((result: any) => {
      //TODO: Add later
      //state.content_list = result.data.data.getContents as Content[];
      // });
    },
    setLoaded: loaderSetter(),
  };
}

export default startMenuHandler;

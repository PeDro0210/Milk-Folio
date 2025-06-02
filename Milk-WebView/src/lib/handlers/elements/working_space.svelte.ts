import {
  LoadableElements,
  type PageContextState,
  type WorkingSpaceState,
} from "$states/declarations.svelte";
import { api, loading_state } from "$states/global.svelte";
import { getContext } from "svelte";

function workingSpaceHandler() {
  let state: WorkingSpaceState = $state({
    content_list: [],
  });

  //TODO: implement context grabbing
  let fetcher = async () => {
    let context_state: PageContextState = getContext("page");

    return context_state.content;
  };

  let loaderSetter = () => {
    loading_state.setLoaded(LoadableElements.desktop);
  };

  return {
    getState: () => {
      return state;
    },
    getLinks: async () => {
      fetcher()
        .then((result: any) => {
          //TODO: Add later
          //state.content_list = result.data.data.getContents as Content[];
        });
    },
    setLoaded: loaderSetter(),
  };
}

export default workingSpaceHandler;

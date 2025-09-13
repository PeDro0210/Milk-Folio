import {
  LoadableElements,
  type PageContextState,
  type WorkingSpaceState,
} from "$states/declarations.svelte";
import { api, loading_state } from "$states/global.svelte";
import { getContext } from "svelte";
import { page_context } from "../contexts/page.svelte";

function workingSpaceHandler() {
  let state: WorkingSpaceState = $state({
    content_list: [],
  });

  //TODO: implement context grabbing
  let fetcher = () => {
    return page_context.content;
  };

  let loaderSetter = () => {
    loading_state.setLoaded(LoadableElements.desktop);
  };

  return {
    getState: () => {
      return state;
    },
    getContents: async () => {
      state.content_list = fetcher();
    },
    setLoaded: loaderSetter(),
  };
}

export default workingSpaceHandler;

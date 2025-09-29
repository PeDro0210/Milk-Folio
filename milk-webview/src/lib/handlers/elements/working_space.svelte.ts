import {
  LoadableElements,
  type PageContextState,
  type WorkingSpaceState,
} from "$states/declarations.svelte";
import { api, loading_state, window_state } from "$states/global.svelte";
import { getContext } from "svelte";
import { page_context } from "../contexts/page.svelte";

function workingSpaceHandler() {
  let state: WorkingSpaceState = $state({
    content_list: [],
  });


  return {
    getState: () => {
      return state;
    },
    getContents: async () => {
      state.content_list = page_context.content;
    },
    setLoaded: () => {
      loading_state.setLoaded(LoadableElements.desktop);
    },
    onMobileLayout: () => {

      // for simplicity, let's do it in here, cause at the end the workingSpace is the one getting manipulated
      let body = document.querySelector("body") as HTMLElement;

      if (window_state.window_width < 700) {
        body.style.overflowY = "scroll";
      }
      else {
        body.style.overflowY = "hidden";
      }

    }
  };
}

export default workingSpaceHandler;

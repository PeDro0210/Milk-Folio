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

      let desktop = document.querySelector("#desktop") as HTMLElement;
      if (window_state.window_width > 700) {
        desktop.style.setProperty("--dekstop-display", "");
      }
      else {
        desktop.style.setProperty("--dekstop-display", "flex");
      }

    }
  };
}

export default workingSpaceHandler;

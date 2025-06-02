import {
  LoadableElements,
  type PageContextState,
  type TaskBarState,
} from "$states/declarations.svelte";
import { api, loading_state } from "$states/global.svelte";
import { getContext } from "svelte";
import { page_context } from "../contexts/page.svelte";
import type { Link } from "$models/links.svelte";

/*
 *  First rule before anything, simplicty before doing weird sheningangs,
 *  The only way those are acceptable, is if they are faster, then... is just useless
 */
function taskbarHandler() {
  let state: TaskBarState = $state({
    links_list: [],
    inner_width: "",
    time: new Date(),
  });

  let state_getter = () => {
    return state;
  };

  //TODO: implement context grabbing

  //Changes the innerwidth of the taskbar and changes css variable of the window-width
  //Ik i'm using scss, but GRAWWWWWWWWW, PREPROCESSORS
  let innerwidth_changer = (window_inner_width: number) => {
    let new_inner_width = window_inner_width - 335 + "px"; // Adjust the width calculation as needed

    let window_side = document.querySelector("#windows-side") as HTMLElement;

    if (window_side != null) {
      window_side.style.setProperty("--window-width", new_inner_width);
    }

    return new_inner_width;
  };

  let time_fetcher = () => {
    return new Date();
  };

  //separting the load function from the fetcher, cause in phone view it won't call the getLoad on the taskbar
  let loaderSetter = () => {
    loading_state.setLoaded(LoadableElements.taskbar);
  };

  return {
    getState: state_getter,
    getLinks: () => {
      state.links_list = page_context.links;
    },
    onChangeWidth: (window_width: number) => {
      state.inner_width = innerwidth_changer(window_width);
    },
    getTime: () => {
      setInterval(() => {
        state.time = time_fetcher();
      }, 6000);
    },
    setLoaded: loaderSetter(),
  };
}

export default taskbarHandler;

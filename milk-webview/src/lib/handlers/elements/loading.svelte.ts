import type { LoadingState } from "$states/declarations.svelte";

function loadingHandler() {
  let state: LoadingState = $state({
    loaded: false,
  });

  let load = (loaded: boolean) => {

    setTimeout(() => {
      state.loaded = loaded;

      let root_document = document.getElementsByTagName("html")[0] as HTMLElement;

      if (root_document != null) root_document.style.setProperty("--overflow-root", "visible");

    }, 3000)
  }

  return {
    getState: () => {
      return state;
    },
    checkLoading: (loaded: boolean) => {
      load(loaded);
    },
  };
}

export default loadingHandler;

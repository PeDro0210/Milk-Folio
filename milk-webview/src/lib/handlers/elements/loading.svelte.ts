import type { LoadingState } from "$states/declarations.svelte";

function loadingHandler() {
  let state: LoadingState = $state({
    loaded: false,
  });

  let load = (loaded: boolean) => {
    state.loaded = loaded;
  };

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

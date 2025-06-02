import {
  LoadableElements,
  type WorkingSpaceState,
} from "$states/declarations.svelte";
import { api, loading_state } from "$states/global.svelte";

function workingSpaceHandler() {
  let state: WorkingSpaceState = $state({
    content_list: [],
  });

  let fetcher = async () => {
    return api({
      url: "/graphql",
      method: "post",
      data: {
        query: `
        query{
          getLinks{
            key
            title
            link
            windowPhotoUrl
          }
        }`,
      },
    });
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

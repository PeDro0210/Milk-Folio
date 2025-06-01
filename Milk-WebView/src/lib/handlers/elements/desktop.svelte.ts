import type { Content } from "$models/content.svelte";
import { api, loading_state } from "$contexts/global.svelte";
import { LoadableElements } from "$contexts/utils.svelte";
import type { ContentRelatedState } from "$states/content_related.svelte";

function desktopHandler() {
  let state: ContentRelatedState = $state({
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

export default desktopHandler;

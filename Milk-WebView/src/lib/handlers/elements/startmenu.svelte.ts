import { api, loading_state } from "$contexts/global.svelte";
import { LoadableElements } from "$contexts/utils.svelte";
import type { ContentRelatedState } from "$states/content_related.svelte";

function startMenuHandler() {
  let state: ContentRelatedState = $state({
    content_list: [],
  });

  let link_fetcher = async () => {
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
            startmenuIconUrl
          }
        }`,
      },
    });
  };

  let loaderSetter = () => {
    loading_state.setLoaded(LoadableElements.startmenu);
  };

  return {
    getState: () => {
      return state;
    },
    getLinks: async () => {
      link_fetcher()
        .then((result: any) => {
          //TODO: Add later
          //state.content_list = result.data.data.getContents as Content[];
        });
    },
    setLoaded: loaderSetter(),
  };
}

export default startMenuHandler;

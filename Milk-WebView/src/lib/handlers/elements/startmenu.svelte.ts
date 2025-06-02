import {
  LoadableElements,
  type StartMenuState,
} from "$states/declarations.svelte";
import { api, loading_state } from "$states/global.svelte";

function startMenuHandler() {
  let state: StartMenuState = $state({
    content_list: [],
    start_menu_title: "",
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

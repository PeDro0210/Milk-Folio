import type { Content } from "$models/content.svelte";
import type { Links } from "$models/links.svelte";
import ContentType from "$models/utils.svelte";
import type { PageContextState } from "$states/declarations.svelte";
import { getContext } from "svelte";

function pageMeHandler() {
  const state: PageContextState = getContext("page");

  //TODO:Implement API Call

  // ! DUMMY DATA
  const link_getter = (): Links[] => {
    return [
      {
        title: "Home",
        link: "/",
      },
      {
        title: "About Me",
        link: "/about",
      },
      {
        title: "My Projects",
        link: "/projects",
      },
    ];
  };

  // ! DUMMY DATA
  const content_getter = (): Content[] => {
    return [
      {
        title: "Home",
        content: `
        # Home Page
                  `,
        content_type: ContentType.Markdown,
      },
      {
        title: "Random Image",
        content:
          "https://firebasestorage.googleapis.com/v0/b/fatipage-a0067.firebasestorage.app/o/milk-link%2Fsteam%2Faigis_steam_3.gif?alt=media&token=f50bd99e-2c8c-416a-bb6d-ecdc21e543ab",
        content_type: ContentType.Image,
      },
    ];
  };

  return {
    getLinks: () => {
      state.links = link_getter();
    },
    getContent: () => {
      state.content = content_getter();
    },
    setStartMenuTitle: (title: string) => {
      state.start_menu_title = title;
    },
  };
}

export default pageMeHandler;

import type { Content } from "$models/content.svelte";
import type { Link } from "$models/links.svelte";
import ContentType from "$models/utils.svelte";
import { page_context } from "../contexts/page.svelte";

function pageMeHandler() {
  //TODO:Implement API Call

  // ! DUMMY DATA
  const link_getter = (): Link[] => {
    return [
      {
        image:
          "https://firebasestorage.googleapis.com/v0/b/fatipage-a0067.firebasestorage.app/o/milk-link%2Ftwitter%2FGG_discord_3.gif?alt=media&token=98657a10-f99f-4834-93d9-2ddc7c20d12b",
        title: "Home",
        link: "/",
      },
      {
        image:
          "https://firebasestorage.googleapis.com/v0/b/fatipage-a0067.firebasestorage.app/o/milk-link%2Ftwitter%2FGG_discord_3.gif?alt=media&token=98657a10-f99f-4834-93d9-2ddc7c20d12b",
        title: "About Me",
        link: "/about",
      },
      {
        image:
          "https://firebasestorage.googleapis.com/v0/b/fatipage-a0067.firebasestorage.app/o/milk-link%2Ftwitter%2FGG_discord_3.gif?alt=media&token=98657a10-f99f-4834-93d9-2ddc7c20d12b",
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
      console.log(page_context.links);
      page_context.links = link_getter();
      console.log(page_context.links);
    },
    getContent: () => {
      page_context.content = content_getter();
    },
    setStartMenuTitle: (title: string) => {
      page_context.start_menu_title = title;
    },
  };
}

export default pageMeHandler;

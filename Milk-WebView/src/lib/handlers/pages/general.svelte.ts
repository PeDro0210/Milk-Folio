import type { Content } from "$models/content.svelte";
import type { Link } from "$models/links.svelte";
import ContentType from "$models/utils.svelte";
import type { Pages } from "$states/declarations.svelte";
import { page_context } from "../contexts/page.svelte";

function pageMeHandler() { //TODO:Implement API Call
  //TODO: Just call once
  const link_getter = (actual_page: Pages): Link[] => {
    //For not refetching the API
    if (!(page_context.first_time_links_fetched)) {
      return page_context.links;
    }
    //TODO: Change to the API CALL
    let result = [
      {
        image:
          "https://firebasestorage.googleapis.com/v0/b/fatipage-a0067.firebasestorage.app/o/milk-link%2Ftwitter%2FGG_discord_3.gif?alt=media&token=98657a10-f99f-4834-93d9-2ddc7c20d12b",
        title: "Home",
        link: "/",
      },
      {
        image:
          "https://firebasestorage.googleapis.com/v0/b/fatipage-a0067.firebasestorage.app/o/milk-link%2Ftwitter%2FGG_discord_3.gif?alt=media&token=98657a10-f99f-4834-93d9-2ddc7c20d12b",
        title: "About",
        link: "/about",
      },
      {
        image:
          "https://firebasestorage.googleapis.com/v0/b/fatipage-a0067.firebasestorage.app/o/milk-link%2Ftwitter%2FGG_discord_3.gif?alt=media&token=98657a10-f99f-4834-93d9-2ddc7c20d12b",
        title: "Projects",
        link: "/projects",
      },
    ];

    return result;
  };

  const content_getter = (actual_page: Pages): Content[] => {
    // ! DUMMY DATA
    return [
      {
        key: 0,
        title: "Home",
        content: `# Home Page\nDummy Page Dummy Page\n`,
        content_type: ContentType.Markdown,
        link_redirection: null,
      },
      {
        key: 1,
        title: "Random Image",
        content:
          "https://firebasestorage.googleapis.com/v0/b/fatipage-a0067.firebasestorage.app/o/milk-link%2Fsteam%2Faigis_steam_3.gif?alt=media&token=f50bd99e-2c8c-416a-bb6d-ecdc21e543ab",
        content_type: ContentType.Image,
        link_redirection: "https://www.instagram.com/p.e.d.r.o021/",
      },
    ];
  };

  return {
    getLinks: (actual_page: Pages) => {
      page_context.links = link_getter(actual_page).filter((link) => {
        if (link.title !== actual_page.valueOf()) {
          return link;
        }
      });
    },
    getContent: (actual_page: Pages) => {
      page_context.content = content_getter(actual_page);
    },
    setStartMenuTitle: (title: Pages) => {
      page_context.start_menu_title = title;
    },
  };
}

export default pageMeHandler;

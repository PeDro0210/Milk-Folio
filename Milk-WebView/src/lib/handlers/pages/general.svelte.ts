import type { Content } from "$models/content.svelte";
import type { Link } from "$models/links.svelte";
import ContentType from "$models/utils.svelte";
import type { Pages } from "$states/declarations.svelte";
import { page_context } from "$contexts/page.svelte";
import { api } from "$states/global.svelte";

function pageMeHandler() { //TODO:Implement API Call
  //TODO: Just call once
  const link_getter = new Promise<any>((resolve, reject) => {
    try {
      //For not refetching the API
      if (!(page_context.first_time_links_fetched)) {
        resolve(page_context.links);
      }
      api(
        {
          url: "/links",
          method: "get",
        },
      ).then((result: any) => {
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });

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
    getLinks: async (actual_page: Pages) => {
      link_getter.then((links) => {
        page_context.links = links.data.filter((link: Link) => {
          if (
            link.title.toLocaleLowerCase() !==
            actual_page.valueOf().toLocaleLowerCase()
          ) {
            return link;
          }
        });
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

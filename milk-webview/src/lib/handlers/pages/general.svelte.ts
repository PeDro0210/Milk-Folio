import type { Content } from "$models/content.svelte";
import type { Link } from "$models/links.svelte";
import type { Pages } from "$states/declarations.svelte";
import { page_context } from "$contexts/page.svelte";
import { api } from "$states/global.svelte";

function pageMeHandler() {
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
        resolve(result.data);
      });
    } catch (error) {
      reject(error);
    }
  });

  const content_getter = (actual_page: Pages): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      try {
        console.log(api.getUri())
        api({
          url: "/" + actual_page.valueOf().toLocaleLowerCase(),
          method: "get",
        }).then((result: any) => {
          resolve(result.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getLinks: async (actual_page: Pages) => {
      link_getter.then((links: Link[]) => {
        page_context.links = links.filter((link: Link) => {
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
      content_getter(actual_page).then((result: Content[]) => {
        page_context.content = result;
      });
    },
    setStartMenuTitle: (title: Pages) => {
      page_context.start_menu_title = title;
    },
  };
}

export default pageMeHandler;

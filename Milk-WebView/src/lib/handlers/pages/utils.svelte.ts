import type { Link } from "$models/links.svelte";
import type { Pages } from "$states/declarations.svelte";

export const parse_links = (actual_page: Pages, links: Link[]) => {
  return links.filter((link) => {
    if (link.title !== actual_page.valueOf()) {
      return link;
    }
  });
};

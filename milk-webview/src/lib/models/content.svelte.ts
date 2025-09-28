import ContentType from "$models/utils.svelte";

// This will only by used in window components
/** object mapper for contents*/
export interface Content {
  key: number;
  title: string;
  content: string;
  content_type: ContentType;
  link_redirection: string | null;
}

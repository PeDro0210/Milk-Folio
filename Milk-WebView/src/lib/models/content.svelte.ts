import ContentType from "$models/utils.svelte";

// This will only by used in window components
export interface Content {
  title: string;
  content: string;
  content_type: ContentType;
}

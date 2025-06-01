import ContentType from "$models/utils.svelte";

export interface Content {
  title: string;
  content: string;
  content_type: ContentType;
}

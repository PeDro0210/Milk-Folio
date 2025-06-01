import type { Content } from "$models/content.svelte";

export interface TaskBarState {
  content_list: Content[]; //TODO: Add href interface
  inner_width: string;
  time: Date;
}

import type { Content } from "$models/content.svelte";
import type { Links } from "$models/links.svelte";

export interface WorkingSpaceState {
  content_list: Content[];
}

export interface LoadingState {
  loaded: boolean;
}

export interface StartMenuState {
  content_list: Links[];
  start_menu_title: string;
}

export interface TaskBarState {
  content_list: Links[];
  inner_width: string;
  time: Date;
}

export interface VaporWaveWindowState {
  x_position: string;
  y_position: string;
  appbar_grabbed: boolean;
  show_error_pop_up: boolean;
}

export interface PageContextState {
  links: Links[];
  content: Content[];
  start_menu_title: string;
}

export enum AligmentTypes {
  start = "flex-start",
  center = "center",
}

export enum LoadableElements {
  desktop = 0,
  taskbar = 1,
  startmenu = 2,
}

export enum Pages {
  home = "home",
  about = "about",
  projects = "projects",
}

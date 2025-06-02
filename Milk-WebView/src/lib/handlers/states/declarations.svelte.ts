import type { Content } from "$models/content.svelte";
import type { Link } from "$models/links.svelte";

export interface WorkingSpaceState {
  content_list: Content[];
}

export interface LoadingState {
  loaded: boolean;
}

export interface StartMenuState {
  links_list: Link[];
  start_menu_title: string;
}

export interface TaskBarState {
  links_list: Link[];
  inner_width: string;
  time: Date;
}

export interface VaporWaveWindowState {
  x_position: string;
  y_position: string;
  width: string;
  height: string;
  appbar_grabbed: boolean;
  show_error_pop_up: boolean;
}

export interface PageContextState {
  links: Link[];
  content: Content[];
  start_menu_title: Pages;
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
  home = "Home",
  about = "About",
  projects = "Projects",
}

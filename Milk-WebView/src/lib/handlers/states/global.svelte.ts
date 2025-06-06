import type { LoadableElements } from "$states/declarations.svelte";
import Home from "$pages/home.svelte";
import AboutMe from "$pages/about_me.svelte";
import Projects from "$pages/projects.svelte";
import axios from "axios";
import { createRouter } from "sv-router";

export const reactivity_startmenu_state = $state({
  //for managing the start menu reactivity
  slide_start_menu: false,
  toggle: () => {
    reactivity_startmenu_state.slide_start_menu = !reactivity_startmenu_state
      .slide_start_menu;
  },
  changeSelfAlign: (aligment_type: string) => {
    let window_side = document.querySelector("#start-menu") as HTMLElement;
    if (window_side != null) {
      //Will just recieve the flex-start or the center
      window_side.style.setProperty("--aligment", aligment_type);
    }
  },
});

export const loading_state = $state({
  loaded_elements: [
    { loaded: false },
    { loaded: false },
    { loaded: false },
  ],
  setLoaded: (loaded_element: LoadableElements) =>
    loading_state.loaded_elements[loaded_element].loaded = true,
  checkLoadedElements: () => {
    return loading_state.loaded_elements.every(({ loaded }) => loaded === true);
  },
});

export const window_state = $state({
  window_width: window.innerWidth,
  changeInnerWidth: () => {
    window.addEventListener("resize", () => {
      window_state.window_width = window.innerWidth;
    });
  },
});

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const { p, navigate, isActive, route } = createRouter({
  "/": Home,
  "/about": AboutMe,
  "/projects": Projects,
});

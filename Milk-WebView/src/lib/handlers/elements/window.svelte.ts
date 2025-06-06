import ContentType from "$models/utils.svelte";
import type { VaporWaveWindowState } from "$states/declarations.svelte";
import { getRandomBetween } from "./utils.svelte";

/*
 *  First rule before anything, simplicty before doing weird sheningangs,
 *  The only way those are acceptable, is if they are faster, then... is just useless
 */
function windowHandler(window: Window & typeof globalThis, key: number) {
  let state: VaporWaveWindowState = $state({
    x_position: window.localStorage.getItem("positionX" + key) ??
      (getRandomBetween(-700, 700)).toString(),
    y_position: window.localStorage.getItem("positionY" + key) ??
      (getRandomBetween(-400, 100)).toString(),
    window_proportion_height: 0,
    window_proportion_width: 0,
    app_bar_height: 0,
    content_height: 0,
    appbar_grabbed: false,
    show_error_pop_up: false,
  });

  let window_position_changer = (e: any): string[] => {
    if (state.appbar_grabbed) {
      //The cool middle man
      let _x_pos: number = parseInt(state.x_position);
      let _y_pos: number = parseInt(state.y_position);

      _x_pos += e.movementX;
      _y_pos += e.movementY;

      window.localStorage.setItem("positionX" + key, _x_pos.toString());
      window.localStorage.setItem("positionY" + key, _y_pos.toString());

      //deparsing
      return [_x_pos.toString(), _y_pos.toString()];
    }
    return [state.x_position, state.y_position];
  };

  let move_to_front = (e: any) => {
    //! this is not a good practice, is not good for a higher abstraction to be messing with the DOM directly
    let all_windows = document.querySelectorAll(
      ".window",
    ) as NodeListOf<HTMLElement>;

    all_windows.forEach((win) => {
      win.style.zIndex = "0";
    });

    e.currentTarget.style.zIndex = "1";
  };

  let dynamic_size = (window_type: ContentType): number[][] => {
    switch (window_type) {
      case ContentType.Image:
        return [
          [264, 264],
          //Bar size
          [10],
        ];

      case ContentType.Markdown:
        return [
          [480, 640],
          //Bar size
          [6],
        ];
    }
  };

  return {
    getState: () => {
      return state;
    },
    onMoveToFront: (e: any) => {
      move_to_front(e);
    },
    onWindowPositionChange: (e: any) => {
      [state.x_position, state.y_position] = window_position_changer(e);
    },
    onAppbarGrabbed: (new_value: boolean) => {
      state.appbar_grabbed = new_value;
    },
    onShowError: () => {
      state.show_error_pop_up = true;
      setTimeout(() => {
        state.show_error_pop_up = false;
      }, 3000);
    },
    OnChangeWindowProportion: (window_type: ContentType) => {
      let [window_proportions, appbar_proportion] = dynamic_size(window_type);

      state.window_proportion_height = window_proportions.at(0) as number;
      state.window_proportion_width = window_proportions.at(1) as number;

      state.app_bar_height = appbar_proportion.at(0) as number;
      state.content_height = appbar_proportion.at(0) as number - 100;
    },
  };
}

export default windowHandler;

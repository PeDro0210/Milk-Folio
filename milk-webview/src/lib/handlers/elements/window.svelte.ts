import ContentType from "$models/utils.svelte";
import type { VaporWaveWindowState } from "$states/declarations.svelte";
import { window_state } from "$states/global.svelte";
import { CONTENT_OFFSET, ERROR_TIMEOUT, IMAGE_HEIGHT_MOBILE, IMAGE_WINDOW_BAR_SIZE, IMAGE_WINDOW_PROPORTIONS, MARKDOWN_WINDOW_BAR_SIZE, MARKDOWN_WINDOW_PROPORTIONS } from "./global";
import { getRandomBetween } from "./utils.svelte";


function windowHandler(window: Window & typeof globalThis, key: number) {
  let state: VaporWaveWindowState = $state({

    // I got kinda stressed for this 2 to be so close
    x_position: window.localStorage.getItem("positionX" + key) ??
      (getRandomBetween(-window.outerWidth / 4, window.outerWidth / 4)).toString(),

    y_position: window.localStorage.getItem("positionY" + key) ??
      (getRandomBetween(-window.outerHeight / 4, window.outerHeight / 4)).toString(),

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

    // We reset them all
    all_windows.forEach((win) => {
      win.style.zIndex = "0";
    });

    // and then ta ra, put them above
    e.currentTarget.style.zIndex = "1";
  };

  /**
   * Method for fetching the size of the window, depending on which type is
  */
  let dynamic_size = (window_type: ContentType): number[][] => {
    switch (window_type) {
      case ContentType.Image:
        return [
          IMAGE_WINDOW_PROPORTIONS,
          //Bar size
          [IMAGE_WINDOW_BAR_SIZE],
        ];

      case ContentType.Markdown:
        return [
          MARKDOWN_WINDOW_PROPORTIONS,
          //Bar size
          [MARKDOWN_WINDOW_BAR_SIZE],
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
    /**transforms the position for this window, depending on the mouse position*/
    onWindowPositionChange: (e: any) => {
      // in case we are in mobileLayout, we won't let the window move
      if (window_state.window_width > 700) [state.x_position, state.y_position] = window_position_changer(e);
    },
    onAppbarGrabbed: (new_value: boolean) => {
      state.appbar_grabbed = new_value;
    },
    onShowError: () => {
      state.show_error_pop_up = true;
      setTimeout(() => {
        state.show_error_pop_up = false;
      }, ERROR_TIMEOUT);
    },
    /** given a window type, it sets the proportions for it*/
    onChangeWindowProportion: (window_type: ContentType) => {
      let [window_proportions, appbar_proportion] = dynamic_size(window_type);

      state.window_proportion_height = window_proportions.at(0) as number;
      state.window_proportion_width = window_proportions.at(1) as number;

      state.app_bar_height = appbar_proportion.at(0) as number;
      state.content_height = appbar_proportion.at(0) as number - CONTENT_OFFSET;
    },

    /** changes the width of each window to the device width*/
    onMobileLayout: (window_type: ContentType) => {
      state.window_proportion_width = window_state.window_width;

      // in case for image window
      if (window_type == ContentType.Image) {
        state.window_proportion_height = IMAGE_HEIGHT_MOBILE;
      }
    }
  };
}

export default windowHandler;

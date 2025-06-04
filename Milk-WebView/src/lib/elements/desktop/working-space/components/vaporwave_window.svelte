<script lang="ts">
  import close_button from "$static/icon_buttons/close_icon.svg";
  import minimize_button from "$static/icon_buttons/minimize_icon.svg";
  import windowHandler from "$handlers/window.svelte";
  import type { VaporWaveWindowState } from "$states/declarations.svelte";
  import WindowButton from "$elements/common/window_button.svelte";
  import ErrorPopUp from "$elements/common/error_pop_up.svelte";
  import ContentType from "$models/utils.svelte";
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";

  let {
    text,
    content,
    on_click_function,
    key,
    content_type,
  }: {
    text: string;
    content: string | null;
    on_click_function: () => void;
    key: number;
    content_type: ContentType;
  } = $props();

  //Configurations for the animiation of the ErrorPopUp
  let error_pop_up_options = { duration: 100 };

  let handler = windowHandler(window, key);

  let state: VaporWaveWindowState = $state(handler.getState());

  onMount(() => {
    handler.OnChangeWindowProportion(content_type);
  });
</script>

<svelte:window
  onmouseup={() => {
    handler.onAppbarGrabbed(false);
  }}
  onmousemove={handler.onWindowPositionChange}
/>

<div
  class="window"
  style="width:{state.window_proportion_width}px; height:{state.window_proportion_height}px; transform: translate({state.x_position}px,{state.y_position}px);"
  onmouseup={handler.onMoveToFront}
>
  <!-- the button is or making the compiler happy-->
  <div
    class="app-bar"
    style="height: {state.app_bar_height}%;"
    onmousedown={() => {
      handler.onAppbarGrabbed(true);
    }}
  >
    <text>{text}</text>
    <div class="button-row">
      <WindowButton
        icon={minimize_button}
        on_click_function={() => {
          handler.onShowError();
        }}
      />
      <WindowButton
        icon={close_button}
        on_click_function={() => {
          handler.onShowError();
        }}
      />
    </div>
  </div>
  {#if content_type === ContentType.Image}
    <img
      class="content"
      src={content}
      onclick={on_click_function}
      alt="img for the content side"
    />
  {:else}
    <div class="can_scroll">
      <SvelteMarkdown source={content} />
    </div>
  {/if}
  {#if state.show_error_pop_up}
    <ErrorPopUp animation_options={error_pop_up_options} />
  {/if}
</div>

<style lang="scss">
  /*TODO: Change everything to more responsive values*/
  /*the power of figma*/
  .window {
    /* Vaporwave-Window */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 6px 9px;
    gap: 5px;

    position: fixed;

    z-index: 0;

    background: #0e0f14;
    border-width: 0px 2px 2px 0px;
    border-style: solid;
    border-color: var(--border-color);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

    .app-bar {
      /* little-window-bar */

      user-select: none;
      /* Auto layout */
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      height: 10%;

      background: linear-gradient(90deg, #a33638 9%, #542738 100%);

      /* Inside auto layout */
      flex: none;
      order: 0;
      flex-grow: 0;

      &:active {
        cursor: pointer;
      }

      &:hover {
        cursor: pointer;
      }

      .button-row {
        /* button-row */

        /* Auto layout */
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
        gap: 4px;

        margin: 0 10px;
        width: 30%;
        height: 100%;

        /* Inside auto layout */
        flex: none;
        order: 1;
        flex-grow: 0;
      }

      text {
        padding-left: 10px;
        width: 60%;
        text-align: left;
        font-size: 1.8em;
      }
    }

    .content {
      /* content-side */

      box-sizing: border-box;

      width: 100%;
      height: 90%; /*Make this also dynamic*/

      border-width: 2px 1px 1px 2px;
      border-style: solid;
      border-color: #3a3a3a;
      opacity: 0.5;
      box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.25);

      /* Inside auto layout */
      flex: none;
      order: 1;
      flex-grow: 0;
      &:hover {
        cursor: pointer;
        opacity: 1;
      }
    }

    .can_scroll {
      padding-left: 10px;
      width: 100%;
      height: 100%;

      scrollbar-color: #542738 #0e0f14;
      scrollbar-width: thin;
      overflow: scroll;
    }
  }
</style>

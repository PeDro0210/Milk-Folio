<script lang="ts">
  import Clock from "$commonElements/clock.svelte";
  import Separator from "./components/separator.svelte";
  import TaskbarButtons from "./components/taskbar_buttons.svelte";
  import { start_button_attributes } from "./utils/constant";
  import { onMount } from "svelte";
  import { reactivity_startmenu_state } from "$states/global.svelte";
  import taskbarHandler from "$handlers/taskbar.svelte";
  import MilkButton from "$elements/common/milk_button.svelte";
  import type { TaskBarState } from "$states/declarations.svelte";

  //let's not talk about this stupid workaround

  let handler = taskbarHandler();

  let state: TaskBarState = $state(handler.getState());

  let window_resizing = async () => {
    let window_width: number = window.innerWidth;
    handler.onChangeWidth(window_width);
  };

  onMount(() => {
    handler.setLoaded;
    window_resizing();
  });

  //Managing the date for the clock and the link fetching with the general state
  $effect(() => {
    handler.getLinks();
    handler.getTime();
  });

  //this is still not the best option, is a pretty inscure way to listening the DOM
  //Managing the resizing of the window-sidebar
  $effect(() => {
    window.addEventListener("resize", window_resizing);
  });
</script>

<div id="taskbar">
  <MilkButton
    icon_url={start_button_attributes.icon}
    width={"120px"}
    height={"40px"}
    text={start_button_attributes.text}
    on_click_function={reactivity_startmenu_state.toggle}
  />

  <Separator />

  <div id="windows-side">
    {#each state.links_list as button}
      <MilkButton
        icon_url={button.image as string}
        width={"256px"}
        height={"40px"}
        text={button.title}
        on_click_function={() => {
          window.open(button.link, "_self");
        }}
      />
    {/each}
  </div>

  <Separator />

  <Clock time={state.time} />
</div>

<style lang="scss">
  #taskbar {
    padding: 10px 10px;
    pointer-events: auto;

    position: relative;
    height: 5vh;
  }

  #windows-side {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;

    scrollbar-color: #542738 #0e0f14;
    scrollbar-width: thin;

    overflow-x: scroll;

    width: var(--window-width, 0);

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
  }
</style>

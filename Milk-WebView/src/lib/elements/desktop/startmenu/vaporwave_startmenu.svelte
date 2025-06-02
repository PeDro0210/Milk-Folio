<script lang="ts">
  import LinkButtons from "./components/link_buttons.svelte";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import startMenuHandler from "$handlers/startmenu.svelte";
  import type { StartMenuState } from "$states/declarations.svelte";
  import { reactivity_startmenu_state } from "$states/global.svelte";

  let options = { duration: 50, x: "75vh" };

  let handler = startMenuHandler();

  let state: StartMenuState = $state(handler.getState());

  onMount(() => {
    handler.setLoaded;
  });

  $effect(() => {
    handler.setNewStartMenuName();
    handler.getLinks();
  });
</script>

{#if !reactivity_startmenu_state.slide_start_menu}
  <div id="start-menu" transition:slide={options}>
    <div id="title-bar">
      <!--TODO: Make the title-bar part be managable in the state-->
      <text>{state.start_menu_title}</text>
    </div>
    <div id="content-side">
      {#each state.links_list as button}
        <LinkButtons
          icon_url={button.image as string}
          text={button.title}
          on_click_function={() => {
            window.open(button.link, "_self");
          }}
        />
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  #start-menu {
    /* StartMenu */

    box-sizing: border-box;

    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-self: var(--aligment);
    align-items: flex-start;
    padding: 10px 10px 10px 10px;
    gap: 10px;

    width: 271px;
    height: 75vh; //For adapting to the screen, not the parent-element

    pointer-events: auto;

    background: #0e0f14;
    border-right: 2px solid #3a3a3a;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  }

  #title-bar {
    /* title-bar */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    //Inverse padding for some reason
    padding: 10px 0px 0px 0px;
    gap: 10px;

    width: 34px;
    height: 100%;

    background: linear-gradient(180deg, #542738 0%, #a33638 100%);

    writing-mode: vertical-lr;
    text-orientation: sideways-right;
    //There wasn't a fucking way of doing nativley
    transform: rotate(-180deg);
    user-select: none;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;

    text {
      height: 100%;
    }
  }

  #content-side {
    /* content-side */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 2px;

    overflow-y: auto;
    scrollbar-width: none;
    width: 83%;
    //This ain't a good practice
    height: 101.5%;

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
  }
</style>

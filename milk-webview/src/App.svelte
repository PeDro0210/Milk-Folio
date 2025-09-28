<script lang="ts">
  import VaporwaveNavbar from "$elements/phone/navbar/vaporwave_navbar.svelte";
  import MilkLoadingScreen from "$elements/common/milk_loading_screen.svelte";
  import VaporwaveStartmenu from "$elements/desktop/startmenu/vaporwave_startmenu.svelte";
  import VaporwaveTaskbar from "$elements/desktop/taskbar/vaporwave_taskbar.svelte";
  import VaporwaveWorkingspace from "$elements/desktop/working-space/vaporwave_workingspace.svelte";
  import VaporwaveAppbar from "$elements/phone/appbar/vaporwave_appbar.svelte";
  import {
    loading_state,
    reactivity_startmenu_state,
    window_state,
  } from "$states/global.svelte";
  import { AligmentTypes, Pages } from "$states/declarations.svelte";
  import { Router } from "sv-router";
  import "$states/global.svelte";
  import pageMeHandler from "./lib/handlers/pages/general.svelte";
  import { page_context } from "$contexts/page.svelte";

  let page_handler = pageMeHandler();

  $effect(() => {
    window_state.changeInnerWidth();

    //The only propuse for calling this variable here, is for activating the $effect
    //for running the  if statement down bewlo
    let effect_activator = reactivity_startmenu_state.slide_start_menu;

    if (window_state.window_width > 700) {
      reactivity_startmenu_state.changeSelfAlign(AligmentTypes.start.valueOf());
    } else {
      reactivity_startmenu_state.changeSelfAlign(
        AligmentTypes.center.valueOf(),
      );
    }
  });

  $effect(() => {
    page_handler.getLinks(page_context.start_menu_title as Pages);
    page_handler.getContent(page_context.start_menu_title as Pages);
  });
</script>

<crt-filter>
  <!--the loading screen will unload when all the elements are load--->

  {#if loading_state.checkLoadedElements()}
    <MilkLoadingScreen />
  {/if}

  <main>
    <!--For the content loading-->
    <Router />

    <VaporwaveWorkingspace />
  </main>

  <hud>
    {#if window_state.window_width > 700}
      <!--- need to re "instanciate" cause the AppBar--->
      <VaporwaveStartmenu />

      <VaporwaveTaskbar />
    {:else}
      <VaporwaveAppbar />
      <VaporwaveStartmenu />
      <VaporwaveNavbar />
    {/if}
  </hud>
</crt-filter>

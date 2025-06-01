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
  } from "./lib/handlers/contexts/global.svelte";
  import { AligmentTypes } from "./lib/handlers/contexts/utils.svelte";

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
</script>

<crt-filter>
  <!---
  the loading screen will unload when all the elements are load
  --->

  {#if loading_state.checkLoadedElements()}
    <MilkLoadingScreen />
  {/if}

  <main>
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

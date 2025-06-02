<script lang="ts">
  import loadingHandler from "$handlers/loading.svelte";
  import type { LoadingState } from "$states/declarations.svelte";
  import { loading_state } from "$states/global.svelte";
  import { fade } from "svelte/transition";
  let options = { duration: 3000 };

  let handler = loadingHandler();
  let state: LoadingState = $state(handler.getState());

  $effect(() => {
    handler.checkLoading(loading_state.checkLoadedElements());
  });
</script>

{#if !state.loaded}
  <loadin-screen transition:fade={options}>
    <p style="position: relative; left:10px; inline-size: 1.1;">Loading...</p>
  </loadin-screen>
{/if}

<style lang="scss">
  loadin-screen {
    font-size: 4rem;

    display: inline;
    position: absolute;

    background: url(../../../assets/loading_background.gif) no-repeat center
      center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    width: 100%;
    height: 100%;
    z-index: 20;

    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>

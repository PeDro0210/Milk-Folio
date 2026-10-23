<script lang="ts">
  import { onMount } from "svelte";
  import type { WorkingSpaceState } from "$states/declarations.svelte";
  import workingSpaceHandler from "$handlers/working_space.svelte";
  import VaporwaveWindow from "./components/vaporwave_window.svelte";
  import { window_state } from "$states/global.svelte";

  let handler = workingSpaceHandler();

  let state: WorkingSpaceState = $state(handler.getState());

  let window_resizing = async () => {
    handler.onMobileLayout();
  };

  onMount(async () => {
    handler.setLoaded();
  });

  $effect(() => {
    handler.getContents();
    window.addEventListener("resize", window_resizing);
  });
</script>

<div id="desktop">
  {#each state.content_list as content_object}
    <VaporwaveWindow
      text={content_object.title}
      content={content_object.content}
      on_click_function={() => {
        if (content_object.link_redirection) {
          window.open(content_object.link_redirection, "_blank");
        }
      }}
      content_type={content_object.content_type}
      key={content_object.key as number}
    />
  {/each}
</div>

<style lang="scss">
  #desktop {
    display: grid;
    flex-direction: column;
    gap: 10%;
    align-items: center;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  @media only screen and (max-width: 700px) {
    #desktop {
      overflow-y: scroll;
      padding-top: 45%;
      padding-left: 50%;
      width: 100%;
      height: 100vh;
    }
  }
</style>

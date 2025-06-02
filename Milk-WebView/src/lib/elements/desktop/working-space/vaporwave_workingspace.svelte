<script lang="ts">
  import { onMount } from "svelte";
  import type { WorkingSpaceState } from "$states/declarations.svelte";
  import workingSpaceHandler from "$handlers/working_space.svelte";
  import VaporwaveWindow from "./components/vaporwave_window.svelte";

  let handler = workingSpaceHandler();

  let state: WorkingSpaceState = $state(handler.getState());

  onMount(async () => {
    handler.getLinks();
    handler.setLoaded;
  });
</script>

<div class="desktop">
  {#each state.content_list as content_object}
    <VaporwaveWindow
      text={content_object.title}
      content={content_object.content}
      on_click_function={() => {
        //TODO: add the link option for images only
        //window.open(content_object.link, "_blank");
      }}
      content_type={content_object.content_type}
      key={content_object.key as number}
    />
  {/each}
</div>

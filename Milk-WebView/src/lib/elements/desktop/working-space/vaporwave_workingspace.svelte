<script lang="ts">
  import { onMount } from "svelte";
  import type { WorkingSpaceState } from "$states/declarations.svelte";
  import workingSpaceHandler from "$handlers/working_space.svelte";

  let handler = workingSpaceHandler();

  let state: WorkingSpaceState = $state(handler.getState());

  onMount(async () => {
    handler.getLinks();
    handler.setLoaded;
  });
</script>

<div class="desktop">
  <!-- TODO: Add later
  {#each state.links_list as link_object}
    <VaporwaveWindow
      text={link_object.title}
      img_content={link_object.windowPhotoUrl}
      on_click_function={() => {
        window.open(link_object.link, "_blank");
      }}
      key={link_object.key as number}
    />
  {/each}
  -->
</div>

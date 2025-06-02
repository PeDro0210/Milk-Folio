<script lang="ts">
  import { page_context } from "$contexts/page.svelte";
  import { Pages } from "$states/declarations.svelte";

  $effect(() => {
    page_context.start_menu_title = Pages.home;
  });
</script>

<script lang="ts">
  import taskbarHandler from "$handlers/elements/taskbar.svelte";
  import type { TaskBarState } from "$handlers/states/taskbar.svelte";
  import Clock from "$commonElements/clock.svelte";

  let handler = taskbarHandler();

  let state: TaskBarState = $state(handler.getState());

  //Managing the date for the clock
  $effect(() => {
    handler.getTime();
  });
</script>

<div id="taskbar">
  <Clock time={state.time} />
</div>

<style lang="scss">
  #taskbar {
    justify-content: center;
    position: absolute;
    top: 0;
    height: 36px;
  }
</style>

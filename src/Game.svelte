<script lang="ts">
  import { onMount } from "svelte";
  import { seed as storeSeed } from "./store";
  import ButtonGrid from "./ButtonGrid.svelte";
  import Score from "./Score.svelte";
  import Gg from "./Gg.svelte";

  export let seed;

  onMount(() => {
    storeSeed.update(() => seed);
  });
</script>

<div class="smol-col columns is-mobile is-centered">
  <div class="column is-half">
    <Score />
    <p class="bd-notification is-primary">
      <ButtonGrid />
      <Gg />
    </p>
  </div>
</div>

<style type="scss">
</style>

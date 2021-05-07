<script>
  import { createEventDispatcher } from "svelte";

  export let color = "";
  export let col = -1;
  export let row = -1;

  const dispatch = createEventDispatcher();

  const click = () => {
    dispatch("clicked", {
      color: color == "green" ? "red" : "green",
      col,
      row,
    });
    // color = color == "green" ? "red" : "green";
  };
</script>

<button class="button {color}" on:click={click} />

<style lang="scss">
  .button {
    height: 75px;
    width: 75px;
    &.red {
      background-color: rgb(144, 61, 61);
    }
    &.green {
      background-color: rgb(80, 141, 80);
    }
  }
</style>

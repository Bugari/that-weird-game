<script lang="ts">
  import { onMount } from "svelte";
  import Button from "./Button.svelte";
  import type { ButtonData } from "./ButtonData";
  import { calculateEndpoint } from "./endpoints";
  import { score, isGameOver, lastScoreChange, seed } from "./store";

  export let rowCount = 4;
  export let colCount = 4;
  const scoredCells = new Set();

  let cells: Array<Array<ButtonData>> = [];
  for (let i = 0; i < rowCount; i++) {
    cells.push([]);
    for (let j = 0; j < colCount; j++) {
      cells[i].push({ row: i, col: j, color: "green" });
    }
  }

  function encodeCells() {
    const builder: string[] = [];
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
        builder.push(cells[i][j].color[0]);
      }
    }
    return builder.join("");
  }

  $: $seed, firstSeed();

  let isFirstSeed = true;
  async function firstSeed() {
    scoredCells.clear()
    if (isFirstSeed && $seed !== "0") {
      clicked({ detail: null });
      isFirstSeed = false;
    }
  }

  async function calc(event) {
    return await (
      await fetch(calculateEndpoint, {
        method: "POST",
        body: JSON.stringify({
          cells,
          seed: $seed,
          change: event.detail,
        }),
      })
    ).json();
  }

  async function clicked(event) {
    let result = await calc(event);
    cells = result.cells;
    const encoded = encodeCells();
    if (result.lose) {
      console.log("GAME OVER");
      isGameOver.update(() => true);
    } else if (!scoredCells.has(encoded)) {
      scoredCells.add(encoded);
      lastScoreChange.update(() => result.points);
      score.update((val) => val + result.points);
    }
  }
</script>

{#each cells as row}
  <div class="columns is-centered">
    {#each row as cell}
      <div class="column is-narrow">
        <Button
          color={cell.color}
          col={cell.col}
          row={cell.row}
          on:clicked={clicked}
        />
      </div>
    {/each}
  </div>
{/each}

<style>
  .columns {
    margin-bottom: -23px;
  }
  .column {
    margin-left: -15px;
  }
</style>

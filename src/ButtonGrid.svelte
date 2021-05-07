<script lang="ts">
  import Button from "./Button.svelte";
  import type { ButtonData } from "./ButtonData";
  import { calculateEndpoint } from "./endpoints";

  export let rowCount = 4;
  export let colCount = 4;

  let cells: Array<Array<ButtonData>> = [];
  for (let i = 0; i < rowCount; i++) {
    cells.push([]);
    for (let j = 0; j < colCount; j++) {
      cells[i].push({ row: i, col: j, color: "green" });
    }
  }

  async function clicked(event) {
    console.log('cells:', cells)
    let result = await (
      await fetch(calculateEndpoint, {
        method: "POST",
        body: JSON.stringify({
          cells,
          change: event.detail,
          seed: "0",
        }),
      })
    ).json();
    // await Rulebook.handle("0", cells, buttonData);
    console.log("bonusTier:", result.bonusTier);
    console.log("newCells:", result.cells);
    cells = result.cells;
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

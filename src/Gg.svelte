<script>
  import { navigate } from "svelte-routing";
  import { makeid, resetGame } from "./tools";
  import { isGameOver, score, hiScore } from "./store";

  function restart() {
    resetGame()
    navigate('/game/' + makeid(7))
  }
</script>

<div class="center" class:is-hidden={!$isGameOver}>
  <h1 class="is-size-1">Game Over</h1>
  <h3 class="is-size-3">Score: {$score}</h3>
  <h3 class="is-size-4" class:is-hidden={$score != $hiScore}><i class="fas fa-crown"></i> New record! </h3>
  <p>
      <button on:click="{restart}" class="button is-info" style="margin-top:20px">Restart!</button>
  </p>
</div>

<style type="scss">
  .center {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    top: 0;
    height: 100%;
    padding-top: 150px;
    background: rgba(255, 255, 255, 0.8);
  }
</style>

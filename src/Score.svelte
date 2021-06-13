<script lang="ts">
  import anime from "animejs/lib/anime.es.js";
  import { lastScoreChange, score, hiScore } from "./store";
  import { onMount } from "svelte";

  let scoreAddAnim: any;
  let animation: any;

  $: $score, addScore();

  onMount(() => {
    anime.set({
      targets: "#scoreAddAnim",
      opacity: 0,
    });
    animation = anime({
      targets: "#scoreAddAnim",
      autoplay: false,
      translateY: -20,
      duration: 1000,
      opacity: anime.stagger([0, 1]),
      completed: () => {
        animation.seek(0);
      },
    });
  });

  export function addScore() {
    animation?.restart();
    animation?.play();
  }
</script>

<div class="scoreWrap">
  <h1 class="is-size-2">
    Score: {$score}
    <div id="scoreAddAnim" bind:this={scoreAddAnim}>+{$lastScoreChange}</div>
    <div id="hiscore" class="is-size-6 has-text-grey-light">Best: {$hiScore}</div>
  </h1>
</div>

<style lang="scss">
  #hiscore {
        margin-top: 24px;
        margin-right: 18px;
        float: right;
  }
  .scoreWrap {
    width: 340px;
    margin-left: auto;
    margin-right: auto;
  }
  .scoreWrap > h1 {
    text-align: left;
  }
  #scoreAddAnim {
    position: absolute;
    font-size: 40;
    color: red;
    display: inline-block;
  }
</style>

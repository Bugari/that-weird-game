<script lang="ts">
  import { onMount } from "svelte";
  import { makeid } from "./tools";
  import { Router, Link, Route } from "svelte-routing";
  let seed = "";
  let customSeed = false;
  onMount(newSeed);

  function newSeed() {
    seed = makeid(7);
  }
</script>

<section class="hero hero-bg">
  <div class="hero-body">
    <p class="title">That weird game</p>
    <p class="subtitle">
      This game is weird, and rules are unclear. Dive deep, and try to
      understand.
    </p>
    <div class="form">
      <Link to={"game/" + seed}>
        <button class="button is-info" style="width:240px">Start!</button>
      </Link>
      <div
        style="text-align:right; margin-top:-5px"
        class="is-size-7"
        class:is-hidden={customSeed}
      >
        <a
          href="#"
          on:click={() => (customSeed = true)}
          class="is-primary is-inverted is-small">Custom seed?</a
        >
      </div>
      <div class="field has-addons" class:is-hidden={!customSeed}>
        <p class="control">
          <input
            class="input"
            type="text"
            placeholder="Seed"
            bind:value={seed}
          />
        </p>
        <p class="control">
          <button class="button" on:click={newSeed}>
            <span class="icon is-small">
              <i class="fas fa-redo" />
            </span>
          </button>
        </p>
      </div>
    </div>
  </div>
</section>

<style type="scss">
  .form {
    display: inline-block;
  }
  .hero-body {
    text-align: center;
    padding-top: 5%;
  }
  .subtitle {
    padding-top: 10px;
  }
</style>

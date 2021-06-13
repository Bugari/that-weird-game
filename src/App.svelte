<script lang="ts">
  import Game from './Game.svelte'
  import Home from './Home.svelte'
  import { Router, Link, Route } from "svelte-routing";
  export let url = "";
</script>

<main class="bg">
  <Router url="{url}">
    <!-- <nav>
      <Link to="/">Home</Link>
      <Link to="game/1">Game</Link>
    </nav> -->
    <div>
      <Route path="/"><Home /></Route>
      <Route path="game/:seed" component="{Game}" />
    </div>
  </Router>
</main>

<style type="scss">
  .bg {
    background: url("/double-bubble-outline.png");
    height: 100%;
  }
</style>

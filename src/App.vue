<script setup>
import Header from "./components/Header.vue";
import PointScorer from "./components/PointScorer.vue";
import GameTimer from "./components/GameTimer.vue";
</script>

<template>
  <Header />
  <div class="flex items-center justify-center gap-x-20 self-center">
    <PointScorer playerName="Jugador 1" />
    <GameTimer />
    <PointScorer playerName="Jugador 2" />
  </div>
</template>

<style>
#app {
  display: grid;
  grid-template-rows: auto 1fr;
  background-color: #064e3b;
  min-height: 100vh;
  min-height: 100svh;
  padding: 2rem;
}
</style>

<script setup>
import Header from "./components/Header.vue";
import PointScorer from "./components/PointScorer.vue";
</script>

<template>
  <Header />
  <PointScorer playerName="Jugador 1" />
  <PointScorer playerName="Jugador 2" />
</template>

<style>
#app {
  background-color: #064e3b;
  min-height: 100vh;
  min-height: 100svh;
  padding: 2rem;
}
</style>

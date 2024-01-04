<script setup>
import { ref } from "vue";

defineProps({
  playerName: String,
});

const score = ref(0);

// Define the decrementScore method
const decrementScore = () => {
  if (score.value > 0) {
    score.value--;
  }
};
</script>

<template>
  <div
    class="flex w-full max-w-[480px] flex-col items-center gap-y-8 border-4 border-emerald-700 bg-emerald-800 px-8 py-10 text-white"
  >
    <h2 class="text-4xl font-medium">{{ playerName }}</h2>

    <div class="flex w-full items-center justify-between gap-x-8">
      <button
        class="h-12 w-12 border-2 border-emerald-400 bg-emerald-600 text-3xl font-bold"
        type="button"
        @click="decrementScore"
      >
        -
      </button>

      <h2 class="text-9xl font-bold">{{ score }}</h2>

      <button
        class="h-12 w-12 border-2 border-emerald-400 bg-emerald-600 text-3xl font-bold"
        type="button"
        @click="score++"
      >
        +
      </button>
    </div>

    <div class="flex w-full justify-between">
      <button
        class="h-10 w-10 border-2 border-red-600 bg-red-700 text-xl font-medium"
        type="button"
        @click="score = 0"
      >
        C
      </button>
      <button
        class="h-10 w-10 border-2 border-emerald-400 bg-emerald-600 text-xl font-medium"
        type="button"
        @click="score += 2"
      >
        +2
      </button>
      <button
        class="h-10 w-10 border-2 border-emerald-400 bg-emerald-600 text-xl font-medium"
        type="button"
        @click="score += 3"
      >
        +3
      </button>
      <button
        class="h-10 w-10 border-2 border-emerald-400 bg-emerald-600 text-xl font-medium"
        type="button"
        @click="score += 4"
      >
        +4
      </button>
      <button
        class="h-10 w-10 border-2 border-emerald-400 bg-emerald-600 text-xl font-medium"
        type="button"
        @click="score += 5"
      >
        +5
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<template>
  <div class="game-timer flex flex-col gap-y-8 text-center text-white">
    <button
      v-if="!gameStarted"
      class="rounded-lg border-2 border-emerald-400 bg-emerald-600 px-6 py-3 text-xl font-medium transition hover:border-emerald-500 hover:bg-emerald-700"
      @click="startGame"
    >
      Start
    </button>

    <div v-if="gameStarted">
      <p class="font-medium">Hora de inicio:</p>
      <p class="font-medium">{{ startTime }}</p>
    </div>

    <h2 class="text-2xl font-bold">Tiempo / Minuto</h2>

    <div>
      <h3 class="text-xl font-bold">Tiempo promoción</h3>
      <p class="text-sm">Hasta las 2:00 PM</p>
      <p class="text-sm">minuto a ${{ promotionFare }}</p>
      <p v-if="gameStarted" class="text-base">
        {{ promotionMinutes }} minutos = ${{ promotionValue }}
      </p>
    </div>

    <div>
      <h3 class="text-xl font-bold">Tiempo normal</h3>
      <p class="text-sm">Después de las 2:00 PM</p>
      <p class="text-sm">minuto a ${{ normalFare }}</p>
      <p v-if="gameStarted" class="text-base">
        {{ normalMinutes }} minutos = ${{ normalValue }}
      </p>
    </div>

    <div v-if="gameStarted">
      <h2 class="text-2xl font-bold">Cuenta</h2>
      <p>{{ totalMinutes }} = ${{ totalPayment }}</p>
    </div>

    <button
      v-if="gameStarted"
      class="hover:red-emerald-700 rounded-lg border-2 border-red-600 bg-red-700 px-6 py-3 text-xl font-medium transition hover:bg-red-800"
      @click="endGame"
    >
      Final
    </button>
  </div>
</template>

<script>
export default {
  name: "GameTimer",
  data() {
    return {
      gameStarted: false,
      startTime: null,
      promotionFare: 80, // Change these values as needed
      normalFare: 110, // Example values; adjust as required
      promotionMinutes: 0,
      normalMinutes: 0,
      // Add other variables needed for calculations
    };
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";

      const formattedHours = hours % 12 || 12;
      const formattedMinutes = this.padZero(minutes);
      const formattedSeconds = this.padZero(seconds);

      this.startTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

      // Start a timer to update elapsed time and minutes
      this.timer = setInterval(() => {
        this.updateTimeAndMinutes();
      }, 1000); // Update every second
    },
    padZero(value) {
      return value < 10 ? "0" + value : value;
    },
    updateTimeAndMinutes() {
      if (this.startTime) {
        const now = new Date();
        const timeDiff = Math.floor((now - new Date(this.startTime)) / 1000); // Difference in seconds

        const elapsedMinutes = Math.floor(timeDiff / 60); // Calculate elapsed minutes
        const elapsedSeconds = timeDiff % 60; // Calculate remaining seconds after minutes

        if (now.getHours() < 14) {
          this.promotionMinutes = elapsedMinutes; // Promotion minutes
          this.normalMinutes = 0; // Reset normal minutes when still in promotion time
        } else {
          this.promotionMinutes = 0; // Reset promotion minutes after promotion time ends
          this.normalMinutes = elapsedMinutes; // Normal minutes after 2 o'clock
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>

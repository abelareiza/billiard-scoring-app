<template>
  <div class="game-timer flex flex-col gap-y-8 text-center text-white">
    <button
      v-if="!gameStarted"
      class="rounded-lg border-2 border-emerald-400 bg-emerald-600 px-6 py-3 text-xl font-medium transition hover:border-emerald-500 hover:bg-emerald-700"
      @click="startGame"
    >
      Inicio
    </button>

    <div v-if="gameStarted">
      <p class="font-medium">Hora de inicio:</p>
      <p class="font-medium">{{ formattedStartTime }}</p>
    </div>

    <h2 v-if="!gameStarted" class="text-2xl font-bold">Tiempo / Minuto</h2>

    <div>
      <h3 class="text-xl font-bold">Tiempo promoción</h3>
      <p class="text-sm">Hasta las {{ formattedPromotionHour }}</p>
      <p class="text-sm">
        minuto a
        <span class="text-base font-bold text-emerald-400"
          >${{ promotionFare }}</span
        >
      </p>
      <p v-if="gameStarted" class="text-base">
        {{ promotionMinutes }} minutos = ${{ promotionValue }}
      </p>
    </div>

    <div>
      <h3 class="text-xl font-bold">Tiempo normal</h3>
      <p class="text-sm">Después de las {{ formattedPromotionHour }}</p>
      <p class="text-sm">
        minuto a
        <span class="text-base font-bold text-emerald-400"
          >${{ normalFare }}</span
        >
      </p>
      <p v-if="gameStarted" class="text-base">
        {{ normalMinutes }} minutos = ${{ normalValue }}
      </p>
    </div>

    <div v-if="gameStarted">
      <h2 class="text-2xl font-bold">Cuenta</h2>
      <p>{{ totalMinutes }} minutos = ${{ totalPayment }}</p>
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
      promoHourStart: 1,
      promoMinutesStart: 32,
      promoTime: null,
      formattedPromotionHour: null,
      startTime: null,
      formattedStartTime: null,
      promotionFare: 80, // Change these values as needed
      normalFare: 110, // Example values; adjust as required
      promotionMinutes: 0,
      normalMinutes: 0,
      promotionValue: 0,
      normalValue: 0,
      totalMinutes: 0,
      totalPayment: 0,
    };
  },
  mounted() {
    this.formatPromotionHour();
  },
  methods: {
    formatPromotionHour() {
      const promoHour = new Date();

      promoHour.setHours(this.promoHourStart);
      promoHour.setMinutes(this.promoMinutesStart);
      this.promoTime = promoHour;

      const hours = promoHour.getHours();
      const minutes = promoHour.getMinutes();
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = this.padZero(minutes);
      const ampm = hours >= 12 ? "PM" : "AM";

      this.formattedPromotionHour = `${formattedHours}:${formattedMinutes} ${ampm}`;
    },
    startGame() {
      const now = new Date();

      this.gameStarted = true;
      this.startTime = now;

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = this.padZero(minutes);
      const formattedSeconds = this.padZero(seconds);

      this.formattedStartTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

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
        const differenceInMillis = now.getTime() - this.startTime.getTime();
        const differenceInMinutes = Math.round(
          differenceInMillis / (1000 * 60),
        );

        if (now.getTime() <= this.promoTime.getTime()) {
          this.promotionMinutes = differenceInMinutes;
          this.promotionValue = this.promotionMinutes * this.promotionFare;
        } else {
          this.normalMinutes = differenceInMinutes - this.promotionMinutes;
          this.normalValue = this.normalMinutes * this.normalFare;
        }

        this.totalMinutes = this.promotionMinutes + this.normalMinutes;
        this.totalPayment = this.promotionValue + this.normalValue;
      }
    },
  },
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>

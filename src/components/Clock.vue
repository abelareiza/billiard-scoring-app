<template>
  <div class="flex flex-col gap-y-3 text-white">
    <p>Fecha: {{ currentDate }}</p>
    <p>Hora actual: {{ currentTime }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: "",
      currentTime: "",
    };
  },
  created() {
    this.updateTime();
    // Update time every second (1000 milliseconds)
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";

      // Convert hours to 12-hour format
      const formattedHours = hours % 12 || 12;

      // Pad days, minutes and seconds with leading zeros if needed
      const formattedDay = this.padZero(day);
      const formattedMonth = this.padZero(month + 1);
      const formattedMinutes = this.padZero(minutes);
      const formattedSeconds = this.padZero(seconds);

      // Construct the time string in the desired format
      this.currentTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
      this.currentDate = `${formattedDay}/${formattedMonth}/${year}`;
    },
    padZero(value) {
      return value < 10 ? "0" + value : value;
    },
  },
};
</script>

<template>
  <div>
    <button
      class="rounded-lg border-2 border-gray-500 bg-gray-600 px-6 py-1 text-lg text-white"
      @click="openModal"
    >
      Tarifas
    </button>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="w-1/2 rounded-lg bg-zinc-100 p-8">
        <span
          @click="closeModal"
          class="absolute right-0 top-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-600 text-2xl font-bold leading-none text-gray-800"
          >&times;</span
        >
        <!-- Modal content -->
        <div class="modal-content">
          <!-- Your modal content goes here -->

          <header class="flex items-center justify-between">
            <h2 class="text-2xl font-bold">Tarifas</h2>
            <!-- Promotion toggle -->
            <label class="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                value=""
                class="peer sr-only"
                :checked="getPromotion.active"
                @change="togglePromotion"
              />
              <div
                class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"
              ></div>
              <span class="font-regular ms-2 text-base text-gray-800"
                >Activar promoción</span
              >
            </label>
          </header>

          <!-- Promotion time picker -->
          <div
            v-if="getPromotion.active"
            class="flex flex-col items-center pt-8"
          >
            <h2 class="mb-2 text-center text-lg font-medium">
              Horario promoción:
            </h2>
            <div class="w-40 rounded-lg bg-white p-5 shadow-lg">
              <div class="flex">
                <select
                  ref="hours"
                  name="hours"
                  class="appearance-none bg-transparent text-xl outline-none"
                  :value="formatHour(promoStartHour.hour)"
                  @change="updatePromoStartHour"
                >
                  <option v-for="index in 12" :key="index" :value="index">
                    {{ index }}
                  </option>
                </select>
                <span class="mr-3 text-xl">:</span>
                <select
                  ref="minutes"
                  name="minutes"
                  class="mr-4 appearance-none bg-transparent text-xl outline-none"
                  v-model="promoStartHour.minutes"
                  @change="updatePromoStartHour"
                >
                  <option value="0">00</option>
                  <option value="30">30</option>
                </select>
                <select
                  ref="ampm"
                  name="ampm"
                  class="appearance-none bg-transparent text-xl outline-none"
                  @change="updatePromoStartHour"
                >
                  <option value="am" :selected="promoStartHour.hour < 12">
                    AM
                  </option>
                  <option value="pm" :selected="promoStartHour.hour >= 12">
                    PM
                  </option>
                </select>
              </div>
            </div>
          </div>

          <ul v-if="getPromotion.active" class="grid grid-cols-2 gap-8 py-8">
            <li
              v-for="fare in fares"
              :key="fare.id"
              class="mb-4 flex flex-col gap-y-2 text-lg font-medium"
            >
              {{ fare.title }}: ${{ fare.fare }}
              <input
                class="rounded-md bg-white px-4 py-2 shadow-lg"
                type="number"
                v-model="editedFares[fare.id]"
                @change="updateFare(fare.id)"
              />
            </li>
          </ul>

          <ul v-if="!getPromotion.active" class="grid grid-cols-2 gap-8 py-8">
            <li class="mb-4 flex flex-col gap-y-2 text-lg font-medium">
              {{ getAllFares[1].title }}: ${{ getAllFares[1].fare }}
              <input
                class="rounded-md bg-white px-4 py-2 shadow-lg"
                type="number"
                v-model="editedFares[getAllFares[1].id]"
                @change="updateFare(getAllFares[1].id)"
              />
            </li>
          </ul>

          <button
            class="hover:red-emerald-700 mx-auto block rounded-lg border-2 border-blue-500 bg-blue-600 px-6 py-1 text-lg text-white transition hover:bg-blue-700"
            @click="closeModal"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Fares",
  data() {
    return {
      showModal: false,
      editedFares: {}, // Store edited values temporarily
    };
  },
  computed: {
    ...mapGetters(["getAllFares", "getPromotion", "getPromoStartHour"]),
    fares() {
      return this.getAllFares; // Accessing the getter
    },
    promoStartHour: {
      get() {
        return this.getPromoStartHour;
      },
      set(value) {
        this.setPromoStartHour(value);
      },
    },
  },
  methods: {
    ...mapMutations(["setFares", "setPromotion", "setPromoStartHour"]),
    openModal() {
      this.showModal = true;
      // Create a copy of fares to edit temporarily
      this.editedFares = JSON.parse(JSON.stringify(this.getAllFares));
    },
    closeModal() {
      this.showModal = false;
      this.editedFares = {}; // Reset edited values on modal close
    },
    updateFare(fareId) {
      const updatedFare = this.editedFares.find((fare) => fare.id === fareId);
      const newFares = this.getAllFares.map((fare) => {
        if (fare.id === fareId) {
          return { ...fare, fare: this.editedFares[fareId] };
        }
        return fare;
      });
      this.setFares(newFares); // Update Vuex store with new fares
    },
    togglePromotion() {
      const newActiveState = !this.getPromotion.active;
      this.setPromotion({ active: newActiveState });
    },
    updatePromoStartHour() {
      const hours = parseInt(this.$refs.hours.value);
      const minutes = parseInt(this.$refs.minutes.value);
      const amPm = this.$refs.ampm.value;

      // If PM is selected, add 12 to the hours (except for 12 PM)
      let newHour = amPm === "pm" && hours !== 12 ? hours + 12 : hours;

      // Handle special case: 12 AM (midnight)
      if (amPm === "am" && hours === 12) {
        newHour = 0;
      }

      this.setPromoStartHour({ hour: newHour, minutes });
    },
    formatHour(hour) {
      // Helper method to format the displayed hour
      return hour > 12 ? hour % 12 || 12 : hour;
    },
  },
};
</script>

<style></style>

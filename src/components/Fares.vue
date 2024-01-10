<template>
  <div>
    <button
      class="rounded-lg border-2 border-gray-400 bg-gray-500 px-4 py-2 text-lg font-medium text-white"
      @click="openModal"
    >
      Tarifas
    </button>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="w-1/2 rounded-lg bg-white p-6">
        <span
          @click="closeModal"
          class="absolute right-0 top-0 cursor-pointer p-4 text-xl"
          >&times;</span
        >
        <!-- Modal content -->
        <div class="modal-content">
          <!-- Your modal content goes here -->

          <header class="mb-6 flex items-center justify-between">
            <h1 class="text-2xl font-bold">Tarifas</h1>
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

          <ul v-if="getPromotion.active">
            <li
              v-for="fare in fares"
              :key="fare.id"
              class="mb-4 flex flex-col gap-y-2"
            >
              {{ fare.title }}: ${{ fare.fare }}
              <input
                class="w-40 rounded-lg border border-gray-800 px-2 py-1"
                type="number"
                v-model="editedFares[fare.id]"
                @change="updateFare(fare.id)"
              />
            </li>
          </ul>

          <ul v-if="!getPromotion.active">
            <li class="mb-4 flex flex-col gap-y-2">
              {{ getAllFares[1].title }}: ${{ getAllFares[1].fare }}
              <input
                class="w-40 rounded-lg border border-gray-800 px-2 py-1"
                type="number"
                v-model="editedFares[getAllFares[1].id]"
                @change="updateFare(getAllFares[1].id)"
              />
            </li>
          </ul>
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
    ...mapGetters(["getAllFares", "getPromotion"]), // Assuming 'fares' is the module name
    fares() {
      return this.getAllFares; // Accessing the getter
    },
  },
  methods: {
    ...mapMutations(["setFares", "setPromotion"]),
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
  },
};
</script>

<style></style>

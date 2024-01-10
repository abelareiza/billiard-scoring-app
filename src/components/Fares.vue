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
          <h1 class="mb-3 text-2xl font-bold">Tarifas</h1>
          <ul>
            <li v-for="fare in fares" :key="fare.id">
              {{ fare.title }}: ${{ fare.fare }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Fares",
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapGetters(["getAllFares"]), // Assuming 'fares' is the module name
    fares() {
      return this.getAllFares; // Accessing the getter
    },
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style></style>

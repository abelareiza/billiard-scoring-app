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
          <p>This is your modal content!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
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

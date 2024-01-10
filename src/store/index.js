import Vuex from "vuex";
import { createApp } from "vue";
import Fares from "./modules/fares";

// Load Vuex
createApp().use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    Fares,
  },
});

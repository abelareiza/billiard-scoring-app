const state = {
  fares: [
    {
      id: 1,
      title: "Tarifa promocion",
      fare: 80,
    },
    {
      id: 2,
      title: "Tarifa normal",
      fare: 110,
    },
  ],
  promotion: {
    active: true,
  },
  promoStartHour: {
    hour: 11,
    minutes: 30,
  },
};

const getters = {
  getAllFares: (state) => state.fares,
  getPromotion: (state) => state.promotion,
  getPromoStartHour: (state) => state.promoStartHour,
};

const actions = {};

const mutations = {
  setFares: (state, fares) => (state.fares = fares),
  setPromotion: (state, fares) => (state.fares = fares),  
  setPromoStartHour: (state, fares) => (state.fares = fares),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

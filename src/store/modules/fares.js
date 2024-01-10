const state = {
  fares: [
    {
      id: 0,
      title: "Tarifa promoción",
      fare: 80,
    },
    {
      id: 1,
      title: "Tarifa normal",
      fare: 110,
    },
  ],
  promotion: {
    active: true,
  },
  promoStartHour: {
    hour: 15,
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
  setPromotion: (state, promotion) => (state.promotion = promotion),
  setPromoStartHour: (state, promoStartHour) =>
    (state.promoStartHour = promoStartHour),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

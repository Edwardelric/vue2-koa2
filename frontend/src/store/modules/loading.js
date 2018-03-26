export default {
  state: {
    isLoading: false
  },
  getters: {
    getLoadingState(state) {
      return state.isLoading;
    }
  },
  mutations: {
    showLoading(state) {
      state.isLoading = true;
    },
    hideLoading(state) {
      state.isLoading = false;
    }
  },
  actions: {
    showLoading({commit}) {
      commit('showLoading');
    },
    hideLoading({commit}) {
      setTimeout(() => {
        commit('hideLoading');
      }, 600);
    }
  }
};

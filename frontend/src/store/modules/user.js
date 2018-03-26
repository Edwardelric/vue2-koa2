export default {
  state: {
    data: {}
  },
  getters: {
    getUser(state) {
      return state.data;
    }
  },
  mutations: {
    setUser(state, args) {
      state.data = args;
    },
    removeUser(state) {
      state.data = {};
    }
  },
  actions: {
    setUser({commit}, args) {
      commit('setUser', args);
    },
    removeUser({commit}) {
      commit('removeUser');
    }
  }
}

import Vue from 'vue'

import Vuex from './kvuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state, n=1) {
            state.count += n;
        }
    },
    actions: {
        incrementAsync({commit}) {
            setTimeout(() => {
                console.log(this);
                commit('increment', 2);
            }, 2000);
        }
    }
})


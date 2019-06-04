import Vue from 'vue'

import Vuex from './kvuex.js'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        increment(state, n = 1) {
            state.count += n;
        }
    },
    getters: {
        killCount(state){
            return state.count * 2
        }
    },
    actions: {
        incrementAsync({commit}) {
            setTimeout(() => {
                commit('increment', 2);
            }, 2000);
        }
    }
})

// Vue.use(Vuex);

// export default new Vuex.Store({
//     state: {
//         count: 0
//     },
//     mutations: {
//         increment(state, n=1) {
//             state.count += n;
//         }
//     },
//     actions: {
//         incrementAsync({commit}) {
//             setTimeout(() => {
//                 console.log(this);
//                 commit('increment', 2);
//             }, 2000);
//         }
//     }
// })
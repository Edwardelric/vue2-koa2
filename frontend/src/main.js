import Vue from 'vue'
import store from './store'
import kstore from './testComponents/store.js';
import ajax from './utils/http'
import App from './App'
import router from './router'
import Notice from '../src/testComponents/notice/notice';

// import('./utils/util').then((...args) => {
//     console.log(args);
// })

Vue.use(ajax);

// Vue.component('anchored-heading', {
//     render(h) {
//         return h('h' + this.level, this.$slots.default);
//     },
//     props: {
//         level: {
//             type: Number,
//             required: true
//         }
//     }
// })

Vue.prototype.$Notice = Notice;
Vue.prototype.$dispatch = function(eventName, data) {
    let parent = this.$parent;
    while (parent) {
        parent.$emit(eventName, data);
        parent = parent.$parent;
        console.log(parent);
    }
}

Vue.prototype.$boardcast = function(eventName, data) {
    boardcast.call(this, eventName, data);
}
function boardcast(eventName, data) {
    this.$children.forEach(child => {
        child.$emit(eventName, data) ;
        if (child.$children.length) {
            boardcast.call(child, eventName, data);
        }
    })
}

class Bus {
    constructor() {
        this.callbacks = {};
    }
    $on(name, fn) {
        this.callbacks[name] = this.callbacks[name] || [];
        this.callbacks[name].push(fn);
    }
    $emit(name, args) {
        if (this.callbacks[name]) {
            this.callbacks[name].forEach(cb => cb(args));
        }
    }
}
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    kstore,
    components: {
        App
    },
    template: '<App/>'
})

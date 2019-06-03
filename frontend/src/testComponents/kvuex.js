import Vue from "vue";

class Store {
    constructor(options = {}) {
        this.name = 'edward-vuex';
        this.state = new Vue({
            data: options.state    
        })
        this.mutations = options.mutations || [];
        this.actions = options.actions || [];
    }
    commit(type, arg) {
        this.mutations[type](this.state, arg);
    }
    dispatch(type, arg) {
        this.actions[type]({
            commit: this.commit.bind(this),
            state: this.state
        }, arg)
    }
}

function install(_Vue) {
    Vue.mixin({
        beforeCreate() {
            if (this.$options.kstore) {
                Vue.prototype.$kstore = this.$options.kstore;
            }
        }
    })
}

export default {Store, install}
import Vue from "vue";

class Store {
    constructor(options = {}) {
        this.name = 'edward-vuex';
        this.state = new Vue({
            data: options.state    
        })
        this.mutations = options.mutations || [];
        this.actions = options.actions || [];
        this.handleGetters(options.getters);
    }
    handleGetters(getters) {
        this.getters = {}
        Object.keys(getters).forEach(key=>{
            Object.defineProperty(this.getters,key,{
                get:()=>{
                    return getters[key](this.state)
                }
            })
        })
    }
    commit(type, arg) {
        this.mutations[type](this.state, arg);
    }
    dispatch(type, arg) {
        console.log(this)
        this.actions[type]({
            commit: this.commit.bind(this),                // 当前对象this问题
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
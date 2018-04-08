// let a = require("./page/str.js");
// import Vue from "vue";
//
// document.write(a);


import Vue from 'vue'
// import store from "./store"
// import ajax from "./utils/http"
import App from './App.vue'
// import router from './router'

// import("./utils/util").then((...args) => {
// 	console.log(args);
// })
//
// Vue.use(ajax)

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	components: { App },
	template: '<App/>'
})



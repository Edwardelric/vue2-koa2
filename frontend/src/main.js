import Vue from 'vue'
import store from "./store"
import ajax from "./utils/http"
import App from './App'
import router from './router'

Vue.use(ajax)

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})



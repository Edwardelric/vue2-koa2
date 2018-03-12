import Vue from "vue"
import Router from "vue-router"

import Home from "@/pages/home";
import Address from "@/pages/address";
import newAddress from "@/pages/newAddress";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/address",
      name: "Address",
      component: Address
    },
    {
      path: "/newAddress",
      name: "newAddress",
      component: newAddress
    }
  ]
})

import Vue from "vue"
import Router from "vue-router"

import Home from "@/pages/home";
import Transition from "@/pages/transition";
import Address from "@/pages/address";

Vue.use(Router)

const routes =  [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "首页",
      stage: 1
    },
    component: Home
  },
  {
    path: "/transition",
    name: "transition",
    meta: {
      title: "转场动画效果",
      stage: 2
    },
    component: Transition
  },
  {
    path: "/address",
    name: "Address",
    meta: {
      title: "三级联动动画效果",
      stage: 3
    },
    component: Address
  }
];

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : "首页";
  next();
});

export default router;


import Vue from "vue"
import Router from "vue-router"

import Home from "@/pages/home";
import Transition from "@/pages/transition/index";
import SwitchBtn from "@/pages/transition/switchBtn";

import ComponentsLists from "@/pages/componentsLists/index";
import newAddress from "@/pages/componentsLists/newAddress";
import Lottery from "@/pages/componentsLists/Lottery";
import Dropload from "@/pages/componentsLists/dropload";

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
    path: "/transition/switchBtn",
    name: "switchBtn",
    meta: {
      title: "转场动画效果-switch开关",
      stage: 3
    },
    component: SwitchBtn
  },
  {
    path: "/componentslists",
    name: "componentsLists",
    meta: {
      title: "components组件集合",
      stage: 2
    },
    component: ComponentsLists
  },
  {
    path: "/componentslists/newAddress",
    name: "newAddress",
    meta: {
      title: "三级联动动画效果",
      stage: 3
    },
    component: newAddress
  },
  {
    path: "/componentslists/lottery",
    name: "lottery",
    meta: {
      title: "转盘抽奖活动",
      stage: 3
    },
    component: Lottery
  },
  {
    path: "/componentslists/dropload",
    name: "dropload",
    meta: {
      title: "上拉下拉加载更多",
      stage: 3
    },
    component: Dropload
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


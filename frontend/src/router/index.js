import Vue from "vue"
import Router from "vue-router"

import Home from "@/pages/home";
import Info from "@/pages/info";


import Transition from "@/pages/transition/index";
import SwitchBtn from "@/pages/transition/switchBtn";

import ComponentsLists from "@/pages/componentsLists/index";
import PickerRegions from "@/pages/componentsLists/pickerRegions";
import Lottery from "@/pages/componentsLists/Lottery";
import Loadmore from "@/pages/componentsLists/loadmore";


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
    path: "/info",
    name: "Info",
    meta: {
      title: "我",
      state: 1
    },
    component: Info
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
    path: "/componentslists/pickerRegions",
    name: "pickerRegions",
    meta: {
      title: "三级联动动画效果",
      stage: 3
    },
    component: PickerRegions
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
    path: "/componentslists/loadmore",
    name: "loadmore",
    meta: {
      title: "上拉下拉加载更多",
      stage: 3
    },
    component: Loadmore
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


import Vue from "vue"
import Router from "vue-router"

import Home from "@/pages/home";
import Discover from "@/pages/discover";
import Info from "@/pages/info";
import Search from "@/pages/search";
import Tips from "@/pages/tips";
import Ui from "@/pages/ui";

import SwitchBtn from "@/pages/lib/transition/switchBtn";

import PickerRegions from "@/pages/lib/components/pickerRegions";
import Lottery from "@/pages/lib/components/Lottery";
import Loadmore from "@/pages/lib/components/loadmore";
import Tab from "@/pages/lib/components/tab";
import Swiper from "@/pages/lib/components/swiper";
import NoticeBar from "@/pages/lib/components/noticeBar";


Vue.use(Router)

const routes =  [
  {
    path: "/",
    name: "home",
    meta: {
      title: "首页",
      stage: 1
    },
    component: Home
  },
  {
    path: "/discover",
    name: "discover",
    meta: {
      title: "发现",
      state: 1
    },
    component: Discover
  },
  {
    path: "/ui",
    name: "ui",
    meta: {
      title: "ui",
      state: 1
    },
    component: Ui
  },
  {
    path: "/tips",
    namme: "tips",
    meta: {
      title: "tips",
      state: 1
    },
    component: Tips
  },
  {
    path: "/info",
    name: "info",
    meta: {
      title: "我",
      state: 1
    },
    component: Info
  },
  {
    path: "/search",
    name: "search",
    meta: {
      title: "搜索",
      state: 2
    },
    component: Search
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
  },
  {
    path: "/componentslists/tab",
    name: "tab",
    meta: {
      title: "tab",
      stage: 3
    },
    component: Tab
  },
  {
    path: "/componentslists/swiper",
    name: "swiper",
    meta: {
      title: "swiper",
      stage: 3
    },
    component: Swiper
  },
  {
    path: "/componentslists/noticeBar",
    name: "NoticeBar",
    meta: {
      title: "swiper",
      stage: 3
    },
    component: NoticeBar
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


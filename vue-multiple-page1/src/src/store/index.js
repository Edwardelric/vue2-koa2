import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import loading from "./modules/loading";
import subNavMenu from "./modules/subNavMenu";
import footerMenu from "./modules/footerMenu";
import infoList from "./modules/infoList";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    loading,
    subNavMenu,
    footerMenu,
    infoList
  }
})

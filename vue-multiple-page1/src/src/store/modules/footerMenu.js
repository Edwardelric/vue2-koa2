const footerMenu = [
  {
    url: "",
    txt: "首页",
    imgUrl: "../../static/home.png",
    selectedUrl: "../../static/home-active.png"
  },
  {
    url: "discover",
    txt: "发现",
    imgUrl: "../../static/discover.png",
    selectedUrl: "../../static/discover-active.png"
  },
  {
    url: "ui",
    txt: "ui库",
    imgUrl: "../../static/ui.png",
    selectedUrl: "../../static/ui-active.png"
  },
  {
    url: "info",
    txt: "我",
    imgUrl: "../../static/info.png",
    selectedUrl: "../../static/info-active.png"
  }
];

export default {
  state: {
    footerMenu
  },
  getters: {
    getFooterMenu(state) {
      return state.footerMenu;
    }
  }
};

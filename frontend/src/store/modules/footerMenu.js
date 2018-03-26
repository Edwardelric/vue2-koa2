const footerMenu = [
  {
    url: "",
    txt: "首页",
    imgUrl: "../../static/home.png",
    selectedUrl: "../../static/home-active.png"
  },
  {
    url: "category",
    txt: "分类",
    imgUrl: "../../static/category.png",
    selectedUrl: "../../static/category-active.png"
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

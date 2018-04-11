const subNavMenu = [
  {
    url: "",
    txt: "学习专区",
    className: "icon-shenfenzheng"
  },
  {
    url: "category",
    txt: "示例",
    className: "icon-fenxiang"
  },
  {
    url: "ui",
    txt: "学习专区",
    className: "icon-saoyisao"
  },
  {
    url: "info",
    txt: "demo",
    className: "icon-shouye"
  }
];

export default {
  state: {
    subNavMenu
  },
  getters: {
    getSubNavMenu(state) {
      return state.subNavMenu;
    }
  }
};

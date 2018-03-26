const infoList = [
  {
    url: "",
    txt: "绑定手机号",
    className: "icon-fenxiang"
  },
  {
    url: "ui",
    txt: "全部订单",
    className: "icon-fenxiang"
  },
  {
    url: "jifeng",
    txt: "积分",
    className: "icon-fenxiang"
  },
  {
    url: "step",
    txt: "足迹",
    className: "icon-fenxiang"
  }
];

export default {
  state: {
    infoList
  },
  getters: {
    getInfoList(state) {
      return state.infoList;
    }
  }
};

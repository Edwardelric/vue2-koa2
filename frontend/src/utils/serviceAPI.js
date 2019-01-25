const LOCALURL = 'http://localhost:3000';

let URL = {
  getGoodsList: `${LOCALURL}/goods/getGoodsList`,    // 首页商品数据
  register:  `${LOCALURL}/user/register`,            // 用户注册
  login: `${LOCALURL}/user/login`,                   // 用户登录
  getDetailGoodsInfo: `${LOCALURL}/goods/getDetailGoodsInfo`, // 获取商品详细信息
};

exports.URL = URL;

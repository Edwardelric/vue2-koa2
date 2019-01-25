<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
      <div class="topimg-div">
        <img :src="goodsInfo.IMAGE1" width="100%"/>
      </div>
      <div class="goods-name">{{goodsInfo.NAME}}</div>
      <div class="goods-price">价格 ：￥{{goodsInfo.PRESENT_PRICE}}元</div>
      <div>
        <van-tabs swipeable sticky>
          <van-tab title="商品详情">
            <div class="detail" v-html="goodsInfo.DETAIL"></div>
          </van-tab>
          <van-tab title="评论">
            评论制作中
          </van-tab>
        </van-tabs>
      </div>

      <div class="goods-bottom">
        <div>
          <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
        </div>
        <div>
          <van-button size="large" type="danger">直接购买</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { URL } from '@/utils/serviceAPI.js';
  import { Toast } from 'vant';

  export default {
    data() {
      return {
        goodId: '',
        goodsInfo: {}
      }
    },
    created() {
      this.goodId = this.$route.query.goodId ?this.$route.query.goodId : this.$route.params.goodId;
      this.goodId = this.goodId || '0373698d833c4e149afa2807d006c7ae';
      this.getInfo();
    },
    methods: {
      getInfo() {
        console.log(this.goodId);
        this.$ajax.post(URL.getDetailGoodsInfo, {
          ID: this.goodId
        }).then(res => {
          if (!res.errorCode) {
            this.goodsInfo = res.result;
          } else {
            Toast.fail('获取商品数据失败');
          }
        }).catch(err => {
          Toast.fail('获取商品数据失败');
        });
      },
      onClickLeft() {
        this.$router.go(-1);
      },
      addGoodsToCart() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/_mixins";
  .goods-name{
    background: $white;
    font-size: rem(14);
    text-align: center;
  }
  .goods-price{
    padding: rem(10) 0;
    background: $white;
    font-size: rem(14);
    text-align: center;
  }
  .detail {
    font-size: 0;
  }
  .goods-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: $white;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
  }
  .goods-bottom > div {
    flex: 1;
    padding: rem(5);
  }
</style>


<template>
  <ul class="goods-wrapper">
    <li v-for="(item, index) in goodsList" :key="index" class="goods" @click="gotoDetail(item.ID)">
      <div class="goods-img">
        <img :src="item.IMAGE1"/>
      </div>
      <p class="goods-title">{{item.NAME}}}</p>
      <div class="flex goods-price">
        <p>￥{{item.ORI_PRICE}}</p>
        <p>看相似</p>
      </div>
      <div class="flex goods-detail">
        <div class="desc">
          <p>最近使用新人红包后</p>
          <p>￥{{item.PRESENT_PRICE}}</p>
        </div>
        <van-icon name="play" />
      </div>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  import {URL} from '@/utils/serviceAPI.js';
  import {Toast} from 'vant';

	export default {
		data() {
			return {
			  goodsList: []
      };
		},
    methods: {
      gotoDetail(goodId) {
        this.$router.push({name: 'Goods', params: {goodId}})
      }
    },
    mounted() {
      this.$ajax.post(URL.getGoodsList).then(res => {
        if (!res.errorCode) {
          this.goodsList = res.result;
        } else {
          Toast.fail('获取商品数据失败');
        }
      }).catch(err => {
        Toast.fail('获取商品数据失败');
      });
    }
	};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/_mixins";

  .goods-wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin: rem(10) rem(16);
    .goods {
      flex: 0 0 rem(164);
      margin-bottom: rem(10);
      border: 1px solid rgb(237, 237, 237);
      .goods-img {
        height: rem(168);
        margin-bottom: rem(8);
        border-bottom: 1px solid rgba(0, 0, 0, 0.03);
        text-align: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goods-title{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding: 0 rem(10);
        color: rgb(62, 62, 62);
        font-size: 14px;
        line-height: rem(18);
      }
      .goods-price {
        padding: rem(6);
        color: $danger;
        font-size: rem(16);
        p:last-of-type {
          padding: rem(4) rem(9);
          border-radius: rem(10);
          background: rgb(255, 230, 235);
          font-size: rem(12);
          line-height: rem(10);
        }
      }
      .goods-detail {
        padding: rem(6) rem(10);
        background: $danger;
        color: $white;
        line-height: rem(20);
        .desc {
          p:last-of-type {
            font-size: rem(14);
          }
        }
        i:last-child {
          font-size: rem(24);
        }
      }
    }
  }

</style>

<template>
  <div class="home">
    <van-row class="header" type="flex" align="center">
      <van-col span="3">
        <van-icon name="bars" size="26px"></van-icon>
      </van-col>
      <van-col span="18">
        <van-search placeholder="请输入搜索关键词" v-model="value" background="#FF4040"/>
      </van-col>
      <van-col span="3" class="login">
        <router-link to="/login">登录</router-link>
      </van-col>
    </van-row>
    <SubNav></SubNav>
    <SwiperComponent></SwiperComponent>
    <GoodsComponent></GoodsComponent>
  </div>
</template>

<script type="text/ecmascript-6">
  import SubNav from '@/components/SubNav';
  import SwiperComponent from '@/components/SwiperComponent';
  import GoodsComponent from '@/components/GoodsComponent';

	export default {
		data() {
			return {
        value: ''
      };
		},
    components: {
      SubNav,
      SwiperComponent,
      GoodsComponent
    },
    mounted() {
    },
    methods: {
    }
	};
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/_mixins";
  .header {
    height: rem(58);
    padding: 0  rem(16);
    background: $danger;
    color: $white;
    font-size: 14px;
    .van-search {
      padding: 0;
      background: $danger;
    }
    .login {
      text-align: right;
      a {
        color: #fff;
      }
    }
  }
</style>

<template>
    <div class="home-wrapper">
      <div class="header">
        <div class="swiper">
          <img src="../assets/images/home/home.jpeg" />
        </div>
        <div class="search" @click="navigatorTo">
          <i class="iconfont icon-search"></i>
          搜索内容
        </div>
      </div>
      <SubNav></SubNav>
      <div class="panel">
        <div class="panel-header">
          <p>热点文章</p>
        </div>
      </div>
      <Panel></Panel>
    </div>
</template>

<script type="text/ecmascript-6">
  import SubNav from "./menu/subnav";
  import Panel from "../components/panel";
  import axios from "axios";

	export default {
		data() {
			return {};
		},
    created() {
		  sessionStorage.setItem("token", "edwardelric");
		  this.$ajax.get("/api/string",{"name": "dad"}).then(res => {
        console.log(res);
      })
    },
    methods: {
      navigatorTo() {
        this.$router.push({
          path: `/search`
        });
      }
    },
    components: {
		  SubNav,
      Panel
    }
	};
</script>

<style lang="scss">
  @import "../assets/scss/_mixins";
  .header {
    position: relative;
    .swiper {
      height: rem(200);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .search {
      position: absolute;
      top: 10px;
      left: 0;
      width: 80%;
      margin: 0 10%;
      height: rem(28);
      border: 1px solid $white;
      border-radius: 10px;
      color: $white;
      line-height: rem(28);
      i {
        padding: 0 rem(8);
        vertical-align: middle;
      }
      input {
        color: $white;
      }
    }
  }
</style>

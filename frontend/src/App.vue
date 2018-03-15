<template>
  <div id="app">
    <div class="back" @click="$router.go(-1);">返回首页</div>
    <div class="container">
      <transition :name="transitionName">
        <keep-alive>
          <router-view class="child-view"/>
        </keep-alive>
      </transition>
    </div>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Footer from "./components/Footer";
  export default {
    name: 'App',
    data() {
      return {
        transitionName: ""
      }
    },
    components: {
      "Footer": Footer
    },
    watch: {
      $route(val, oldVal) {
        if (oldVal.meta.stage > val.meta.stage) {
          // 上一页
          this.transitionName = "slide-right";
        } else {
          // 下一页
          this.transitionName = "slide-left";
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./assets/scss/common";
  html, body {
    height: 100%;
  }
  #app {
    height: 100%;
  }
  .back {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: rem(30);
    padding: 0 rem(10);
    background: #ccc;
    font-size: rem(12);
    line-height: rem(30);
  }
  .container {
    height: 100%;
  }
  .child-view{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    padding-top: rem(50);
    transition: all .4s;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
     -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
     -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }
</style>


<template>
  <div id="app">
    <div class="container">
      <transition :name="transitionName">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <!--<Footer></Footer>-->
  </div>
</template>

<script type="text/ecmascript-6">
//  import Footer from "./pages/menu/Footer";

  export default {
    name: 'App',
    data() {
      return {
        transitionName: ""
      }
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
  html, body {
    height: 100%;
  }
  #app {
    height: 100%;
  }
  .container {
    height: 92vh;
    overflow-y: auto;
    background: $gray;
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


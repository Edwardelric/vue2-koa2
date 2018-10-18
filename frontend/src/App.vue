<template>
  <div id="app">
    <div class="container">
      <transition :name="transitionName">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Footer from "./pages/menu/Footer";

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
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
  }
  .container {
    flex: 1 0 0;
    padding-bottom: 10px;
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


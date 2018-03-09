<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Footer from "./components/Footer";
  export default {
    name: 'App',
    components: {
      "Footer": Footer
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
  .container {
    height: 100%;
    padding-bottom: rem(30);
  }
</style>

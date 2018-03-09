<template>
    <div id="example-2">
      <p class="btn"><router-link to="/">跳转到首页</router-link></p>
      <p class="btn"><router-link to="/address">跳转到地区</router-link></p>
      <button @click="show = !show">
        Toggle render
      </button>
      <!--<transition name="slide-fade">-->
        <!--<p class="btn btns" v-if="show" key="a">on</p>-->
        <!--<p class="btn btns" v-if="!show" key="b">off</p>-->
      <!--</transition>-->
      <transition name="slide-switch">
        <p class="btn btn2" v-if="show" key="a">on</p>
        <p class="btn btn2" v-if="!show" key="b">off</p>
      </transition>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
			  show: true
      };
		},
    methods: {

    }
	};
</script>

<style lang="scss">
  #example-2 {
    transition: all .4s ease;
    .btns {
      position: absolute;
      top: 120px;
      left: 0;
      width: 100%;
    }
    .btn2 {
      position: absolute;
      right: 0;
      width: 20%;
    }
  }

  .slide-fade-leave-active, .slide-fade-enter-active{
    transition: all .8s ease;
  }
  .slide-fade-leave-to {
    opacity: 0;
    transform: translate(-100%, 0);
  }
  .slide-fade-enter {
    opacity: 0;
    transform: translate(100%, 0);
  }

  .slide-switch-leave-active, .slide-switch-enter-active {
    transition: all .8s ease;
  }
  .slide-switch-leave-to, .slide-switch-enter{
    opacity: 0;
    transform: translate(-100%, 0);
  }
</style>

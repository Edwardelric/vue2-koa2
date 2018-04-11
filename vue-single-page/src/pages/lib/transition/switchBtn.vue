<template>
  <div>
    <div class="switch-wrapper">
      <transition name="switch">
        <p class="switch-btn" v-if="show" @click="show = !show" key="on">ON</p>
        <p class="switch-btn" v-if="!show" @click="show = !show" key="off">OFF</p>
      </transition>
      <transition name="slide-switch">
        <p class="switch-btn slide-switch" v-if="show" @click="show = !show" key="on">ON</p>
        <p class="switch-btn slide-switch" v-if="!show" @click="show = !show" key="off">OFF</p>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
			  show: true
      };
		}
	};
</script>

<style lang="scss">
  .switch-wrapper {
    position: relative;
    .switch-btn {
      position: absolute;
      top: 0;
      left: 50%;
      width: 40px;
      height: 40px;
      transform: translate3d(-50%, 0, 0);
      border: 1px solid #ccc;
      line-height: 40px;
      text-align: center;
      &.slide-switch {
        top: 80px;
      }
    }
    .switch-leave-active, .switch-enter-active{
      transition: all .8s ease;
    }
    .switch-leave-to {
      opacity: 0;
      transform: translate(-100%, 0);
    }
    .switch-enter {
      opacity: 0;
      transform: translate(100%, 0);
    }
    .slide-switch-enter-active, .slide-switch-leave-active {
      transition: all .8s ease;
    }
    .slide-switch-leave-to, .slide-switch-enter{
      opacity: 0;
      transform: translate(-100%, 0);
    }
  }
</style>

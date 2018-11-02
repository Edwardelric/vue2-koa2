<template>
  <div class="ed-swiper-indicator" :class="[{'ed-swiper-indicator-vertical': vertical},swiperIndicatorClassName]">
    <slot>
      <i v-for="(item, index) in items" :key="index" :class="{
        'active': indicatorIndex === index
        || index === 0 && indicatorIndex === items.length
        || index === items.length - 1 && indicatorIndex === -1
      }"></i>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
	  name: 'EdSwiperIndicator',
	  props: {
      value: {
        type: Number,
        default: 0
      },
      items: {
        type: Array,
        default: []
      },
      vertical: {
        type: Boolean,
        default: false
      },
      swiperIndicatorClassName: {
        type: String,
        default: ''
      }
    },
		data() {
			return {
        indicatorIndex: 0
      };
		},
    methods: {
      setIndex() {
        this.indicatorIndex = this.value;
      }
    },
    watch: {
//	    value(newVal, oldVal) {
//	      console.log('watch');
//	      //if (newVal !== oldVal) {
//          this.indicatorIndex = this.value;
//        //}
//      }
      value: {
        handler: 'setIndex',
        immediate: true
      }
    }
	};
</script>

<style lang="scss" scoped>
  @import "../ed-css/_mixins.scss";
  .ed-swiper-indicator {
    position: absolute;
    left: 50%;
    bottom: rem(10);
    z-index: 999;
    transform: translate(-50%, -50%);
    text-align: center;
    i {
      display: inline-block;
      width: rem(6);
      height: rem(6);
      margin: 0 rem(3);
      border-radius: 50%;
      background-color: $gray-dark;
      &.active {
        background: $blue;
      }
    }
    &.ed-swiper-indicator-vertical {
      left: 90%;
      bottom: 50%;
      transform: translate(50%, 50%);
      i {
        display: block;
        margin: rem(6) 0;
      }
    }
  }
</style>

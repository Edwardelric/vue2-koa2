<template>
  <div class="ed-swiper-cell" :style="style">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
	  name: 'EdSwiperCell',
    props: {
      animateType: {
	      type: String,
        default: 'swiper'
      }
    },
    beforeCreate() {
	    this.$parent.swipes.push(this);
    },
		data() {
			return {
			  id: (this.$parent.$children.length || 1) - 1,
			  offset: 0,
        scale: 1,
        x: 0,
        y: 0,
        opacity: 1,
        zIndex: 99
      };
		},
    computed: {
      style() {
        let obj = {
          width: this.$parent.computedWidth ? `${this.$parent.computedWidth}px` : '100%' ,
          height: this.$parent.computedHeight ? `${this.$parent.computedHeight}px` : '100%',
          transform: this.$parent.vertical ? `translate3d(0px, ${this.offset}px, 0px)` : `translate3d(${this.offset}px, 0px, 0px)`
        };
        if (this.animateType === 'depth') {
          return Object.assign({}, obj, {
            position: 'absolute',
            opacity: this.opacity,
            zIndex: this.zIndex,
            transitionTimingFunction: 'ease',
            transitionDuration: this.$parent.isTouching ? '0s' : `${this.$parent.duration}ms`,
            transform: `scale(${this.scale}) translate3d(${this.x}px, ${this.y}px, 0)`
          });
        } else {
          return obj;
        }
      }
    },
    destroyed: function destroyed() {
      this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1);
    }
	};
</script>

<style lang="scss" scoped>
  .ed-swiper-cell {
    float: left;
    width: 100%;
    img {
      width: 100%;
      height: 100%
    }
  }
</style>

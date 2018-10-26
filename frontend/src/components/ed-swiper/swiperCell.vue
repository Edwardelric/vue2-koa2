<template>
  <div class="ed-swiper-cell" :style="style">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
	  name: 'EdSwiperCell',
    props: {
	    item: {
	      type: Object,
        default() {
	        return {};
        }
      },
      labelKey: {
	      type: String,
        default: 'url'
      }
    },
    beforeCreate() {
	    this.$parent.swipes.push(this);
    },
		data() {
			return {
			  offset: 0
      };
		},
    computed: {
      style() {
        return {
          width: `${this.$parent.computedWidth}px`,
          height: `${this.$parent.computedHeight}px`,
          transform: this.$parent.vertical ? `translate3d(0px, ${this.offset}px, 0px)` : `translate3d(${this.offset}px, 0px, 0px)`,
          flex: this.$parent.vertical
        }
      }
    },
    destroyed: function destroyed() {
      this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1);
    },
    watch: {

    }
	};
</script>

<style lang="scss" scoped>
  .ed-swiper-cell {
    flex: 0 0 100vw;
    img {
      width: 100%;
    }
  }
</style>

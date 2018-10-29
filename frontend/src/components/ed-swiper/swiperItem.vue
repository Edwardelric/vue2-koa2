<template>
  <div class="ed-swiper-item" ref="swiperItem"
    :style="[style, itemSize]"
    @touchstart.prevent.stop="touchStartHandler"
    @touchmove.prevent.stop="touchMoveHandler"
    @touchend.prevent.stop="touchEndHandler"
  >
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Touch, OnEvent} from '../utils/index.js';

	export default {
	  name: 'EdSwiperItem',
    mixins: [Touch],
    props: {
      value: {
        type: Number,
        default: 0
      },
      vertical: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 0,
      },
      height: {
        type: Number,
        default: 0
      },
      threshold: {
        type: Number,
        default: 50
      },
      autoplay: {
        type: Number,
        default: 1600,
      },
      duration: {
        type: Number,
        default: 500
      },
      loop: {
        type: Boolean,
        default: true
      },
      touchable: {
        type: Boolean,
        default: true
      },
      timingFunction: {
        type: String,
        default: 'ease'
      },
      swiperItemClassName: {
        type: String,
        defalt: ''
      }
    },
		data() {
			return {
			  deltaX: 0,
        deltaY: 0,
        distance: 0,
        isTouching: false,
        currentIndex: this.value,
        swipes: [],
        computedWidth: 0,
        computedHeight: 0,
        itemSize: {}
      };
		},
    mounted() {
      this.init();
      OnEvent(window, 'resize', this.onResize, true);
    },
    methods: {
      onResize() {
        this.init();
      },
      init() {
        clearTimeout(this.timer);
        this.computedWidth = this.width || this.$el.offsetWidth;
        this.computedHeight = this.height || this.$el.offsetHeight;
        if (this.vertical) {
          this.itemSize = {height: `${this.maxSize}px`};
        } else {
          this.itemSize = {width: `${this.maxSize}px`};
        }
        this.isTouching = true;
        this.swipes.forEach((swipe) => {
          swipe.offset = 0;
        });
        if (this.currentIndex > 0 && this.currentIndex <= this.count - 1) {
          this.move(0);
        }
        this.autoPlay();
      },
      touchStartHandler(event) {
        if (!this.touchable) {return;}
        this.clear();
        this.isTouching = true;
        this.touchStart(event);
        this.correctPosition();
      },
      touchMoveHandler(event) {
        if (!this.touchable) {return;}
        this.isTouching = true;
        this.touchMove(event);
        this.move(0, this.deltaRange);
      },
      touchEndHandler(event) {
        if (!this.touchable) {return;}
        this.isTouching = false;
        if (this.delta) {
          this.move(Math.abs(this.delta) > this.threshold ? (this.delta > 0 ? -1 : 1) : 0);
        }
        this.autoPlay();
      },
      move(_move, offset) {
        if (_move === void 0) {
          _move = 0;
        }
        if (offset === void 0) {
          offset = 0;
        }
        let delta = this.delta;
        let currentIndex = this.currentIndex;
        let count = this.count;
        let swipes = this.swipes;
        let maxSize = this.maxSize;
        let atFirst = currentIndex === 0;
        let atLast = currentIndex === count - 1;
        let outOfBounds = (!this.loop) && (atFirst && (offset > 0 || _move < 0) || atLast && (offset < 0 || _move > 0));
        if (outOfBounds || count <= 1) {
          return false;
        }
        if (this.loop) {
          swipes[0].offset = atLast && (delta < 0 || _move > 0) ? maxSize: 0;
          swipes[count - 1].offset = atFirst && (delta > 0 || _move < 0) ? -maxSize : 0;
        }
        if (_move) {
          this.currentIndex += _move;
        }
        this.$emit('input', this.currentIndex);
        this.distance = offset - this.currentIndex * this.size;
      },
      autoPlay() {
        if (this.count <= 1 || !this.autoplay) { return;}
        this.clear();
        this.timer = setTimeout(() => {
          this.isTouching = true;
          this.resetTouchStatus();
          this.correctPosition();
          setTimeout(() => {
            this.isTouching = false;
            if (!this.loop && this.currentIndex === this.count - 1) {
              this.move(-(this.count - 1));
            } else {
              this.move(1);
            }
            this.autoPlay();
          }, 30);
        }, this.autoplay);
      },
      clear() {
        clearTimeout(this.timer);
      },
      correctPosition() {
        if (this.loop) {
          if (this.currentIndex <= -1) {
            this.move(this.count);
          }
          if (this.currentIndex >= this.count) {
            this.move(-this.count);
          }
        }
      },
      // 判断是否是scroll还是touchmove
      isScrollCheck(deltaX, deltaY) {
        if (Math.pow(deltaX, 2) + Math.pow(deltaY, 2) >= 25) {
          return Math.atan2(Math.abs(deltaY),Math.abs(deltaX)) * 180 / Math.PI > 45;
        } else {
          return false;
        }
      }
    },
    computed: {
      count() {
        return this.$parent.items.length;
      },
      size() {
        return this.vertical ? this.computedHeight : this.computedWidth;
      },
      maxSize() {
	      return this.count * this.size;
      },
      delta() {
        return this.vertical ? this.deltaY : this.deltaX;
      },
      deltaRange() {
        // 往右边移动区间为[0, 375]; 往左边移动区间为[-375, 0]
	      return Math.min(Math.max(this.delta, -this.size), this.size);
      },
      style() {
        return {
          transitionTimingFunction: this.timingFunction,
          transitionDuration: this.isTouching ? '0s' : `${this.duration}ms`,
          transform: this.vertical ? `translate3d(0px, ${this.distance}px, 0px)` : `translate3d(${this.distance}px, 0px, 0px)`
        }
      },
      styleSize() {
        if (this.vertical) {
          return {height: this.maxSize};
        } else {
          return {width: this.maxSize};
        }
      }
    },
    watch: {
	    swipes() {
        this.init();
      },
      autoplay(newVal, oldVal) {
	      if (newVal !== oldVal) {
	        if (!newVal)  {
	          this.clear();
          } else {
	          this.autoplay();
          }
        }
      }
    }
	};
</script>

<style lang="scss" scoped>
  .ed-swiper-item {
    width: 100%;
    height: 100%;
  }
</style>

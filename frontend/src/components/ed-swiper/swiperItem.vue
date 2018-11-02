<template>
  <div class="ed-swiper-item" ref="swiperItem"
       :class="swiperItemClassName"
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
      animateType: {
        type: String,
        default: 'swiper'
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
      depthSpaceBetween: {
        type: Number,
        default: 0
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
        itemSize: {},
        depthPositionArr: [],
        depthRatio: [0.6, 0.4]
      };
		},
    mounted() {
      this.computedWidth = this.width || this.$el.offsetWidth;
      this.computedHeight = this.height || this.$el.offsetHeight;
      if (this.checkAnimateType('swiper')) {
        if (this.vertical) {
          this.itemSize = {height: `${this.maxSize}px`};
        } else {
          this.itemSize = {width: `${this.maxSize}px`};
        }
        this.init();
      } else if (this.checkAnimateType('depth')) {
	      this.initDepth();
      }
      OnEvent(window, 'resize', this.onResize, true);
    },
    methods: {
      onResize() {
        this.init();
      },
      init() {
        clearTimeout(this.timer);
        this.isTouching = true;
        this.swipes.forEach((swipe) => {
          swipe.offset = 0;
        });
        if (this.currentIndex > 0 && this.currentIndex <= this.count - 1) {
          this.move(0);
        }
        this.autoPlay();
      },
      initDepth() {
        // 默认贴近两边
        let depthDistance = (this.computedWidth - this.computedWidth * this.depthRatio[1]) / 2 / this.depthRatio[1];
        this.depthDistance = depthDistance;
        // 最小距离
        let spaceBetween = (this.computedWidth - this.computedWidth * this.depthRatio[0]) / 2 / this.depthRatio[1];
        this.isTouching = true;
        let arr = [];
        for (let i = 0; i < this.count; i++) {
          arr[i] = {};
          arr[i].x = ((i) => {
            if (i === 1) {
              return Math.max(depthDistance - this.depthSpaceBetween, spaceBetween);
            } else if (i === this.count - 1) {
              return -Math.max(depthDistance - this.depthSpaceBetween, spaceBetween);
            } else {
              return 0;
            }
          })(i);
          arr[i].y = 0;
          arr[i].scale = ((i) => {
            if (i === 0) {
              return 0.6;
            } else {
              return 0.4;
            }
          })(i);
          arr[i].zIndex = ((i) => {
            if (i === 0) {
              return 99;
            } else {
              return 98;
            }
          })(i);
          arr[i].opacity = ((i) => {
            if (i === 0 || i === 1 || i === this.count - 1) {
              return 1;
            } else {
              return 0;
            }
          })(i);
        }
        this.depthPositionArr = arr;
        this.setPosition();
        this.depthAutoPlay();
      },
      setPosition() {
        this.swipes.forEach((item, index) => {
          let {x, y, scale, zIndex, opacity} = this.depthPositionArr[index];
          item.x = x;
          item.y = y;
          item.scale = scale;
          item.zIndex = zIndex;
          item.opacity = opacity;
        });
      },
      touchStartHandler(event) {
        if (!this.touchable) {return;}
        this.clear();
        this.isTouching = true;
        this.touchStart(event);
        if (this.checkAnimateType('swiper')) {
          this.correctPosition();
        }
      },
      touchMoveHandler(event) {
        if (!this.touchable) {return;}
        this.isTouching = true;
        this.touchMove(event);
        if (this.checkAnimateType('swiper')) {
          this.move(0, this.deltaRange);
        } else {
          this.depthMove(0, this.deltaRange);
        }
      },
      touchEndHandler(event) {
        if (!this.touchable) {return;}
        this.isTouching = false;
        if (this.checkAnimateType('swiper')) {
          if (this.delta) {
            this.move(Math.abs(this.delta) > this.threshold ? (this.delta > 0 ? -1 : 1) : 0);
          }
          this.autoPlay();
        } else {
          if (this.delta) {
            this.depthMove(Math.abs(this.delta) > this.threshold ? (this.delta > 0 ? -1 : 1) : 0);
          }
          this.depthAutoPlay();
        }
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
        if (this.loop && swipes) {
          swipes[0].offset = atLast && (delta < 0 || _move > 0) ? maxSize: 0;
          swipes[count - 1].offset = atFirst && (delta > 0 || _move < 0) ? -maxSize : 0;
        }
        if (_move) {
          this.currentIndex += _move;
        }
        this.$emit('input', this.currentIndex);
        this.distance = offset - this.currentIndex * this.size;
      },
      depthMove(_move, offset) {
        if (_move > 0) {
          this.depthPositionArr.unshift(this.depthPositionArr.pop());
        } else if (_move < 0){
          this.depthPositionArr.push(this.depthPositionArr.shift());
        }
        this.setPosition();
        if (_move) {
          this.currentIndex += _move;
        }
        if (this.currentIndex < 0) {
          this.currentIndex = this.count - 1;
        } else if (this.currentIndex >= this.count) {
          this.currentIndex = 0;
        }
        this.$emit('input', this.currentIndex);
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
        }, this.autoplay < this.duration ?  this.duration + 1000 : this.autoplay);
      },
      depthAutoPlay() {
        if (this.count <= 2) {return;}
        if (!this.autoplay) {return;}
        this.clear();
        this.timer = setTimeout(() => {
          this.isTouching = true;
          setTimeout(() => {
            this.isTouching = false;
            this.depthMove(1);
            this.depthAutoPlay();
          }, 30);
        }, this.autoplay < this.duration ?  this.duration + 1000 : this.autoplay);
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
      checkAnimateType(name) {
        return this.animateType === name;
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
        if (this.checkAnimateType('swiper')) {
          return {
            transitionTimingFunction: this.timingFunction,
            transitionDuration: this.isTouching ? '0s' : `${this.duration}ms`,
            transform: this.vertical ? `translate3d(0px, ${this.distance}px, 0px)` : `translate3d(${this.distance}px, 0px, 0px)`
          }
        } else {
          return {};
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
        //this.init();
      },
//      autoplay(newVal, oldVal) {
//	      if (newVal !== oldVal) {
//	        if (!newVal)  {
//	          this.clear();
//          } else {
//	          this.autoplay();
//          }
//        }
//      }
    }
	};
</script>

<style lang="scss" scoped>
  .ed-swiper-item {
    width: 100%;
    height: 100%;
  }
</style>

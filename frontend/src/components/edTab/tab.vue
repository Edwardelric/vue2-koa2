<template>
  <div class="ed-tab"
       :class="{'ed-tab-fix-bottom': fixBottom}"
       ref="viewArea"
  >
    <div class="ed-tab-list"
         :style="style"
         ref="list"
    >
      <slot></slot>
      <div class="ed-tab-active-bar"
           v-if="!fixBottom"
           :style="activeBarStyle"
           ref="activeBar"
      ></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { windowInit } from '../utils/requestAnimationFrame'

  export default {
    name: 'edTab',
    props: {
      value: {
        type: Number,
        default: 0
      },
      canViewItemNum: {
        type: Number,
        default: 3
      },
      activeColor: {
        type: String,
        default: 'red'
      },
      fixBottom: {
        type: Boolean,
        default: false
      },
      additionalX: {
        type: Number,
        default: 50
      },
      sensitivity: {
        type: Number,
        default: 1000,
        validator(value) {
          return value > 0
        }
      },
      reBoundExponent: {
        type: Number,
        default: 10,
        validator(value) {
          return value > 0
        }
      },
      reBoundingDuration: {
        type: Number,
        default: 360
      },
      openReBoundingBarDuration: {
        type: Boolean,
        default: true
      },
      lineWidthRate: {
        type: Number,
        default: 1
      },
      tabItemStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        activeBarX: 0,
        activeBarWidth: 0,
        speed: 0,
        touching: false,
        reBounding: false,
        translateX: 0,
        startX: 0,
        lastX: 0,
        currentX: 0,
        startMoveTime: 0,
        endMoveTime: 0,
        frameTime: 16.7,
        frameStartTime: 0,
        frameEndTime: 0,
        inertiaFrame: 0,
        zeroSpeed: 0.001,
        acceleration: 0
      };
    },
    computed: {
      transitionTimingFunction () {
        return this.reBounding ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'cubic-bezier(0.1, 0.57, 0.1, 1)'
      },
      transitionDuration () {
        if (this.touching || (!this.reBounding && !this.touching)) {
          return 0
        }
        if (this.reBounding && !this.touching) {
          return this.reBoundingDuration
        }
      },
      style() {
        if (this.fixBottom) {
          return {};
        } else {
          return {
            transitionTimingFunction: this.transitionTimingFunction,
            transitionDuration: `${this.transitionDuration}ms`,
            transform: `translate3d(${this.translateX}px, 0px, 0px)`
          };
        }
      },
      activeBarStyle () {
        if (this.openReBoundingBarDuration) {
          return {
            transition: `all 300ms`,
            width: `${this.activeBarWidth}px`,
            transform: `translate3d(${this.activeBarX}px, 0, 0)`,
            backgroundColor: this.activeColor
          };
        } else {
          return {
            width: `${this.activeBarWidth}px`,
            transform: `translate3d(${this.activeBarX}px, 0, 0)`,
            backgroundColor: this.activeColor
          };
        }
      },
      viewAreaWidth() {
        return this.$refs.viewArea.offsetWidth;
      },
      listWidth() {
        return this.$refs.list.offsetWidth - this.viewAreaWidth;
      },
      isMoveLeft() {
        return this.currentX <= this.startX;
      },
      isMoveRight() {
        return this.currentX >= this.startX;
      }
    },
    mounted () {
      this.bindEvent();
      this.checkPosition();
      this.calcBarPosX();
      windowInit()
    },
    methods: {
      handleTouchStart (event) {
        event.stopPropagation();
        cancelAnimationFrame(this.inertiaFrame);
        this.lastX = event.touches[0].clientX
      },
      handleTouchMove (event) {
        if (this.listWidth <= 0) return;
        event.preventDefault();
        event.stopPropagation();
        this.touching = true;
        this.startMoveTime = this.endMoveTime;
        this.startX = this.lastX;
        this.currentX = event.touches[0].clientX;
        this.moveFollowTouch();
        this.endMoveTime = event.timeStamp
      },
      handleTouchEnd (event) {
        this.touching = false;
        if (this.checkReboundX()) {
          cancelAnimationFrame(this.inertiaFrame);
        } else {
          let silenceTime = event.timeStamp - this.endMoveTime;
          let timeStamp = this.endMoveTime - this.startMoveTime;
          timeStamp = timeStamp > 0 ? timeStamp : 8;
          if (silenceTime > 100) return;
          this.speed = (this.lastX - this.startX) / timeStamp;
          this.acceleration = this.speed / this.sensitivity;
          this.frameStartTime = new Date().getTime();
          this.inertiaFrame = requestAnimationFrame(this.moveByInertia);
        }
      },
      checkReboundX () {
        this.reBounding = false;
        if (this.translateX > 0) {
          this.reBounding = true;
          this.translateX = 0
        } else if (this.translateX < -this.listWidth) {
          this.reBounding = true;
          this.translateX = -this.listWidth;
        }
        return this.translateX === 0 || this.translateX === -this.listWidth;
      },
      bindEvent () {
        this.$el.addEventListener('touchstart', this.handleTouchStart, false);
        this.$el.addEventListener('touchmove', this.handleTouchMove, false);
        this.$el.addEventListener('touchend', this.handleTouchEnd, false);
      },
      removeEvent () {
        this.$el.removeEventListener('touchstart', this.handleTouchStart);
        this.$el.removeEventListener('touchmove', this.handleTouchMove);
        this.$el.removeEventListener('touchend', this.handleTouchEnd);
      },
      moveFollowTouch () {
        if (this.isMoveLeft) {
          if (this.translateX <= 0 && this.translateX + this.listWidth > 0 || this.translateX > 0) {
            this.translateX += this.currentX - this.lastX;
          } else if (this.translateX + this.listWidth <= 0) {
            this.translateX += this.additionalX * (this.currentX - this.lastX)
              / (this.viewAreaWidth + Math.abs(this.translateX + this.listWidth));
          }
        } else {
          if (this.translateX >= 0) {
            this.translateX += this.additionalX * (this.currentX - this.lastX)
              / (this.viewAreaWidth + this.translateX)
          } else if ((this.translateX <= 0 && this.translateX + this.listWidth >= 0) ||
            this.translateX + this.listWidth <= 0) {
            this.translateX += this.currentX - this.lastX;
          }
        }
        this.lastX = this.currentX;
      },
      moveByInertia () {
        this.frameEndTime = new Date().getTime();
        this.frameTime = this.frameEndTime - this.frameStartTime;
        if (this.isMoveLeft) {
          if (this.translateX <= -this.listWidth) {
            this.acceleration *= (this.reBoundExponent +
              Math.abs(this.translateX + this.listWidth)) /
              this.reBoundExponent;
            this.speed = Math.min(this.speed - this.acceleration, 0);
          } else {
            this.speed = Math.min(this.speed - this.acceleration * this.frameTime, 0)
          }
        } else if (this.isMoveRight) {
          if (this.translateX >= 0) {
            this.acceleration *= (this.reBoundExponent + this.translateX) / this.reBoundExponent;
            this.speed = Math.max(this.speed - this.acceleration, 0)
          } else {
            this.speed = Math.max(this.speed - this.acceleration * this.frameTime, 0)
          }
        }
        this.translateX += this.speed * this.frameTime / 2;
        if (Math.abs(this.speed) <= this.zeroSpeed) {
          this.checkReboundX();
          return
        }
        this.frameStartTime = this.frameEndTime;
        this.inertiaFrame = requestAnimationFrame(this.moveByInertia);
      },
      calcBarPosX () {
        if (this.fixBottom || !this.$children.length) return;
        const item = this.$children[this.value >= this.$children.length ? 0 : this.value].$el;
        const itemWidth = item.offsetWidth;
        const itemLeft = item.offsetLeft;
        this.activeBarWidth = Math.max(itemWidth * this.lineWidthRate, 14);
        this.activeBarX = itemLeft + (itemWidth - this.activeBarWidth) / 2;
      },
      checkPosition () {
        if (this.fixBottom || !this.$children.length) return;
        const activeItem = this.$children[this.value >= this.$children.length ? 0 : this.value].$el;
        const offsetLeft = activeItem.offsetLeft;
        const half = (this.viewAreaWidth - activeItem.offsetWidth) / 2;
        let changeX = 0;
        const absTransX = Math.abs(this.translateX);
        if (offsetLeft <= absTransX + half) {
          let pageX = offsetLeft + this.translateX;
          changeX = half - pageX;
        } else {
          changeX = -(offsetLeft - absTransX - half);
        }
        let lastX = changeX + this.translateX;
        lastX > 0 && (lastX = 0);
        lastX < -this.listWidth && (lastX = -this.listWidth);
        this.reBounding = true;
        this.translateX = lastX;
      }
    },
    destoryed () {
      this.removeEvent();
    },
    watch: {
      value() {
        this.checkPosition();
        this.calcBarPosX();
      }
    }
  };
</script>

<style lang="scss">
  .ed-tab {
    position: relative;
    overflow: hidden;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #ddd;
    background-color: rgba(255 ,255, 255, 1);
    &.ed-tab-fix-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      border-top: 1px solid #ccc;
      border-bottom: none;
      .ed-tab-item {
        border-bottom: none!important;
      }
    }
    .ed-tab-list {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-flow: row nowrap;
      padding: 10px 0;
      .ed-tab-active-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 30px;
        height: 3px;
        border-radius: 4px;
      }
    }
  }
</style>

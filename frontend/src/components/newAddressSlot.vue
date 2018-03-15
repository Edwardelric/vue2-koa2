<template>
  <ul class="picker"
      v-if="type!=='divide'"
      @touchstart.prevent="touchStartFn($event)"
      @touchmove.prevent="touchMoveFn($event)"
      @touchend.prevent="touchEndFn($event)"
      :style="{'text-align': textAlign}"
  >
    <li v-for="(item, index) in (values || [])" :key="index">{{item.name}}</li>
  </ul>
  <div class="divider" v-else="divider" :style="{'text-align': textAlign}">{{content}}</div>
</template>

<script type="text/ecmascript-6">
	export default {
	  name: "new-address-slot",
    props: {
      values: {
        type: Array,
        default: []
      },
      type: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: "-"
      },
      textAlign: {
        type: String,
        default: "center"
      },
      showItemCount: {
        type: Number,
        default: 5
      },
      loopIndex: {
        type: Number,
        default: 0,
        required: false
      },
      selectedValues: {
        type: Object,
        default: {},
        required: false
      }
    },
		data() {
      return {
        touchData: {
          startTime: null,
          startX: 0,
          startY: 0,
          iStartY: 0,
          target: 0,
          iY: 0
        },
        curPage: 0,
        itemHeight: 40
      };
		},
    mounted() {
	    let liDom = this.$el.querySelector("li");
	    if (!liDom) {
	      return false;
      }
      this.itemHeight = this.$el.querySelector("li").clientHeight;
      let marginTop = this.itemHeight * ((this.showItemCount - 1) / 2);
      this.$el.style.marginTop = `${marginTop}px`;
      this.$emit("setItemHeight", this.itemHeight);
      if (this.selectedValues) {
        if (this.selectedValues.code || this.selectedValues.name) {
          let selectedIndex = 0;
          this.values.forEach((item, index) => {
            if (item.code === this.selectedValues.code || item.name === this.selectedValues.name) {
              selectedIndex = index;
            }
          });
          this.curPage = selectedIndex;
          this.touchData.iY = selectedIndex * -this.itemHeight;
          this.move(this.touchData.iY, false);
        }
      }
    },
    methods: {
      touchStartFn(evt) {
        let touchData = this.touchData;
        touchData.startTime = +new Date();
        touchData.startX = evt.targetTouches[0].pageX;
        touchData.startY = evt.targetTouches[0].pageY;
        touchData.iStartY = touchData.iY || 0;
        touchData.target = evt.target;
      },
      touchMoveFn(evt) {
        let touchData = this.touchData;
        let X = evt.targetTouches[0].pageX;
        let Y = evt.targetTouches[0].pageY;
        let offset = Y - touchData.startY;
        touchData.iY = Math.floor(touchData.iStartY + offset);
        this.move(touchData.iY, true);
      },
      touchEndFn(evt) {
        let touchData = this.touchData;
        let curiY = touchData.iY;
        let curPage = 0;
        let iY = 0;
        let len = this.values.length;
        if (curiY >= 0) {
          iY = 0;
          curPage = 0;
        } else if (curiY <= len * -this.itemHeight + this.itemHeight / 2) {
          curPage = len - 1;
          iY = curPage * -this.itemHeight;
        } else {
          curPage = Math.floor(curiY / -this.itemHeight);
          if (Math.abs(curiY) >= curPage * this.itemHeight + this.itemHeight / 2) {
            curPage += 1;
          }
          iY = curPage * -this.itemHeight;
        }
        this.curPage = curPage;
        touchData.iY = iY;
        this.move(iY, false);
        if (touchData.iStartY != touchData.iY) {
          this.$emit("change", this.loopIndex, this.values[curPage] || []);
        }
      },
      move(destination, isMove) {
        if (isMove) {
          this.$el.style.webkitTransition = `none`;
        } else {
          this.$el.style.webkitTransition = `-webkit-transform .45s ease`;
        }
        this.$el.style.webkitTransform = `translate(0, ${destination}px)`;
      }
    },
    watch: {
      values() {
        this.curPage = 0;
        this.touchData.iY = 0;
        this.move(0, false);
      }
    }
	};
</script>

<style lang="scss">
</style>

<template>
  <ul class="picker"
      v-if="type!=='divider'"
      :style="{'text-align': textAlign}"
  >
    <li v-for="(item, index) in (values || [])" :key="index">{{item.name}}</li>
  </ul>
  <div class="divider" v-else="divider" :style="{'text-align': textAlign}">{{content}}</div>
</template>

<script type="text/ecmascript-6">
  import draggable from "./draggable";

	export default {
	  name: "picker-regions-slots",
    props: {
      values: {
        type: Array,
        default: []
      },
      selectedValues: {
        type: Object,
        default: {}
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
      loopIndex: {
        type: Number,
        default: 0
      },
      lineHeight: {
        type: Number,
        default: 40
      }
    },
		data() {
      return {
        touchData: {
          startTime: null,
          startY: 0,
          iStartY: 0,
          iY: 0
        },
        curPage: 0
      };
		},
    mounted() {
      if (this.selectedValues && (this.selectedValues.code || this.selectedValues.name)) {
        let selectedIndex = 0;
        this.values.forEach((item, index) => {
          if (item.code === this.selectedValues.code || item.name === this.selectedValues.name) {
            selectedIndex = index;
          }
        });
        this.curPage = selectedIndex;
        this.touchData.iY = selectedIndex * -this.lineHeight;
        this.move(this.touchData.iY, false);
      }
      this.bindEvents();
    },
    methods: {
      bindEvents() {
        draggable(this.$el, {
          start: (evt) => {
            let touchData = this.touchData;
            touchData.startY = evt.pageY;
            touchData.iStartY = touchData.iY || 0;
          },
          move: (evt) => {
            let touchData = this.touchData;
            let X = evt.pageX;
            let Y = evt.pageY;
            let offset = Y - touchData.startY;
            touchData.iY = Math.floor(touchData.iStartY + offset);
            this.move(touchData.iY, true);
          },
          end: (evt) => {
            this.checkCurIndex(Math.round(-this.touchData.iY / this.lineHeight));
          }
        })
      },
      checkCurIndex(curPage) {
        if (curPage < 0) {
          curPage = 0;
        } else if (curPage > this.values.length - 1) {
          curPage = this.values.length - 1;
        }
        this.curPage = curPage;
        this.touchData.iY = curPage * -this.lineHeight;
        this.move(this.touchData.iY, false);
        if (this.touchData.iStartY !== this.touchData.iY) {
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

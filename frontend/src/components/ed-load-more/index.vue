<template>
  <div class="load-more-wrapper">
    <slot></slot>
    <div class="loading-desc" :class="classObject">
      <slot name="loadingDesc" v-if="value">
        <p>加载中...</p>
      </slot>
      <slot name="noDataDesc" v-if="!value && finished">
        <p>无更多数据</p>
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {scrollTools, throttle, onEvent, offEvent} from '../utils/index.js';

	export default {
	  name: 'EdLoadMore',
    props: {
	    value: {
	      type: Boolean,
        default: false
      },
      finished: {
	      type: Boolean,
        default: false
      },
      immediateCheck: {
	      type: Boolean,
        default: false
      },
      distance: {
	      type: Number,
        default: 10
      },
      loadingDescClassName: {
	      type: String,
        default: ''
      },
      loadingNoDataClassName: {
	      type: String,
        default: ''
      }
    },
		data() {
			return {
        classObject: {},
        scrollEventTarget: '',
        binded: false
      };
		},
    created() {
	    if (this.loadingDescClassName) {
        this.classObject[this.loadingDescClassName] = true;
      }
      if (this.loadingNoDataClassName) {
	      this.classObject[this.loadingNoDataClassName] = true;
      }
    },
    mounted() {
	    this.scrollEventTarget = scrollTools.getScrollEventTarget(this.$el);
	    this.handler(true);
      if (this.immediateCheck) {
        this.check();
      }
    },
    methods: {
	    check() {
	      if (this.value || this.finished) {
	        return;
        }
        let reachBottom = false;
        let el = this.$el;
	      let scrollEventTarget = this.scrollEventTarget;

	      let viewportScrollTop = scrollTools.getScrollTop(scrollEventTarget);
	      let viewportBottom = viewportScrollTop + scrollTools.getVisibleHeight(scrollEventTarget);

	      if (scrollEventTarget === el) {
          reachBottom = scrollEventTarget.scrollHeight - viewportBottom < this.distance;
        } else {
          let elementBottom = scrollTools.getElementTop(el) - scrollTools.getElementTop(scrollEventTarget) + el.offsetHeight + viewportScrollTop;
          reachBottom = viewportBottom + this.distance >= elementBottom;
        }
        if (reachBottom) {
	        this.$emit('input', true);
          this.$emit('load');
        }
      },
      handler(flag) {
        if (this.binded !== flag) {
          this.binded = flag;
          (flag ? onEvent : offEvent)(this.scrollEventTarget, 'scroll', this.check);
        }
      }
    }
	};
</script>

<style lang="scss" scoped>
  @import "../ed-css/_mixins.scss";
  .load-more-wrapper {
    .loading-desc {
      display: flex;
      justify-content: center;
      align-items: center;
      height: rem(40);
      background: $white;
    }
  }
</style>

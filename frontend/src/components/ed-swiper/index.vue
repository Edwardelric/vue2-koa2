<template>
  <div class="ed-swiper-wrapper" :style="style">
    <SwiperItem
      v-model="val"
      v-bind="options"
    >
      <SwiperCell v-for="(item, index) in items" :key="index">
        <slot>
          <img :src="item[options.labelKey || 'url']" />
        </slot>
      </SwiperCell>
    </SwiperItem>
    <SwiperIndicator
      v-if="options.showIndicators"
      v-model="val"
      :items="items"
      v-bind="options"
    >
      <slot name="indicator"></slot>
    </SwiperIndicator>
  </div>
</template>

<script type="text/ecmascript-6">
  import SwiperItem from './swiperItem.vue';
  import SwiperCell from './swiperCell.vue';
  import SwiperIndicator from './SwiperIndicator.vue';

	export default {
	  name: 'EdSwiper',
    props: {
	    value: {
	      type: Number,
        default: 0
      },
      items: {
	      type: Array,
        default: []
      },
      options: {
        type: Object,
        default() {
          return {};
        }
      }
    },
		data() {
			return {
			  val: this.value
      };
		},
    computed: {
      style() {
        if (this.options.vertical && this.options.height) {
          return {
            height: `${this.options.height}px`
          }
        }
      }
    },
    watch: {
	    val(newVal, oldVal) {
	      if (newVal !== oldVal) {
	        this.$emit('onChange', newVal);
        }
      }
    },
    components: {
      SwiperItem,
	    SwiperCell,
      SwiperIndicator
    }
	};
</script>

<style lang="scss" scoped>
  .ed-swiper-wrapper {
    overflow: hidden;
    position: relative;
    width: 100%;
  }
</style>

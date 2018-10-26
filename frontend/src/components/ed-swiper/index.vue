<template>
  <div class="ed-swiper-wrapper">
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
  </div>
</template>

<script type="text/ecmascript-6">
  import SwiperItem from './swiperItem.vue';
  import SwiperCell from './swiperCell.vue';

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
    components: {
      SwiperCell,
      SwiperItem
    }
	};
</script>

<style lang="scss" scoped>
  .ed-swiper-wrapper {
    width: 100%;
    overflow: hidden;
  }
</style>

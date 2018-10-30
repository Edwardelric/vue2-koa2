<template>
  <div class="swiper-wrapper">
    <h1>123123</h1>
    <Swiper
      v-model="val"
      :options="options"
      :items="items"
      @onChange = onChange
    >
      <!--<template slot-scope="slotProps">-->
        <!--<div>-->
          <!--<p v-for="(item, index) in text" :key="index">{{item}}</p>-->
        <!--</div>-->
      <!--</template>-->
      <!--<template slot="indicator">-->
        <!--<div>-->
          <!--{{val}}/4-->
        <!--</div>-->
      <!--</template>-->
    </Swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from "../../../components/ed-swiper/index.vue";

	export default {
		data() {
			return {
			  val: 1,
        text: [1, 2, 3, 4, 5],
        items: [
          {url: '../../../static/11.jpeg'},
          {url: '../../../static/22.jpeg'},
          {url: '../../../static/33.jpeg'},
          {url: '../../../static/44.jpg'},
          {url: '../../../static/55.jpg'}
        ],
        options: {
			    labelKey: 'url',
          vertical: true,
          height: 240,
          threshold: 50,
          autoplay: 2000,
          loop: true,
          showIndicators: true,
          timingFunction: 'ease',
          swiperItemClassName: 'swiperItemClassName',
//          swiperIndicatorClassName: 'swiper-indicator'
        }
      };
		},
    methods: {
      onChange(index) {
        this.val = index;
      }
    },
    components: {
		  Swiper
    }
	};
</script>

<style lang="scss">
  h1 {
    padding: 100px;
    text-align: center;
  }
  .swiper-wrapper {

    background: #fff;
  }
  .swiperItemClassName {
    width: 100%;
  }
  .swiper-indicator {
    left: 10%!important;
    width: 20px;
    background: red
  }
</style>

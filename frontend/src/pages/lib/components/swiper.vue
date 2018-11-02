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
    <p>12312</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from "../../../components/ed-swiper/index.vue";

	export default {
		data() {
			return {
			  val: 0,
        text: [1, 2, 3, 4, 5],
        items: [
          {src: '../../../static/11.jpeg'},
          {src: '../../../static/22.jpeg'},
          {src: '../../../static/33.jpeg'},
          {src: '../../../static/44.jpg'},
          {src: '../../../static/55.jpg'}
        ],
        options: {
			    labelKey: 'src',
          animateType: 'swiper',
          vertical: false,
          height: 240,
          threshold: 50,
          depthSpaceBetween: 10,
          autoplay: 1000,
          loop: false,
          showIndicators: true,
          timingFunction: 'ease',
          swiperItemClassName: 'swiperItemClassName',
//          swiperIndicatorClassName: 'swiper-indicator'
        }
      };
		},
    methods: {
      onChange(index) {
        console.log(index);
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

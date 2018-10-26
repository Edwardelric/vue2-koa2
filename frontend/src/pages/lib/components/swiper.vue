<template>
  <div class="swiper-wrapper">
    <h1>123123</h1>
    <Swiper
      v-model="val"
      :options="options"
      :items="items"
    >
      <!--<template slot-scope="slotProps">-->
        <!--<div>-->
          <!--<p v-for="(item, index) in text" :key="index">{{item}}</p>-->
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
			  val: 0,
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
          vertical: false,
          initialSwipe: 2,
          threshold: 50,
          autoplay: 4000,
          duration: 800,
          loop: false,
          timingFunction: 'ease',
          swiperItemClassName: 'swiperItemClassName'
        }
      };
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
    /*height: 246px!important;*/
  }
</style>

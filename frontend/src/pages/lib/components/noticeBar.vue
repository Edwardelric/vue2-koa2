<template>
  <div>
      <!--<ed-notice-bar :animationDuration="10">-->
          <!--<ul>-->
              <!--<li>test1</li>-->
              <!--<li>test2</li>-->
              <!--<li>test3</li>-->
              <!--<li>test4</li>-->
              <!--<li>test5</li>-->
              <!--<li>test6</li>-->
              <!--<li>test7</li>-->
              <!--<li>test8</li>-->
              <!--<li>test9</li>-->
              <!--<li>test10</li>-->
          <!--</ul>-->
      <!--</ed-notice-bar>-->
      <div style="height: 20px;position: relative; overflow: hidden; border: 1px solid #000;">
      <div class="inner-container">
          <p class="text" v-for="(text, index) in arr" :key="index">{{text}}</p>
      </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import EdNoticeBar from "../../../components/ed-notice-bar/index.vue";

    export default {
        data() {
			return {
				arr: [
					'1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
					'2 现在雅阁这个状态像极了新A4L上市那段日子。',
					'3 低配太寒碜，各种需要加装，中配定价过高，又没啥特色',
					'4 然后各种机油门、经销商造反什么的幺蛾子。',
					'5 看五月销量，建议参考A4，打8折吧。',
					'1 不是被郭德纲发现的，也不是一开始就收为徒弟。'
				],

            };
		},

        components: {
            EdNoticeBar
        }
	};
</script>

<style lang="scss">
    .inner-container {
        position: absolute;
        animation: myMove 5s linear infinite;
        animation-fill-mode: forwards;
        p {
            height: 20px;
            line-height: 20px;
        }
    }
    /*文字无缝滚动*/
    @keyframes myMove {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(calc(-100% + 20px));
        }
    }

</style>

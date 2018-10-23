<template>
    <div class="lottery-wrapper">
      <Lottery
        v-model="angle"
        v-bind="options"
        @changeValueHandler="changeValueHandler"
      >
        <p slot="txt">开始<br/>抽奖</p>
        <div slot="lotteryBg"><img src="../../../assets/reward.png"/></div>
      </Lottery>
      <p style="height:1px;background:red;"></p>
    </div>
</template>

<script type="text/ecmascript-6">
  import Lottery from "@/components/LotteryComponent";

	export default {
		data() {
			return {
			  num: 1,
        angle: 36,
			  options: {
          data: [
            {
              id: 0,
              txt: "0一等奖一等奖一等奖一等奖一等奖"
            },
            {
              id: 1,
              txt: "1猫币"
            },
            {
              id: 2,
              txt: "2谢谢参与"
            },
            {
              id: 3,
              txt: "3猫币"
            },
            {
              id: 4,
              txt: "4元免费流量包"
            },
            {
              id: 5,
              txt: "5元免费流量包"
            },
            {
              id: 6,
              txt: "6猫币"
            },
            {
              id: 7,
              txt: "7元免费流量包"
            },
            {
              id: 8,
              txt: "8元免费流量包"
            },
            {
              id: 9,
              txt: "9元免费流量包"
            }
          ],
          useCanvasDraw: false,
          textColor: '#E5302F',
          animateType: 'easeOut',
          duration: 4000,
          durationStep: 20,                     // 旋转递增时间步数
          roundNum: 10,                         // 旋转的圈数
          canvasWrapClassName: 'canvasWrap',
          indicatorClassName: 'indicator'
        }
      };
		},
    mounted() {

    },
    components: {
      Lottery
    },
    methods: {
      changeValueHandler(data) {
        this.num += 1;
		    this.angle = 36 * this.num;
		    console.log(this.angle);
      }
    }
	};
</script>

<style lang="scss">
  .canvasWrap {
    margin: 0 20px;
  }
</style>

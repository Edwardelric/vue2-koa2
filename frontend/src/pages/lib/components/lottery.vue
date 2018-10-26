<template>
    <div class="lottery-wrapper">
      <Lottery
        v-model="angle"
        v-bind="options"
        @changeValueHandler="changeValueHandler"
        @animateFinishedHandler="animateFinishedHandler"
      >
        <p slot="txt">开始<br/>{{options.maxChanceNum}}次</p>
        <div v-if="!options.useCanvasDraw" slot="lotteryBg" class="reward-img">
          <img src="../../../assets/reward.png"/>
        </div>
      </Lottery>
      <p style="height:1px;background:red;"></p>
    </div>
</template>

<script type="text/ecmascript-6">
  import Lottery from "@/components/ed-lottery/index.vue";

	export default {
		data() {
			return {
        rotateNum: 0,
        angle: 36,
			  options: {
          useCanvasDraw: true,
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
              txt: "6猫币"
            },
            {
              id: 9,
              txt: "7元免费流量包"
            }
          ],
          fontSize: 20,
          textColor: '#E5302F',
          maxChanceNum: 4,
          animateType: 'easeOut',
          duration: 6000,
          durationStep: 20,                     // 旋转递增时间步数
          roundNum: 10,                         // 旋转的圈数
          canvasWrapClassName: 'canvasWrap',
          indicatorClassName: 'indicator',
          indicatorDisabled: 'indicatorDisabled'
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
        this.options.maxChanceNum -= 1;
        this.rotateNum += 1;
		    this.angle = this.angle + (this.rotateNum * 360) ;
		    console.log(this.angle);
      },
      animateFinishedHandler() {
        console.log(123);
      }
    }
	};
</script>

<style lang="scss">
  .canvasWrap {
    margin: 0 20px;
  }
  .indicator {
    width: 92px;
    height: 92px;
  }
  .reward-img {
    position: relative;
    width: 100%;
    img {
      width: 100%;
    }
    .txt-desc {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 999;
      width: 60px;
      transform: translate(-50%, -50%);
      background: #ccc;
      line-height: 20px;
    }
  }
</style>

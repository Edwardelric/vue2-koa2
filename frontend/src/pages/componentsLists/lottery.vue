<template>
    <div class="lottery-wrapper">
      <Lottery
        :data="data"
        :width="'300'"
        :animateType="'easeOut'"
        :ajaxParams="{method:'GET',url:'https://www.easy-mock.com/mock/592e626b91470c0ac1fed9b6/products_1496212075258/member#!method=get'}"
        :canvasWrapClassName="'canvasWrap'"
        :indicatorClassName = "'indicator'"
        :textColor="'#E5302F'"
        v-on:initCompleted = "initCompleted"
      >
        <p slot="txt">开始<br/>抽奖</p>
      </Lottery>
      <p style="height:1px;background:red;"></p>
    </div>
</template>

<script type="text/ecmascript-6">
  import Lottery from "@/components/LotteryComponent";

	export default {
		data() {
			return {
        data: [
          {
            id: 0,
            txt: "一等奖一等奖一等奖一等奖一等奖"
          },
          {
            id: 1,
            txt: "10猫币"
          },
          {
            id: 2,
            txt: "谢谢参与"
          },
          {
            id: 3,
            txt: "5猫币"
          },
          {
            id: 4,
            txt: "10元免费流量包"
          },
          {
            id: 5,
            txt: "20元免费流量包"
          },
          {
            id: 6,
            txt: "20猫币"
          },
          {
            id: 7,
            txt: "30元免费流量包"
          },
          {
            id: 8,
            txt: "100元免费流量包"
          },
          {
            id: 9,
            txt: "2猫币"
          },
        ]
      };
		},
    mounted() {

    },
    components: {
      Lottery
    },
    methods: {
		  initCompleted(data) {
		    console.log("completed");
		    console.log(data);
      }
    }
	};
</script>

<style lang="scss">
</style>

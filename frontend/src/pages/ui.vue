<template>
  <ul class="ui-wrapper">
    <li class="btn"><router-link to="/componentslists/pickerRegions">省市区三级联动效果</router-link></li>
    <li class="btn"><router-link to="/componentslists/lottery">转盘抽奖活动</router-link></li>
    <li class="btn"><router-link to="/componentslists/loadmore">上拉下拉加载更多</router-link></li>
    <li class="text-center">-----------------------------------------------</li>
    <li class="btn"><router-link to="/transition/switchBtn">switch开关效果</router-link></li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {};
    }
  };
</script>

<style lang="scss">
  @import "../assets/scss/_mixins";
  .ui-wrapper {
    background: $white;
  }
</style>

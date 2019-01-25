<template>
  <ul class="sub-nav">
    <li>
      <img src="http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png" />
      <p>易购</p>
    </li>
    <li>
      <img src="http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408112010_4489.png" />
      <p>超市</p>
    </li>
    <li>
      <img src="http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408112053_8191.png" alt="">
      <p>国际</p>
    </li>
    <li>
      <img src="http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408113102_1595.png" alt="">
      <p>聚划算</p>
    </li>
    <li>
      <img src="http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408113048_1276.png" alt="">
      <p>分类</p>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/_mixins";
  .sub-nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 rem(16);
    padding: rem(10) 0 rem(14) 0;
    li {
      flex: 1 0 0;
      padding-right: rem(36);
      text-align: center;
      img {
        width: 100%;
      }
      p {
        padding-top: rem(4);
      }
      &:last-of-type {
        padding-right: 0;
      }
    }
  }
</style>

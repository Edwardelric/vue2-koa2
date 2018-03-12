<template>
    <!--<ul class="footer">-->
      <!--<li>微信</li>-->
      <!--<li>通讯录</li>-->
      <!--<li>发现</li>-->
    <!--</ul>-->
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
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: rem(30);
    background: $gray;
    line-height: rem(30);
    color: $white;
  }
</style>

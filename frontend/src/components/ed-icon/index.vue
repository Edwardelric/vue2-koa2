<template>
  <i class="ed-iconfont icon-gerenxinxi_o" :class="['ed-' + this.name]"></i>
</template>

<script type="text/ecmascript-6">
	export default {
    name: 'EdIcon',
    props: {
      name: {
        type: String,
        default: 'icon'
      }
    },
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
  @import '../ed-css/font/_font.css';
  .ed-icon {
    color: red;
  }
</style>

<template>
  <div class="loadmore">
    <div class="loadmore-content">
      <slot name="top">
        <div class="loadmore-top">
          <span class="loadmore-text"></span>
        </div>
      </slot>
      <slot></slot>
      <slot name="bottom">
        <div class="loadmore-bottom">
          <span class="loadmore-text"></span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
	  name: "load-more",
		data() {
			return {};
		}
	};
</script>

<style lang="scss">
  .dropload-down {
    text-align: center;
  }
</style>

<template>
    <div class="scroll-wrapper">
      <Loadmore></Loadmore>
    </div>
</template>

<script type="text/ecmascript-6">
  import Loadmore from "@/components/loadmore";

	export default {
		data() {
			return {
			  list: []
      };
		},
    created() {
		  for (let i = 0; i <= 20; i++) {
		    this.list.push(i);
      }
    },
    components: {
      Loadmore
    }
	};
</script>

<style lang="scss">
  @import "../../assets/scss/_mixins";
  .list-wrapper {
    li {
      margin-bottom: rem(10);
      border: 1px solid $gray;
      line-height: rem(30);
      text-align: center;
    }
  }
</style>

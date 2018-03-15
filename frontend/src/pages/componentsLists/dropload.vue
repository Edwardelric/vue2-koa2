<template>
    <div class="scroll-wrapper">
      <ul class="list-wrapper">
        <li v-for="(item, index) in list">当前的item:{{item}}</li>
      </ul>
      <InfiniteScroll></InfiniteScroll>
    </div>
</template>

<script type="text/ecmascript-6">
  import InfiniteScroll from "@/components/dropload";

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
      InfiniteScroll
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

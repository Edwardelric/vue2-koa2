<template>
    <ul class="subNav-wrapper">
      <li v-for="(item, index) in menu" @click="navigatorTo(item.url)">
        <i class="iconfont" :class="item.className"></i>
        <p>{{item.txt}}</p>
      </li>
    </ul>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
			  curUrl: ""
      };
		},
    methods: {
      navigatorTo(url) {
        this.curUrl = url ? url : "";
        this.$router.push({
          path: `/${this.curUrl}`
        });
      }
    },
    computed: mapGetters({
      menu: "getSubNavMenu"
    })
	};
</script>

<style lang="scss">
  @import "../assets/scss/_mixins";
  .subNav-wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    margin: rem(8) 0;
    padding: rem(8) 0;
    background: $white;
    color: $gray;
    text-align: center;
    li {
      i {
        font-size: rem(28);
      }
      p {
        padding-top: rem(10);
      }
    }
  }
</style>

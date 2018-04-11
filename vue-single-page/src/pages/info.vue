<template>
  <div class="user-wrapper">
    <div class="avator-wrapper">
      <div class="avator"><img src="../assets/images/home/home.jpeg" /></div>
      <p>Edward</p>
    </div>
    <ul class="info-lists">
      <li v-for="(item, index) in infoList.concat(infoList)" :key="index">
        <i class="iconfont" :class="item.className"></i>
        <div class="lists-content">{{item.txt}}</div>
        <i class="iconfont icon-fenxiang"></i>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
      };
		},
    computed: mapGetters({
      infoList: "getInfoList"
    })
	};
</script>

<style lang="scss">
  @import "../assets/scss/_mixins";
  .user-wrapper {
    .avator-wrapper {
      padding: rem(10) 0;
      background: $selected;
      text-align: center;
      .avator {
        width: rem(53.25);
        height: rem(53.25);
        margin: 0 auto;
        margin-bottom: rem(10);
        border-radius: 50%;
        background: $dark;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .info-lists {
      background: $white;
      li {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: rem(10);
        border-bottom: 1px solid $gray;
        i:nth-of-type(1), i:nth-of-type(2) {
          flex: 0 0 rem(20);
          font-size: rem(16);
        }
        .lists-content {
          flex: 1 0 0;
          padding-left: rem(10);
        }
      }
    }
  }
</style>

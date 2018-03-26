<template>
    <ul class="footer">
      <li v-for="(item, index) in menu" @click="navigatorTo(item.url)" :class="{active: curUrl === item.url}">
        <img :src="item.imgUrl" />
        <img :src="item.selectedUrl" />
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
      menu: "getFooterMenu"
    })
	};
</script>

<style lang="scss">
  @import "../../assets/scss/mixins";
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 8vh;
    border-top: 1px solid $gray;
    background: #fff;
    color: $gray;
    text-align: center;
    li {
      img {
        width: 80%;
      }
      img:nth-of-type(1) {
        display: inline-block;
      }
      img:nth-of-type(2) {
        display: none;
      }
      &.active {
        color: $selected;
        img:nth-of-type(1) {
          display: none;
        }
        img:nth-of-type(2) {
          display: inline-block;
        }
      }
    }
  }
</style>

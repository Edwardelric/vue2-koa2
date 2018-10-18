<template>
  <div class="load-more-wrapper">
    <LoadMore
      v-model="loading"
      v-bind="options"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" class="list-padding">{{index}}</div>
      <p slot="loadingDesc" class="loading-bg">当前正在加载中...</p>
      <p slot="noDataDesc" class="loading-bg">暂无更多数据</p>
    </LoadMore>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import LoadMore from "../../../components/ed-load-more/index.vue";

  export default {
    data() {
      return {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        loading: false,
        options: {
          finished: false,
          immediateCheck: false,
          distance: 10,
          loadingDescClassName: 'loadingDescClassName',
          loadingNoDataClassName: 'loadingNoDataClassName'
        }
      }
    },
    methods: {
      onLoad() {
        this.loading = true;
//        setTimeout(() => {
//          for (let i = 0; i < 5; i++) {
//            this.list.push(this.list.length + 1);
//          }
//          // 加载状态结束
//          this.loading = false;
//
//          // 数据全部加载完成
//          if (this.list.length >= 10) {
//            this.options.finished = true;
//          }
//        }, 1000);

        this.$ajax.post('https://www.easy-mock.com/mock/592e626b91470c0ac1fed9b6/products_1496212075258/moneylist#!method=post').then(res => {

        }).catch(err => {
          for (let i = 0; i < 5; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 10) {
            this.options.finished = true;
          }
        }).finally(() => {

        })
      }
    },
    components: {
      LoadMore
    }
  }
</script>

<style lang="scss">
  .load-more-wrapper {

    background: #fff;
  }
  .list-padding {
    padding: 20px;
    border-bottom: 1px dotted #ccc;
  }
  .loading-bg {
    color: red
  }
  .loadingDescClassName {
    background: red;
    font-size: 20px;
  }
  .loadingNoDataClassName {
    color: #ccc;
    font-size: 15px;
  }
</style>


<template>
  <div class="load-more-wrapper">
    <LoadMore
      v-model="loading"
      v-bind="options"
      @refresh="refresh"
      @loadMore="loadMore"
    >
      <p slot="refreshDesc">aa</p>
      <p slot="refreshNoData">b</p>
      <div v-for="(item, index) in list" class="list-padding">
        {{item}}
        <Icon name="icon-ding "></Icon>
        <i class="icon iconfont icon-gerenxinxi_o"></i>
      </div>
      <p slot="loadMoreDesc" class="loading-bg">当前正在加载中...</p>
      <p slot="loadMoreNoData" class="loading-bg">暂无更多数据</p>
    </LoadMore>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import LoadMore from "../../../components/ed-load-more/index.vue";
  import Icon from "../../../components/ed-icon/index.vue";

  export default {
    data() {
      return {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        loading: false,
        options: {
          enableRefresh: true,
          additionalX: 50,
          duration: 300,
          refreshFinished: false,
          refreshClassName: 'refreshClassName',
          refreshNoData: 'refreshNoData',
          enableLoadMore: true,
          immediateCheck: false,
          distance: 10,
          loadMoreFinished: false,
          loadMoreClassName: 'loadingDescClassName',
          loadMoreNoData: 'loadingNoDataClassName'
        },
      }
    },
    methods: {
      refresh() {
        console.log(this.loading);
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            this.list.unshift(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 30) {
            this.options.refreshFinished = true;
          }
          console.log(this.list);
        }, 600);
      },
      loadMore(arg) {
        this.$ajax.post('https://www.easy-mock.com/mock/592e626b91470c0ac1fed9b6/products_1496212075258/moneylist#!method=post').then(res => {

        }).catch(err => {

        }).finally(() => {
          console.log('finally');
          for (let i = 0; i < 5; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 20) {
            this.options.loadMoreFinished = true;
          }
        })
      }
    },
    components: {
      LoadMore,
      Icon
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/font/iconfont.css';

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


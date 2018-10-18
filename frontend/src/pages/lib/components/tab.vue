<template>
  <div>
    <ed-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="changeFn"
    ></ed-tab>
    <div style="backgroundColor: #fff">
      <div v-if="selectedId === 0" class="tab-item">
        000000000
      </div>
      <div v-if="selectedId === 1" class="tab-item">
        11111111
      </div>
      <div v-if="selectedId === 2" class="tab-item">
        22222
      </div>
      <div>
        <ed-tab
          v-model="subSelectedId"
          :items="subItems"
          :options="subOptions"
          @change="subChangeFn"
        >
        </ed-tab>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EdTab from "@/components/ed-tab/index";

  export default {
    data() {
      return {
        selectedId: 6,
        items: [
          {label: '首页', icon: 'iconfont icon-shenfenzheng'},
          {label: '推荐', icon: 'iconfont icon-shenfenzheng'},
          {label: 'Android', icon: 'iconfont icon-shenfenzheng'},
          {label: '前端'},
          {label: '后端'},
          {label: 'iOS'},
          {label: '产品'},
          {label: '人工智能'},
          {label: '设计'}
        ],
        options: {
          canViewItemNum: 5,
          fixBottom: false,

          reBoundingDuration: 0,
          tabStyle: {},
          activeStyle: {
            color: '#f58323',
            fontSize: '15px'
          }
        },
        subSelectedId: 2,
        subItems: [
          {label: '全部提成'},
          {label: '销售提成'},
          {label: '施工提成'},
          {label: '美容卡提成'}
        ],
        subOptions: {
          canViewItemNum: 4,
          activeStyle: {
            color: '#f58323'
          },
          fixBottom: false
        }
      };
    },
    components: {
      EdTab
    },
    methods: {
      changeFn(...args) {
        this.options.reBoundingDuration = 360;
        //this.options.openReBoundingBarDuration = true;
        this.selectedId = args[1];
        this.subSelectedId = 0;
        console.log(args);
      },
      subChangeFn(...args) {
        this.subSelectedId = args[1];
        console.log(args);
      }
    }
  };
</script>

<style lang="scss">
  .tab-item {
    padding: 10px;
    text-align: center;
  }
  .tabClassName {
    font-size: 12px;
  }
  .ativeClassName {
    font-size: 15px;
  }
</style>

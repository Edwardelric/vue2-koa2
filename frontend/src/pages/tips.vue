<template>
  <div class="tips">
    <ed-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="changeFn"
    ></ed-tab>
    <div v-if="selectedId === 0">
00
    </div>
    <div v-if="selectedId === 1">
      11
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EdTab from '../components/ed-tab';

  export default {
    data() {
      return {
        selectedId: 0,
        items: [
          {label: 'html+css3', },
          {label: 'test'},
          {label: 'Android'},
          {label: '前端'},
          {label: '后端'},
          {label: 'iOS'},
          {label: '产品'},
          {label: '人工智能'},
          {label: '设计'}
        ],
        options: {

        }
      };
    },
    created() {
    },
    components: {
      EdTab
    },
    methods: {
      changeFn(...args) {
        this.selectedId = args[1];
      }
    }
  }
</script>

<style lang="scss">
  .tips {
    height: 100%;
    background: #fff;
  }
</style>

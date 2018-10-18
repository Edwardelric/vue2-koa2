<template>
  <a class="ed-tab-item"
     :style="Object.assign({},
            $parent.tabStyle,
            calWidth,
            $parent.value === id ? $parent.activeStyle: {}
       )"
     @click="onItemClicked"
  >
    <div class="ed-tab-item-icon" v-if="$parent.fixBottom"><slot name="icon"></slot></div>
    <div class="ed-tab-item-label"><slot></slot></div>
  </a>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'EdTabItem',
    data() {
      return {
        id: (this.$parent.$children.length || 1) - 1
      };
    },
    methods: {
      onItemClicked() {
        this.$parent.$emit('input', this.id);
      }
    },
    computed: {
      calWidth() {
        let width = Math.floor(document.documentElement.clientWidth || document.body.clientWidth) / this.$parent.canViewItemNum;
        return {
          width: `${width}px`
        }
      }
    }
  };
</script>

<style lang="scss">
  .ed-tab-item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    color: #333;
    font-size: 14px;
    text-decoration: none;
    text-align: center;
    .ed-tab-item-icon {
      margin: 0 5px;
    }
  }
</style>

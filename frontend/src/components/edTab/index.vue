<template>
  <Tab
    v-model="selectedId"
    v-bind="options"
    @input="handleItemChanged"
  >
    <TabItem
      v-for="(item, index) in items"
      :key="index"
    >
      <span
        v-if="options.fixBottom && item.icon"
        slot="icon"
      >
        <i :class="item.icon"></i>
      </span>
      <span>{{item[labelkey]}}</span>
    </TabItem>
  </Tab>
</template>

<script type="text/ecmascript-6">
  import Tab from './tab.vue';
  import TabItem from './tabItem.vue';

  export default {
    name: 'EdTab',
    props: {
      value: {
        type: Number,
        default: 0,
        validator(value) {
          return value >= 0
        }
      },
      items: {
        type: Array,
        default() {
          return [];
        }
      },
      options: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        selectedId: this.value
      };
    },
    watch: {
      value(newValue, oldValue) {
        if (oldValue !== newValue) {
          this.selectedId = newValue;
        }
      }
    },
    components: {
      Tab,
      TabItem
    },
    computed: {
      labelkey() {
        return this.options.labelkey || 'label'
      }
    },
    methods: {
      handleItemChanged(index) {
        this.$emit('change', this.items[index], index);
      }
    }
  };
</script>

<style lang="scss">
</style>

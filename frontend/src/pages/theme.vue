<script type="text/ecmascript-6">
	export default {
	  name: 'theme',
    render(h) {

      const theme = this.$attrs;
      const merge = vNode => {
        if (!vNode.tag) {
          return;
        }
        if (vNode.componentOptions) {
          let props = vNode.componentOptions.propsData;
          props = Object.assign({}, theme, props);
          vNode.componentOptions.propsData = props;
        } else {
          if (!vNode.data) {
            return;
          }
          let attrs = vNode.data.attrs || {};
          attrs = Object.assign({}, theme, attrs);
          vNode.data.attrs = attrs;
        }
      };
      this.$slots.default.map(vNode => merge(vNode));
      Object.keys(this.$attrs).forEach(key => {
        this.$attrs[key] = null;
      })
      return this.$slots.default[0]
    }
	};
</script>

<style lang="scss">
</style>

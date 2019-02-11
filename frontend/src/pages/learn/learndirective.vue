<template>
  <div>
    <div v-jspang="color">{{num}}</div>
    <p>
      <button @click="add">ADD</button>
    </p>
    <div class="mount-point"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  beforeCreated  // 初始化之前
  created        // 创建完成
  beforeMount    // 挂载之前
  mointed        // 挂载
  beforeUpdate   // 数据更新之前
  updated        // 数据更新
  beforeDestroy  // 销毁之前
  destroyed      // 销毁


  Vue.directive('jspang', {
    bind(el, binding) {   // 被绑定
      console.log('1-bind');
      el.style = 'color:' + binding.value;
    },
    inserted() {  // 绑定到节点
      console.log('2-inserted');
    },
    update() {     // 组件更新
      console.log('3-update');
    },
    componentUpdated() {  // 组件更新完成
      console.log('4-componentUpdated');
    },
    unbind() {    // 解绑
      console.log('5-unbind')
    }
  });

	export default {
		data() {
			return {
			  message: 'hello world!',
        num: 0,
        color: 'green'
      };
		},
    mounted() {
      var authorExtend = Vue.extend({
        template: "<p><a :href='authorUrl'>{{authorName}}</a></p>",
        data() {
          return {
            authorName: 'jspang',
            authorUrl: 'http://jspang.com'
          }
        }
      });
      new authorExtend().$mount('.mount-point')
    },
    methods: {
		  add() {
		    this.num++;
      }
    }
	};
</script>

<style lang="scss">
</style>

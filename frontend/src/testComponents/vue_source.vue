<template>
    <div>
        <pre>
            function Vue(options) {
                this._init(optioins);
            }
            initGlobalAPI(Vue);
            Vue.prototype._init = function(options) {
                const vm = this;
                initLifecycle(vm);
                initEvents(vm);
                initRender(vm);
                callHook(vm, 'beforeCreate');
                initInjections(vm);
                initState(vm);
                initProvide(vm);
                callHook(vm, 'created')
                if (vm.$options.el) {
                    vm.$mount(vm.$options.el)
                }
            }
            initMixin(Vue)

            stateMixin(Vue)


            Vue.prototype.$on = function() {

            }
            Vue.prototype.$emit = function() {

            }
            eventMixin(Vue)
            

            Vue.prototype._update = function(vnode) {

            }
            lifecycleMixin(Vue)

            // compiler 编译成render函数， 返回虚拟dom 没有compiler只支持render写法
            // core 核心
            // platform 平台(web, weex)
            // server 服务端渲染
            // sfc  .vue 文件解析
            // shared 公用的方法和常量
        </pre>
    </div>
</template>

<script>
export default {
       
}
</script>
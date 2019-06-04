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
        </pre>
    </div>
</template>

<script>
export default {
       
}
</script>
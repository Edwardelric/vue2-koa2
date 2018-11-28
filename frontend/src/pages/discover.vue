<template>
  <div class="discover">
    <ed-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="changeFn"
    ></ed-tab>
    <div class="discover-content" v-if="selectedId === 0">
      <!--<pre>-->
      <!--"no-alert": 0,//禁止使用alert confirm prompt-->
      <!--"no-array-constructor": 2,//禁止使用数组构造器-->
      <!--"no-bitwise": 0,//禁止使用按位运算符-->
      <!--"no-caller": 1,//禁止使用arguments.caller或arguments.callee-->
      <!--"no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名-->
      <!--"no-class-assign": 2,//禁止给类赋值-->
      <!--"no-cond-assign": 2,//禁止在条件表达式中使用赋值语句-->
      <!--"no-console": 2,//禁止使用console-->
      <!--"no-const-assign": 2,//禁止修改const声明的变量-->
      <!--"no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)-->
      <!--"no-continue": 0,//禁止使用continue-->
      <!--"no-control-regex": 2,//禁止在正则表达式中使用控制字符-->
      <!--"no-debugger": 2,//禁止使用debugger-->
      <!--"no-delete-var": 2,//不能对var声明的变量使用delete操作符-->
      <!--"no-div-regex": 1,//不能使用看起来像除法的正则表达式/=foo/-->
      <!--"no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}-->
      <!--"no-dupe-args": 2,//函数参数不能重复-->
      <!--"no-duplicate-case": 2,//switch中的case标签不能重复-->
      <!--"no-else-return": 2,//如果if语句里面有return,后面不能跟else语句-->
      <!--"no-empty": 2,//块语句中的内容不能为空-->
      <!--"no-empty-character-class": 2,//正则表达式中的[]内容不能为空-->
      <!--"no-empty-label": 2,//禁止使用空label-->
      <!--"no-eq-null": 2,//禁止对null使用==或!=运算符-->
      <!--"no-eval": 1,//禁止使用eval-->
      <!--"no-ex-assign": 2,//禁止给catch语句中的异常参数赋值-->
      <!--"no-extend-native": 2,//禁止扩展native对象-->
      <!--"no-extra-bind": 2,//禁止不必要的函数绑定-->
      <!--"no-extra-boolean-cast": 2,//禁止不必要的bool转换-->
      <!--"no-extra-parens": 2,//禁止非必要的括号-->
      <!--"no-extra-semi": 2,//禁止多余的冒号-->
      <!--"no-fallthrough": 1,//禁止switch穿透-->
      <!--"no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.-->
      <!--"no-func-assign": 2,//禁止重复的函数声明-->
      <!--"no-implicit-coercion": 1,//禁止隐式转换-->
      <!--"no-implied-eval": 2,//禁止使用隐式eval-->
      <!--"no-inline-comments": 0,//禁止行内备注-->
      <!--"no-inner-declarations": [2, "functions"],//禁止在块语句中使用声明（变量或函数）-->
      <!--"no-invalid-regexp": 2,//禁止无效的正则表达式-->
      <!--"no-invalid-this": 2,//禁止无效的this，只能用在构造器，类，对象字面量-->
      <!--"no-irregular-whitespace": 2,//不能有不规则的空格-->
      <!--"no-iterator": 2,//禁止使用__iterator__ 属性-->
      <!--"no-label-var": 2,//label名不能与var声明的变量名相同-->
      <!--"no-labels": 2,//禁止标签声明-->
      <!--"no-lone-blocks": 2,//禁止不必要的嵌套块-->
      <!--"no-lonely-if": 2,//禁止else语句内只有if语句-->
      <!--"no-loop-func": 1,//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）-->
      <!--"no-mixed-requires": [0, false],//声明时不能混用声明类型-->
      <!--"no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格-->
      <!--"linebreak-style": [0, "windows"],//换行风格-->
      <!--"no-multi-spaces": 1,//不能用多余的空格-->
      <!--"no-multi-str": 2,//字符串不能用\换行-->
      <!--"no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行-->
      <!--"no-native-reassign": 2,//不能重写native对象-->
      <!--"no-negated-in-lhs": 2,//in 操作符的左边不能有!-->
      <!--"no-nested-ternary": 0,//禁止使用嵌套的三目运算-->
      <!--"no-new": 1,//禁止在使用new构造一个实例后不赋值-->
      <!--"no-new-func": 1,//禁止使用new Function-->
      <!--"no-new-object": 2,//禁止使用new Object()-->
      <!--"no-new-require": 2,//禁止使用new require-->
      <!--"no-new-wrappers": 2,//禁止使用new创建包装实例，new String new Boolean new Number-->
      <!--"no-obj-calls": 2,//不能调用内置的全局对象，比如Math() JSON()-->
      <!--"no-octal": 2,//禁止使用八进制数字-->
      <!--"no-octal-escape": 2,//禁止使用八进制转义序列-->
      <!--"no-param-reassign": 2,//禁止给参数重新赋值-->
      <!--"no-path-concat": 0,//node中不能使用__dirname或__filename做路径拼接-->
      <!--"no-plusplus": 0,//禁止使用++，&#45;&#45;-->
      <!--"no-process-env": 0,//禁止使用process.env-->
      <!--"no-process-exit": 0,//禁止使用process.exit()-->
      <!--"no-proto": 2,//禁止使用__proto__属性-->
      <!--"no-redeclare": 2,//禁止重复声明变量-->
      <!--"no-regex-spaces": 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/-->
      <!--"no-restricted-modules": 0,//如果禁用了指定模块，使用就会报错-->
      <!--"no-return-assign": 1,//return 语句中不能有赋值表达式-->
      <!--"no-script-url": 0,//禁止使用javascript:void(0)-->
      <!--"no-self-compare": 2,//不能比较自身-->
      <!--"no-sequences": 0,//禁止使用逗号运算符-->
      <!--"no-shadow": 2,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名-->
      <!--"no-shadow-restricted-names": 2,//严格模式中规定的限制标识符不能作为声明时的变量名使用-->
      <!--"no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格-->
      <!--"no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]-->
      <!--"no-sync": 0,//nodejs 禁止同步方法-->
      <!--"no-ternary": 0,//禁止使用三目运算符-->
      <!--"no-trailing-spaces": 1,//一行结束后面不要有空格-->
      <!--"no-this-before-super": 0,//在调用super()之前不能使用this或super-->
      <!--"no-throw-literal": 2,//禁止抛出字面量错误 throw "error";-->
      <!--"no-undef": 1,//不能有未定义的变量-->
      <!--"no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined-->
      <!--"no-undefined": 2,//不能使用undefined-->
      <!--"no-unexpected-multiline": 2,//避免多行表达式-->
      <!--"no-underscore-dangle": 1,//标识符不能以_开头或结尾-->
      <!--"no-unneeded-ternary": 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;-->
      <!--"no-unreachable": 2,//不能有无法执行的代码-->
      <!--"no-unused-expressions": 2,//禁止无用的表达式-->
      <!--"no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数-->
      <!--"no-use-before-define": 2,//未定义前不能使用-->
      <!--"no-useless-call": 2,//禁止不必要的call和apply-->
      <!--"no-void": 2,//禁用void操作符-->
      <!--"no-var": 0,//禁用var，用let和const代替-->
      <!--"no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],//不能有警告备注-->
      <!--"no-with": 2,//禁用with-->

      <!--"array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格-->
      <!--"arrow-parens": 0,//箭头函数用小括号括起来-->
      <!--"arrow-spacing": 0,//=>的前/后括号-->
      <!--"accessor-pairs": 0,//在对象中使用getter/setter-->
      <!--"block-scoped-var": 0,//块语句中使用var-->
      <!--"brace-style": [1, "1tbs"],//大括号风格-->
      <!--"callback-return": 1,//避免多次调用回调什么的-->
      <!--"camelcase": 2,//强制驼峰法命名-->
      <!--"comma-dangle": [2, "never"],//对象字面量项尾不能有逗号-->
      <!--"comma-spacing": 0,//逗号前后的空格-->
      <!--"comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾-->
      <!--"complexity": [0, 11],//循环复杂度-->
      <!--"computed-property-spacing": [0, "never"],//是否允许计算后的键名什么的-->
      <!--"consistent-return": 0,//return 后面是否允许省略-->
      <!--"consistent-this": [2, "that"],//this别名-->
      <!--"constructor-super": 0,//非派生类不能调用super，派生类必须调用super-->
      <!--"curly": [2, "all"],//必须使用 if(){} 中的{}-->
      <!--"default-case": 2,//switch语句最后必须有default-->
      <!--"dot-location": 0,//对象访问符的位置，换行的时候在行首还是行尾-->
      <!--"dot-notation": [0, { "allowKeywords": true }],//避免不必要的方括号-->
      <!--"eol-last": 0,//文件以单一的换行符结束-->
      <!--"eqeqeq": 2,//必须使用全等-->
      <!--"func-names": 0,//函数表达式必须有名字-->
      <!--"func-style": [0, "declaration"],//函数风格，规定只能使用函数声明/函数表达式-->
      <!--"generator-star-spacing": 0,//生成器函数*的前后空格-->
      <!--"guard-for-in": 0,//for in循环要用if语句过滤-->
      <!--"handle-callback-err": 0,//nodejs 处理错误-->
      <!--"id-length": 0,//变量名长度-->
      <!--"indent": [2, 4],//缩进风格-->
      <!--"init-declarations": 0,//声明时必须赋初值-->
      <!--"key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格-->
      <!--"lines-around-comment": 0,//行前/行后备注-->
      <!--"max-depth": [0, 4],//嵌套块深度-->
      <!--"max-len": [0, 80, 4],//字符串最大长度-->
      <!--"max-nested-callbacks": [0, 2],//回调嵌套深度-->
      <!--"max-params": [0, 3],//函数最多只能有3个参数-->
      <!--"max-statements": [0, 10],//函数内最多有几个声明-->
      <!--"new-cap": 2,//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用-->
      <!--"new-parens": 2,//new时必须加小括号-->
      <!--"newline-after-var": 2,//变量声明后是否需要空一行-->
      <!--"object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格-->
      <!--"object-shorthand": 0,//强制对象字面量缩写语法-->
      <!--"one-var": 1,//连续声明-->
      <!--"operator-assignment": [0, "always"],//赋值运算符 += -=什么的-->
      <!--"operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首-->
      <!--"padded-blocks": 0,//块语句内行首行尾是否要空行-->
      <!--"prefer-const": 0,//首选const-->
      <!--"prefer-spread": 0,//首选展开运算-->
      <!--"prefer-reflect": 0,//首选Reflect的方法-->
      <!--"quotes": [1, "single"],//引号类型 `` "" ''-->
      <!--"quote-props":[2, "always"],//对象字面量中的属性名是否强制双引号-->
      <!--"radix": 2,//parseInt必须指定第二个参数-->
      <!--"id-match": 0,//命名检测-->
      <!--"require-yield": 0,//生成器函数必须有yield-->
      <!--"semi": [2, "always"],//语句强制分号结尾-->
      <!--"semi-spacing": [0, {"before": false, "after": true}],//分号前后空格-->
      <!--"sort-vars": 0,//变量声明时排序-->
      <!--"space-after-keywords": [0, "always"],//关键字后面是否要空一格-->
      <!--"space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格-->
      <!--"space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格-->
      <!--"space-in-parens": [0, "never"],//小括号里面要不要有空格-->
      <!--"space-infix-ops": 0,//中缀操作符周围要不要有空格-->
      <!--"space-return-throw-case": 2,//return throw case后面要不要加空格-->
      <!--"space-unary-ops": [0, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格-->
      <!--"spaced-comment": 0,//注释风格要不要有空格什么的-->
      <!--"strict": 2,//使用严格模式-->
      <!--"use-isnan": 2,//禁止比较时使用NaN，只能用isNaN()-->
      <!--"valid-jsdoc": 0,//jsdoc规则-->
      <!--"valid-typeof": 2,//必须使用合法的typeof的值-->
      <!--"vars-on-top": 2,//var必须放在作用域顶部-->
      <!--"wrap-iife": [2, "inside"],//立即执行函数表达式的小括号风格-->
      <!--"wrap-regex": 0,//正则表达式字面量用小括号包起来-->
      <!--"yoda": [2, "never"]//禁止尤达条件-->
      <!--</pre>-->
    </div>
    <div class="discover-content" v-if="selectedId === 1">
      <table>
        <tr>
          <td>/</td>
          <td>rollup 如何启动 vue 项目</td>
        </tr>
        <tr>
          <td>line: 4649</td>
          <td>
            <p>initMixin(Vue$3)</p>
            <p>Vue.prototype._init;</p>
          </td>
        </tr>
        <tr>
          <td>line: 4516</td>
          <td>
            <p>window.performance</p>
            <p>window.performance.mark('开始标识符')</p>
            <p>window.performance.mark('结束标识符')</p>
            <p>window.performance.measure('measureName', '开始标识符', '结束标识符')</p>
            <p>window.performance.getEntriesByName('measureName') 获取加载性能数据</p>
          </td>
        </tr>
        <tr>
          <td>line: 4650</td>
          <td>
            <p>stateMixin(Vue$3);</p>
            <p>Vue.prototype.$data;</p>
            <p>Vue.prototype.$props;</p>
            <p>Vue.prototype.$set = set;</p>
            <p>Vue.prototype.$delete = delete;</p>
            <p>Vue.prototype.$watch;</p>
          </td>
        </tr>
        <tr>
          <td>line: 4651</td>
          <td>
            <p>eventsMixin(Vue$3);</p>
            <p>Vue.prototype.$on;</p>
            <p>Vue.prototype.$once;</p>
            <p>Vue.prototype.$off;</p>
            <p>Vue.prototype.$emit;</p>
          </td>
        </tr>
        <tr>
          <td>line: 4652</td>
          <td>
            <p>lifecycleMixin(Vue$3);</p>
            <p>Vue.prototype._update;</p>
            <p>Vue.prototype.$forceUpdate</p>
            <p>Vue.prototype.$destory</p>
          </td>
        </tr>
        <tr>
          <td>line: 4653</td>
          <td>
            <p>renderMixin(Vue$3);</p>
            <p>Vue.prototype.$nextTick;</p>
            <p>Vue.prototype._render;</p>
          </td>
        </tr>
        <tr>
          <td>line: 4988</td>
          <td>initGlobalAPI(Vue$3);</td>
        </tr>
        <tr>
          <td>line: 4955</td>
          <td>Vue.config => </td>
        </tr>
        <tr>
          <td>line: 4960</td>
          <td>Vue.util</td>
        </tr>
        <tr>
          <td>line: 4961</td>
          <td>Vue.util.warn: </td>
        </tr>
        <tr>
          <td>line: 4962</td>
          <td>Vue.util.extend</td>
        </tr>
        <tr>
          <td>line: 4963</td>
          <td>Vue.util.mergeOptions</td>
        </tr>
        <tr>
          <td>line: 4964</td>
          <td>Vue.util.defineReactive</td>
        </tr>
        <tr>
          <td>line: 4967</td>
          <td>Vue.set</td>
        </tr>
        <tr>
          <td>line: 4968</td>
          <td>Vue.delete</td>
        </tr>
        <tr>
          <td>line: 4969</td>
          <td>Vue.nextTick</td>
        </tr>
        <tr>
          <td>line: 4973</td>
          <td>
            <p>Vue.options.components</p>
            <p>Vue.options.directives</p>
            <p>Vue.options.filters</p>
          </td>
        </tr>
        <tr>
          <td>line: 4978</td>
          <td>Vue.options._base</td>
        </tr>
        <tr>
          <td>line: 4980</td>
          <td>Vue.options.components.KeepAlive</td>
        </tr>
        <tr>
          <td>line: 8404</td>
          <td>
            <p>var platformDirectives = {model: directive, show: show};</p>
            <p>extend(Vue$3.options.directives, platformDirectives);</p>
          </td>
        </tr>
        <tr>
          <td>line: 8405</td>
          <td>
            <p>var platformComponents = {Transition: Transition, TransitionGroup: TransitionGroup};</p>
            <p>extend(Vue$3.options.components, platformComponents);</p>
          </td>
        </tr>
        <tr>
          <td>line: 4982</td>
          <td>
            <p>initUse(Vue); => Vue.use 方法</p>
            <p>initMixin$1(Vue); => Vue.mixin 方法</p>
            <p>initExtend(Vue); => Vue.extend 方法</p>
            <p>initAssetRegisters(Vue); => Vue.component、 Vue.direction、 Vue.filter</p>
          </td>
        </tr>
        <tr>
          <td>line: 4688</td>
          <td>
            <pre>
            var Sub = function VueComponent (options) {
              this._init(options);
            };
            </pre>
            <p>Sub.prototype = Object.create(Super.prototype);</p>
            <p>return Sub</p>
          </td>
        </tr>
        <tr>
          <td>line: 4583</td>
          <td>
            <p>function resolveConstructorOptions (Ctor) {}除了传入的数据</p>
            <p>有 super 属性 说明是通过 Vue.extend()方法创建的子类</p>
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>line: 4506</td>
          <td>new Vue() => Vue.prototype._init</td>
        </tr>
        <tr>
          <td>line: 4528</td>
          <td>
            <p>resolveConstructorOptions(vm.constructor)</p>
            <p>返回 {components: {}, directives: {}, filters: {}, _base: {}}</p>
            <p>vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor),options || {}, vm);</p>
          </td>
        </tr>
        <tr>
          <td>line: 1436</td>
          <td>mergeOptions 函数解析:</td>
        </tr>
        <tr>
          <td>line: 1442</td>
          <td>
            <p>checkComponents(child);</p>
            <p>验证不规则组件名称: a-a | aA | AA</p>
            <p>组件最终引用 &lt;a-a&gt;&lt;\/a-a&gt;</p>
          </td>
        </tr>
        <tr>
          <td>line: 1449</td>
          <td>
            <p>normalizeProps(child, vm);</p>
            <p>如果是props: [] 数组形式的 就拼接到一个对象里面并且type为null</p>
            <p>如果是props: {} 对象形式的 就循环对象keyName，并将其存放在res 里</p>
            <p>最后返回转换成对象的props数据</p>
          </td>
        </tr>
        <tr>
          <td>line: 1450</td>
          <td>normalizeInject(child, vm);</td>
        </tr>
        <tr>
          <td>line: 1451</td>
          <td>normalizeDirectives(child);</td>
        </tr>
        <tr>
          <td>line: 1464</td>
          <td>mergeField(key)</td>
        </tr>
        <tr>
          <td>line: 1471</td>
          <td>
            <p>strats</p>
            <p>line: 1105 strats.el = strats.propsData</p>
            <p>line: 1181 strats.data  line: 1140  => line: 1164 mergedInstanceDataFn</p>
            <p>line: 1220 strats['beforeCreate','created','beforeMount','mounted','beforeUpdate','updated','beforeDestroy','destroyed','activated','deactivated','errorCaptured'] | LIFECYCLE_HOOKS</p>
            <p>line: 1245 strats['component','directive','filter'] | ASSET_TYPES </p>
            <p>strats.watch</p>
            <p>strats.props = strats.methods = strats.inject = strats.computed</p>
            <p>strats.provide</p>
            <p>
              var defaultStrat = function (parentVal, childVal) {
              return childVal === undefined
              ? parentVal
              : childVal
              };
            </p>
          </td>
        </tr>
        <tr>
          <td>line: 4528</td>
          <td><pre>
          vm.$options = {
            components: {},
            directives: {},
            filters: {},
            el: '#app',
            data: function mergedInstanceDataFn() {},
            _base: function $Vue$3
          }
          </pre></td>
        </tr>
        <tr>
          <td>line: 4536</td>
          <td>
            <p>initProxy</p>
            <p>vm 添加 _renderProxy 方法</p>
            <pre>
            vm = {
              $options: {components: {}, directives: {}, filters: {}, created: [f]}
              _isVue: true,
              _renderProxy: Proxy,
              _uid: 0
              $data: ...
            }
            </pre>
          </td>
        </tr>
        <tr>
          <td>line: 4540</td>
          <td>
            <p>initLifecycle(vm); 初始化生命周期的数据</p>
            <p>vm.$root = parent ? parent.$root : vm;</p>
            <p>vm.$children = [];</p>
            <p>vm.$refs = {};</p>
            <p>vm._watcher = null;</p>
            <p>vm._inactive = null;</p>
            <p>vm._directInactive = false;</p>
            <p>vm._isMounted = false;</p>
            <p>vm._isDestroyed = false;</p>
            <p>vm._isBeingDestroyed = false;</p>
          </td>
        </tr>
        <tr>
          <td>line: 4541</td>
          <td>
            <p>initEvents(vm);</p>
            <p>vm._events = {};</p>
            <p>vm._hasHookEvent = false;</p>
            <p></p>
          </td>
        </tr>
        <tr>
          <td>line: 4542</td>
          <td>
            <p>initRender(vm);</p>
            <p>vm.$slots 设置</p>
            <p>vm.$scopedSlots 设置</p>
            <p>vm._c 设置</p>
            <p>vm.$createElement</p>
          </td>
        </tr>
        <tr>
          <td>line: 4421</td>
          <td>defineReactive 设置defineProperty 对象</td>
        </tr>
        <tr>
          <td>line: 4534</td>
          <td>callHook(vm, 'beforeCreate');</td>
        </tr>
        <tr>
          <td>line: 4544</td>
          <td>initInjections(vm);</td>
        </tr>
        <tr>
          <td>line: 4545</td>
          <td>initState(vm);</td>
        </tr>
        <tr>
          <td>line: 3282</td>
          <td>
            <p>initData(vm);</p>
            <p>data = vm._data = typeof data === 'function'          // 拼接data数据
              ? getData(data, vm)
              : data || {};
            </p>
            <p>获取原始数据并存放在vm._data数据中</p>
            <p>var keys = Object.keys(data); 获取定义的data keyName 并判断是否和props和methods keyName重复，如果有重复就报错提示</p>
          </td>
        </tr>
        <tr>
          <td>line: 3373</td>
          <td>
            <p>proxy(vm, "_data", key); 设置当前的vm.xx 会代理到vm._data 数据中</p>
            <p>Object.defineProperty(target, key, sharedPropertyDefinition); vm添加 new Vue()中的data的 key<=>value</p>
            <p>设置vm.keyName 代理到  vm._data.keyName, vm._data.keyName 数据是由mergeInData 函数的闭包返回</p>
          </td>
        </tr>
        <tr>
          <td>line: 3377</td>
          <td>
            <p>observe(data, true /* asRootData */);</p>
          </td>
        </tr>
        <tr>
          <td>line: 953</td>
          <td>
            <p>ob = new Observer(value);    // value = vm._data</p>
          </td>
        </tr>
        <tr>
          <td>line: 873</td>
          <td>
            <p>this.dep = new Dep();</p>
            <p>def(value, '__ob__', this);</p>
            <p>
              Object.defineProperty(vm._data, __ob__, {
                value: val,
                enumerbale: true,
                writable: true,
                configurable: true
              })
            </p>
            <p>
              vm._data = {
                原始的new Vue里面的key <=> value,
                __ob__: new Observe() 的实例对象
              }
            </p>
          </td>
        </tr>
        <tr>
          <td>line: 877</td>
          <td><pre>
          vm._data = {
            name: xxx,
            age: xxx,
            __ob__: {
              value: {name: xxx, age: xxx},
              dep: {},
              vmCount: 1
            }
          }
          </pre></td>
        </tr>
        <tr>
          <td>line: 883</td>
          <td>如果new Vue()里 data 是 数组 则走  this.observeArray(value);</td>
        </tr>
        <tr>
          <td>line: 885</td>
          <td>如果new Vue()里 data 不是数组 则走 this.walk(value);</td>
        </tr>
        <tr>
          <td>line: 894</td>
          <td>
            <p>Observer.prototype.walk</p>
            <p>defineReactive(obj, keys[i], obj[keys[i]]); </p>
            <p>obj => vm._data 的 keyName</p>
          </td>
        </tr>
        <tr>
          <td>line: 964</td>
          <td>
            <p>defineReactive 绑定 vm._data 里每个keyName 的get set 方法</p>
          </td>
        </tr>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td>line: 4546</td>
          <td>initProvide(vm)</td>
        </tr>
        <tr>
          <td>line: 4547</td>
          <td>callHook(vm, 'created');  触发定义的声明周期</td>
        </tr>
        <tr>
          <td>line: 4556</td>
          <td>vm.$mount(vm.$options.el);</td>
        </tr>
        <tr>
          <td>line: 10712</td>
          <td>
            <p>Vue$3.prototype.$mount</p>
          </td>
        </tr>
        <tr>
          <td>line: 9670</td>
          <td><pre>
            var baseOptions = {
              expectHTML: true,                     //是否期待为html
              modules: modules$1,                   // 对类和样式的解析
              directives: directives$1,             // v-model, v-html, v-text
              isPreTag: isPreTag,                   // 是否是pre标签
              isUnaryTag: isUnaryTag,               // 如果是单标签
              mustUseProp: mustUseProp,             // 使用props绑定的属性, value, selected
              canBeLeftOpenTag: canBeLeftOpenTag,   // 可以不闭合的标签， tr, td
              isReservedTag: isReservedTag,         // 是否保留标签， html标签和SVG标签
              getTagNamespace: getTagNamespace,     // 获取命名空间 svg和math
              staticKeys: genStaticKeys(modules$1)  // 静态关键词  包括 staticClass 和 staticStyle
            };
          </pre></td>
        </tr>
        <tr>
          <td>expectHTML</td>
          <td>是否期望html</td>
        </tr>
        <tr>
          <td>modules</td>
          <td>
            <p>[klass$1, style$1, model$2]</p>
          </td>
        </tr>
        <tr>
          <td>klass$1</td>
          <td>klass$1 = {
            staticKeys: ['staticClass'],
            transformNode: transformNode,
            genData: genData
          }</td>
        </tr>
        <tr>
          <td>style$1</td>
          <td>style$1 = {
            staticKeys: ['staticStyle'],
            transformNode: transformNode$1,
            genData: genData$1
          }</td>
        </tr>
        <tr>
          <td>model$2</td>
          <td>model$2 = {preTransformNode: preTransformNode}</td>
        </tr>
        <tr>
          <td>line: 10668</td>
          <td>
            <p>function createCompilerCreator() {
                return function createCompiler(){
                  function compile() {}
                  return {
                    compile: compile,
                    compiledToFunctions: createCompileToFunctionFn(compile)
                  }
                }
              }</p>
            <p>var createCompiler = createCompilerCreator(function baseCompile() {})</p>
            <p>return {ast, render, staticRenderFns}</p>
          </td>
        </tr>
        <tr>
          <td>line: 10672</td>
          <td>line: 10647 调用 var ast = parse(template.trim(), options);  // template 生成 ast 抽象语法树</td>
        </tr>
        <tr>
          <td>line: 8964</td>
          <td>function parse() {}</td>
        </tr>
        <tr>
          <td>line: 9009</td>
          <td>function parseHTML() {}</td>
        </tr>
        <tr>
          <td>line: 9028</td>
          <td>var element = createASTElement(tag, attrs, currentParent);</td>
        </tr>
        <tr>
          <td>line: 9060</td>
          <td>
            <p>processFor(element);</p>
            <p>processIf(element);</p>
            <p>processOnce(element);</p>
            <p>processElement(element, options);</p>
          </td>
        </tr>
        <tr>
          <td>line: 10674</td>
          <td>optimize(ast, options);</td>
        </tr>
        <tr>
          <td>line: 9706</td>
          <td>
            <p>标记所有的静态和非静态节点</p>
            <p>markStatic$1(root);</p>
            <p>markStaticRoots(root, false);</p>
            <p>给各个节点上</p>
          </td>
        </tr>
        <tr>
          <td>line: 9983</td>
          <td>var code = ast ? genElement(ast, state) : '_c("div")';</td>
        </tr>
        <tr>
          <td>line: 10025</td>
          <td>递归根据ast生成state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));</td>
        </tr>
        <tr>
          <td>line: 10676</td>
          <td>var code = generate(ast, options);</td>
        </tr>
        <tr>
          <td>line: 9449</td>
          <td>addHandler(el, name, value, modifiers, false, warn$2);</td>
        </tr>
        <tr>
          <td>line: 10009</td>
          <td>
            <p>var data = el.plain ? undefined : genData$2(el, state); </p>
            <p>line: 9858  function genHandler (){} 修饰符代码控制</p>
            <p>vue code 代码生成</p>
          </td>
        </tr>
        <tr>
          <td>line: 10766</td>
          <td>
            <p>var render = ref.render</p>
            <p>options.render = render</p>
            <p>就ast转换为vue的dom字符串(_with(xxx))后，render绑定到vm.$options.xxx</p>
          </td>
        </tr>
        <tr>
          <td>line: 10777</td>
          <td>mount.call(this, el, hydrating)</td>
        </tr>
        <tr>
          <td>line: 2716</td>
          <td>
            <p>function mountComponent () {}</p>
            <p>callHook(vm, 'beforeMount');</p>
          </td>
        </tr>
        <tr>
          <td>line: 2765</td>
          <td>vm._update(vm._render(), hydrating);</td>
        </tr>
        <tr>
          <td>line: 4465</td>
          <td>
            <p>vnode = render.call(vm._renderProxy, vm.$createElement);</p>
            <p>Vue.prototype._render = function () {}</p>
            <p>vnode = render.call(vm._renderProxy, vm.$createElement);</p>
          </td>
        </tr>
        <tr>
          <td>line: 4413</td>
          <td>
            <p>vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };</p>
            <p>line: 4278</p>
            <p>function createElement () {}</p>
          </td>
        </tr>
        <tr>
          <td>line: 4294</td>
          <td>
            <p>return _createElement(context, tag, data, children, normalizationType)</p>
          </td>
        </tr>
        <tr>
          <td>line: 4297</td>
          <td>
            <p>判断tag是否存在，不存在返回一个空的VNode</p>
          </td>
        </tr>
        <tr>
          <td>line: 4357</td>
          <td>vnode = createComponent(Ctor, data, context, children, tag);</td>
        </tr>
        <tr>
          <td>line: 4357</td>
          <td>
            <p>vnode = createComponent(Ctor, data, context, children, tag);</p>
            <p>如果是component 在创建</p>
          </td>
        </tr>
        <tr>
          <td>line: 5499</td>
          <td>i(vnode, false /* hydrating */, parentElm, refElm) 初始化init方法</td>
        </tr>
        <tr>
          <td>line: 4217</td>
          <td>function createComponentInstanceForVnode(){} 生成 component</td>
        </tr>
        <tr>
          <td>line: 4526</td>
          <td>initInternalComponent(vm, options); </td>
        </tr>
        <tr>
          <td>line: 4362</td>
          <td>new VNode()</td>
        </tr>
        <tr>
          <td>line: 4357</td>
          <td>vnode = createComponent(Ctor, data, context, children, tag);</td>
        </tr>
        <tr>
          <td>line: 4172</td>
          <td>var propsData = extractPropsFromVNodeData(data, Ctor, tag); 父子关系的props数据关联</td>
        </tr>
        <tr>
          <td>line: 2765</td>
          <td>vm._update(vm._render(), hydrating);</td>
        </tr>
        <tr>
          <td>line: 4497</td>
          <td>
          <pre>
          vnode.parent = _parentVnode;
          return vnode
          </pre>
          </td>
        </tr>
        <tr>
          <td>line: 2622</td>
          <td>function lifecycleMixin (Vue) {}</td>
        </tr>
        <tr>
          <td>line: 8409</td>
          <td>Vue$3.prototype.__patch__ = inBrowser ? patch : noop;</td>
        </tr>
        <tr>
          <td>line: 7819</td>
          <td>
            <p>var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });</p>
            <pre>
            var nodeOps = Object.freeze({
              createElement: createElement$1,
              createElementNS: createElementNS,
              createTextNode: createTextNode,
              createComment: createComment,
              insertBefore: insertBefore,
              removeChild: removeChild,
              appendChild: appendChild,
              parentNode: parentNode,
              nextSibling: nextSibling,
              tagName: tagName,
              setTextContent: setTextContent,
              setAttribute: setAttribute
            });
            </pre>
            <pre>
            var modules = platformModules.concat(baseModules);
            </pre>
          </td>
        </tr>
        <tr>
          <td>line: 3113</td>
          <td>
            <p>value = this.getter.call(vm, vm)</p>
          </td>
        </tr>
        <tr>
          <td>line: 2637</td>
          <td>
          <pre>
          vm.$el = vm.__patch__(
            vm.$el, vnode, hydrating, false /* removeOnly */,
            vm.$options._parentElm,
            vm.$options._refElm
          );
          </pre>
          </td>
        </tr>
        <tr>
          <td>line: 5471</td>
          <td>
            <p>setScope(vnode);</p>
            <p>如果css有使用scope的话，那么就设置scope</p>
          </td>
        </tr>
        <tr>
          <td>line: 5487</td>
          <td>insert(parentElm, vnode.elm, refElm);</td>
        </tr>
        <tr>
          <td>line: 2765</td>
          <td>callHook(vm, 'mounted');</td>
        </tr>
        <tr>
          <td>line: 5987</td>
          <td>patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);</td>
        </tr>
        <tr>
          <td>line: 5827</td>
          <td>if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)</td>
        </tr>
        <tr>
          <td>line: 3504</td>
          <td>vm[key] = methods[key] == null ? noop : bind(methods[key], vm)</td>
        </tr>
        <tr>
          <td>line: 9009</td>
          <td>parseHTML</td>
        </tr>
        <tr>
          <td>line: 9064</td>
          <td>processElement => line: 9227 processAttrs => line: 9447 onRE.test(name)</td>
        </tr>
        <tr>
          <td>line: 9009</td>
          <td>
          <pre>
          processFor(element);
          processIf(element);
          processOnce(element);
          </pre>
          </td>
        </tr>
        <tr>
          <td>line: 9214</td>
          <td>processElement(element, options);</td>
        </tr>
      </table>

      <table>
        <tr>
          <td>步骤</td>
        </tr>
        <tr>
          <td>var vm = new Vue()</td>
        </tr>
        <tr>
          <td>vm.$options = {data: fn, components: {}, directives, filter: {}, _base: {}}</td>
        </tr>
        <tr>
          <td>vm._self = vm</td>
        </tr>
        <tr>
          <td>
            <p>vm.$parent = parent;</p>
            <p>vm.$root = parent ? parent.$root : vm;</p>
            <p>vm.$children = [];</p>
            <p>vm.$refs = {};</p>
            <p>vm._watcher = null;</p>
            <p>vm._inactive = null;</p>
            <p>vm._directInactive = false;</p>
            <p>vm._isMounted = false;</p>
            <p>vm._isDestroyed = false;</p>
            <p>vm._isBeingDestroyed = false;</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>vm._events = Object.create(null);</p>
            <p>vm._hasHookEvent</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>vm._vnode = null;</p>
            <p>vm._staticTrees</p>
            <p>vm.$slots</p>
            <p>vm.$scopedSlots</p>
            <p>vm._c</p>
            <p>vm.$createElement</p>
            <p>vm.$attrs</p>
            <p>vm.$listeners</p>
          </td>
        </tr>
        <tr>
          <td>call beforeCreate</td>
        </tr>
        <tr>
          <td>
            <p>vm._watchers</p>
            <p>vm._data = new Vue() 里定义的data</p>
            <p>proxy(vm, "_data", key); vm[new Vue()里的data的keyName] = value</p>
            <p>proxy 就是负责 关联 vm.keyName 到 vm._data[keyName]的方法</p>
          </td>
        </tr>
        <tr>
          <td>
            vm._data = {
              ...
              __ob__: new Observer()的实例对象
              keyName1: value1,
              keyName2: value2
            }
          </td>
        </tr>
        <tr>
          <td>

          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td>tips</td>
          <td>
            new Vue() => Vue$3.prototype.$mount
            如果 Vue 里面有 template 就将template作为Vnode 渲染
            如果 Vue 里面没有template 就将el的outhtml作为Vnode渲染
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EdTab from '../components/ed-tab';

	export default {
		data() {
			return {
        selectedId: 1,
        items: [
          {label: 'Eslint配置', },
          {label: 'vue源码'},
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
    components: {
      EdTab
    },
    methods: {
		  changeFn(...args) {
        this.selectedId = args[1];
      }
    },
    destroy() {
		  console.log('1231')
    }
	};
</script>

<style lang="scss">
  .discover {
    background: #fff;
    font-size: 14px;
    line-height: 16px;
    .discover-content {
      padding: 10px 0;
      line-height: 30px;
      table {
        width: 100%;
      }
      table, tr, td {
        border: 1px solid #ccc;
      }
      td {
        padding: 0 10px;
      }
    }
  }
</style>

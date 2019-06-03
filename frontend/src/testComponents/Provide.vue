<template>
    <div>
        test: {{name}}
        <div @click="testClFn">bus test</div>
        <div style="margin: 10px; border: 1px solid green;line-height: 20px;">
            <p>Tips: </p>
            <p>1. [provide, inject] 是跨祖孙间的单向数据传递</p>
            <p>2. inject内部是个while循环，逐层找到第一次匹配的inject里面的keyName</p>
            <p>3. inject 可以是数组</p>
            <p>4. $emit 为触发事件; $on 为监听需要触发的事件</p>
            <br/>>
            <h2>这里是provide测试: title:{{title.title}}</h2>
            <inject-com></inject-com>
        </div>
        <div @click="busClickEvent">bus click</div>
        <br/>
        <!-- <inject-com></inject-com> -->
    </div>
</template>

<script>
import InjectCom from './Inject';
export default {
    name: 'Provide',
    inject: ['title'],
    provide() {
        return {
            age: 12,
            title: 'testEdward'
        }
    },
    data() {
        return {
            name: 'edward'
        }
    },
    components: {
        InjectCom
    },
    created() {
        // this.title = 'test'
    },
    mounted() {
        console.log(this);
        this.$on('dispatch', this.msgFn)
        // console.log('Provider')
        // console.log(this)
        this.$on('boardcast', data => {
            console.log(data);
        })
        this.$bus.$on('busText',() => {
            console.log('33')
            this.name = 33;
        });
    },
    methods: {
        testClFn() {
            
        },
        msgFn() {
            console.log('msg')
        },
        busClickEvent() {
            this.$bus.$emit('busClick', 22);
        }
    }
}
</script>
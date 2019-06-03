<template>
    <div style="margin: 10px; border: 1px solid red;">
        <h2>这里是inject测试</h2>
        <div>inject插入内容展示: title: {{title.title}}: age: {{age}}</div>
        <div @click="clickTest">click test emit</div>
        <div @click="busTest">bus emit test</div>
    </div>
</template>

<script>
export default {
    name: 'Inject',
    inject: ['title', 'age'],
    mounted() {
        // console.log(this._events);
        // console.log('inject')
        // console.log(this)
        this.$on('boardcast', data => {
            console.log(data);
        })
    },
    methods: {
        busTest() {
            console.log('22');
            this.$bus.$emit('busText')
        },
        clickTest() {
            // console.log(this._events)
            // this.$emit('goTo', 'aa')
            this.$dispatch('dispatch', 22);
        }
    }
}
</script>
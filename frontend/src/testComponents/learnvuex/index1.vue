<template>
    <div>
        <!-- <p>测试数量: {{$kstore.state.count}}</p> -->
        <p>测试数量:{{countNum}}</p>
        <button @click="add">添加一个</button>
        <button @click="addAsync">异步添加一个</button>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        console.log(this)
    },
    methods: {
        add: function() {
            this.$kstore.commit('increment');
        },
        addAsync() {
            this.$kstore.dispatch('incrementAsync')
        }
    },
    computed: {
        countNum() {
            return this.$kstore.getters.killCount;
        }
    }
}
</script>
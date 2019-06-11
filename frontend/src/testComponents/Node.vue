<template>
    <ul class="node">
        <li>
            <span>{{data.title}}</span>
            <Node v-for="(item, index) in data.children" :key="index" :data="item"></Node>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Node',
    props: ['data']
}
</script>

<style>

    .node ul {
        padding-left: 10px;
        list-style-type: disc;
    }
    .node li {
        list-style-type: circle;
    }
</style>
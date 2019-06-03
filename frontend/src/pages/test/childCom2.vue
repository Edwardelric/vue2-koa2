<template>
    <div class="border">
        <p>boo: {{ boo }}</p>
        <p>childCom2: {{ $attrs }}</p>
        <child-com3 v-bind="$attrs" v-on="$listeners"></child-com3>
    </div>
</template>

<script type="text/ecmascript-6">
	import childCom3 from './childCom3.vue';
	export default {
		components: {
			childCom3
		},
		inheritAttrs: false,
		props: {
			boo: String
		},
		created() {
			console.log(this.$listeners)
			console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "前端工匠" }
		}
	};
</script>

<style lang="scss">
</style>

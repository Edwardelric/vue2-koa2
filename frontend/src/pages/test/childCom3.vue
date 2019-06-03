<template>
    <div class="border">
        <p @click="callOwnupdate">childCom3: {{ $attrs }}</p>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			coo: String,
			title: String
		},
		data() {
			return {};
		},
        methods: {
	        callOwnupdate() {
	        	this.$emit('ownupdate')
            }
        }
	};
</script>

<style lang="scss">
</style>

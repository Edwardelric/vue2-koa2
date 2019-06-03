<template>
    <div>
        <input :type="type" :value="value" @blur="onBlur" @input="onInput" style="border: 1px solid green">
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        }
    },
    methods: {
        onBlur(e) {
            this.$dispatch('validate');
        },
        onInput(e) {
            this.$emit('input', e.target.value);
            this.$dispatch('validate');
        }
    }
}
</script>
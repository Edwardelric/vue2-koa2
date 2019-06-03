<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <p v-if="error" style="color: red">
            {{error}}
        </p>
    </div>
</template>

<script>
export default {
    inject: ['form'],
    props: {
        label: {
            type: String
        },
        prop: {
            type: String
        }
    },
    data() {
        return {
            error: ''
        }
    },
    mounted() {
        this.$on('validate', this.validate);
    },
    methods: {
        validate() {
            const rules = this.form.rules[this.prop];
            const value = this.form.model[this.prop];
            const descriptor = {[this.prop]: rules}
            const schema = new Schema(descriptor)
            return schema.validate({[this.prop]:value}, errors => {
                if (errors) {
                    this.error = errors[0].message;
                } else {
                    this.error = '';
                }
            })
        }
    }
}
</script>
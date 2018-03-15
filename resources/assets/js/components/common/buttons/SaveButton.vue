<template>
    <el-button type="success" :v-loading.fullscreen.lock="saving" @click="save">{{ label }}</el-button>
</template>

<script>
    export default {
        data () {
            return {
                saving: false
            };
        },

        props: {
            model: {
                type: Object,
                required: true
            },

            label: {
                type: String,
                default: 'Save'
            }
        },

        methods: {
            async save () {
                this.saving = true;
                await this.model.save();
                this.saving = false;

                this.$emit('saved', this.model);
            }
        }
    }
</script>

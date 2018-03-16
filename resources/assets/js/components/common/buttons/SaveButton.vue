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
            },

            action: {
                type: String,
                default: null
            }
        },

        methods: {
            async save () {
                this.saving = true;

                if (this.action) {
                    await this.$store.dispatch(this.action, this.model);
                    this.reportParent();
                } else {
                    await this.model.save();
                    this.reportParent();
                }
            },

            reportParent () {
                this.saving = false;
                this.$emit('saved', this.model);
            }
        }
    }
</script>

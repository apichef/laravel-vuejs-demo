<template>
    <el-button type="danger" :loading="destroying" @click="confirmDestroy">{{ label }}</el-button>
</template>

<script>
    export default {
        data () {
            return {
                destroying: false
            };
        },

        props: {
            model: {
                type: Object,
                required: true
            },

            label: {
                type: String,
                default: 'Delete'
            },

            confirmMessage: {
                type: String,
                default: 'Are you sure you want to delete this?'
            },

            action: {
                type: String,
                default: null
            }
        },

        methods: {
            async confirmDestroy () {
                try {
                    this.destroying = true;
                    await this.$confirm(this.confirmMessage, {
                        confirmButtonClass: 'el-button--danger',
                        type: 'Warning'
                    });
                    this.destroy();
                } catch (e) {
                    this.destroying = false;
                }
            },

            async destroy () {
                if (this.action) {
                    await this.$store.dispatch(this.action, this.model);
                    this.reportParent();
                } else {
                    await this.model.delete();
                    this.reportParent();
                }
            },

            reportParent () {
                this.destroying = false;
                this.$emit('deleted', this.model);
            }
        }
    }
</script>

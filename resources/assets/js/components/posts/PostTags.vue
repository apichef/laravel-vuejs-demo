<template>
    <el-form-item label="Tags">
        <el-select @change="change" v-model="selectedTags" value-key="id" placeholder="Choose tags for your article" multiple filterable>
            <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag"></el-option>
        </el-select>
    </el-form-item>
</template>

<script>
    import _ from 'lodash';
    import { mapState, mapActions } from 'vuex';

    export default {
        props: {
            post: {
                require: true,
                type: Object
            }
        },

        data() {
            return {
                selectedTags: []
            }
        },

        computed: {
            ...mapState('tags', {
                tags: 'all'
            })
        },

        created () {
            this.fetchTags();
            this.setSelectedTags();
        },

        watch: {
            post () {
                this.setSelectedTags();
            }
        },

        methods: {
            ...mapActions('tags', {
                fetchTags: 'fetchAll'
            }),

            ...mapActions('manage', [
                'syncPostTags'
            ]),

            async setSelectedTags () {
                this.selectedTags = this.post.tags.data;
            },

            change (tags) {
                this.syncPostTags({ post: this.post, tags: tags});
            }
        }
    }
</script>

<style lang="scss">
    .el-select {
        width: 100%;

        .el-select__tags {
            width: 100%;
        }
    }
</style>

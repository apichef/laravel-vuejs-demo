<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <posts-search-panel :target-post="targetPost" @selected="selectPost"></posts-search-panel>
        </el-col>

        <el-col :span="16">
            <post-form v-if="hasTargetPost" :post="targetPost"></post-form>
            <el-alert title="Select a post from left side panel to make changes." type="info" :closable="false" show-icon v-else></el-alert>
        </el-col>
    </el-row>
</template>

<script>
    import PostForm from './../posts/PostForm.vue';
    import PostsSearchPanel from './../posts/PostsSearchPanel.vue';

    export default {
        data () {
            return {
                targetPost: {}
            };
        },

        components: {
            PostForm,
            PostsSearchPanel
        },

        computed: {
            hasTargetPost () {
                return ! _.isEmpty(this.targetPost);
            }
        },

        methods: {
            selectPost (post) {
                this.targetPost = post;
            }
        }
    }
</script>

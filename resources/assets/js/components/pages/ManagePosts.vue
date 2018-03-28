<template>
    <el-row :gutter="20">

        <el-col :span="8">
            <filters></filters>

            <results :posts="posts" :active-post="activePost" @selected="setActivePost">
                <infinite-loading @infinite="fetchPosts"></infinite-loading>
            </results>
        </el-col>

        <el-col :span="16">
            <el-tabs v-if="hasActivePost" type="border-card" class="cool-shadow border-0">
                <el-tab-pane label="Preview">
                    <show :post="activePost"></show>
                </el-tab-pane>
                <el-tab-pane label="Edit Post">
                    <post-form :post="activePost" @saved="saved"></post-form>
                </el-tab-pane>
            </el-tabs>
            <el-alert title="Select a post from left side panel to make changes." type="info" :closable="false" class="cool-shadow border-0" show-icon v-else></el-alert>
        </el-col>

    </el-row>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';

    import Show from './../posts/Show.vue';
    import PostForm from './../posts/Form.vue';
    import Filters from './../posts/search/Filters.vue';
    import Results from './../posts/search/Results.vue';

    import InfiniteLoading from 'vue-infinite-loading';

    const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('manage');

    export default {
        components: {
            Show,
            Filters,
            Results,
            PostForm,
            InfiniteLoading
        },

        computed: {
            ...mapState(['posts', 'activePost', 'pagination']),
            ...mapGetters(['hasActivePost'])
        },

        methods: {
            ...mapMutations(['setActivePost']),

            async fetchPosts($state) {
                await this.$store.dispatch('manage/fetchNext');
                $state.loaded();

                if (this.posts.length === this.pagination.total) {
                    $state.complete();
                }
            },

            saved (post) {
                this.$notify({
                    message: 'Post saved successfully.',
                    type: 'success'
                });
            }
        }
    }
</script>

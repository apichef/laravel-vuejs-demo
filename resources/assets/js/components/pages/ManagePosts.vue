<template>
    <el-row :gutter="20">

        <el-col :span="8">
            <filters></filters>

            <results :posts="posts" :active-post="activePost" @selected="selectPost">
                <infinite-loading @infinite="fetchPosts"></infinite-loading>
            </results>
        </el-col>

        <el-col :span="16">
            <el-tabs v-if="hasActivePost" type="border-card" :class="'cool-shadow'">
                <el-tab-pane label="Preview">
                    <show :post="activePost"></show>
                </el-tab-pane>
                <el-tab-pane label="Edit Post">
                    <post-form :post="activePost" @deleted="deleted" @saved="saved"></post-form>
                </el-tab-pane>
            </el-tabs>
            <el-alert title="Select a post from left side panel to make changes." type="info" :closable="false" :class="'cool-shadow'" show-icon v-else></el-alert>
        </el-col>

    </el-row>
</template>

<script>
    import _ from 'lodash';
    import Post from './../../models/Post';
    import Show from './../posts/Show.vue';
    import PostForm from './../posts/Form.vue';
    import Filters from './../posts/search/Filters.vue';
    import Results from './../posts/search/Results.vue';
    import InfiniteLoading from 'vue-infinite-loading';

    const post = new Post();

    export default {
        data () {
            return {
                activePost: {},
                posts: [],
                page: 0,
                pagination: {
                    total: 0,
                    per_page: 8,
                    total_pages: 1
                }
            };
        },

        components: {
            Show,
            Filters,
            Results,
            PostForm,
            InfiniteLoading
        },

        computed: {
            hasActivePost () {
                return ! _.isEmpty(this.activePost);
            }
        },

        methods: {
            async fetchPosts($state) {
                if (this.page < this.pagination.total_pages) {
                    this.page++;

                    const result = await post.with(['author', 'tags'])
                        .orderByDesc('published_at')
                        .filter('my')
                        .paginate(this.pagination.per_page, this.page);

                    this.posts = _.concat(this.posts, result.data);
                    this.pagination = result.meta.pagination;
                    $state.loaded();

                    if (this.posts.length === this.pagination.total) {
                        $state.complete();
                    }
                }
            },

            selectPost (post) {
                this.activePost = post;
            },

            saved (post) {
                this.$notify({
                    message: 'Post saved successfully.',
                    type: 'success'
                });
            },

            deleted (post) {
                this.activePost = {};
                this.posts = _.reject(this.posts, { id: post.id });
            }
        }
    }
</script>

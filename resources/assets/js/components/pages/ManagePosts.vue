<template>
    <el-row :gutter="20">

        <el-col :span="8">
            <search></search>
            <search-result :posts="posts" :active-post="activePost" @selected="selectPost">
                <infinite-loading @infinite="fetchPosts"></infinite-loading>
            </search-result>
        </el-col>

        <el-col :span="16">
            <post-form v-if="hasActivePost" :post="activePost" @destroyed="destroyed"></post-form>
            <el-alert title="Select a post from left side panel to make changes." type="info" :closable="false" :class="'cool-shadow'" show-icon v-else></el-alert>
        </el-col>

    </el-row>
</template>

<script>
    import _ from 'lodash';
    import Post from './../../models/Post';
    import Search from './../posts/Search.vue';
    import PostForm from './../posts/PostForm.vue';
    import SearchResult from '../posts/SearchResult.vue';
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
            Search,
            PostForm,
            SearchResult,
            InfiniteLoading
        },

        computed: {
            hasActivePost () {
                return ! _.isEmpty(this.activePost);
            }
        },

        methods: {
            async fetchPosts ($state) {
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

            destroyed (post) {
                this.activePost = {};
                this.posts = _.reject(this.posts, { id: post.id });
            }
        }
    }
</script>

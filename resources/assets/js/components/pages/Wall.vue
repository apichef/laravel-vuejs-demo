<template>
    <el-row :gutter="20">

        <el-col :span="16" v-loading.fullscreen.lock="loading">
            <posts-list :posts="posts"></posts-list>
            <pagination :pagination="pagination" @current-change="fetchPosts"></pagination>
        </el-col>

        <el-col :span="8">
            <quick-links></quick-links>
        </el-col>

    </el-row>
</template>

<script>
    import Post from './../../models/Post';
    import PostsList from './../posts/PostsList.vue';

    const post = new Post();

    export default {
        data () {
            return {
                posts: [],
                pagination: {
                    total: 0,
                    per_page: 4
                },
                loading: true
            };
        },

        components: {
            PostsList
        },

        created () {
            this.fetchPosts(1);
        },

        methods: {
            async fetchPosts (page) {
                this.loading = true;

                const result = await post.with(['author', 'tags'])
                    .filter('published')
                    .orderByDesc('published_at')
                    .paginate(this.pagination.per_page, page);

                this.posts = result.data;
                this.pagination = result.meta.pagination;

                this.loading = false;
            }
        }
    }
</script>

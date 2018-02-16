<template>
    <el-row :gutter="20">

        <el-col :span="16">
            <posts-list :posts="posts"></posts-list>
            <pagination :pagination="pagination" @current-change="fetchPosts"></pagination>
        </el-col>

        <el-col :span="8">
            <div class="grid-content bg-purple"></div>
        </el-col>

    </el-row>
</template>

<script>
    import Post from './../../models/Post';
    import PostsList from './../posts/PostsList.vue';
    import Pagination from './../common/Pagination.vue';

    const post = new Post();

    export default {
        data () {
            return {
                posts: [],
                pagination: {
                    total: 0,
                    per_page: 4
                }
            };
        },

        components: {
            PostsList,
            Pagination
        },

        created () {
            this.fetchPosts(1);
        },

        methods: {
            async fetchPosts (page) {
                const result = await post.with(['author', 'tags']).paginate(this.pagination.per_page, page);
                this.posts = result.data;
                this.pagination = result.meta.pagination;
            }
        }
    }
</script>

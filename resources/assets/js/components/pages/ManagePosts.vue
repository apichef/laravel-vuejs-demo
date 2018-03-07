<template>
    <el-row :gutter="20">

        <el-col :span="16" v-loading.fullscreen.lock="loading">
            <el-table
                height="650"
                :data="posts">

                <el-table-column
                    prop="title"
                    label="Title">
                </el-table-column>

                <el-table-column
                    prop="full_date"
                    label="Date Published"
                    width="150">
                </el-table-column>

                <el-table-column
                    fixed="right"
                    label="Operations"
                    width="150">
                    <template slot-scope="scope">
                        <el-button @click="editPost(scope.row)" size="mini" type="primary" icon="el-icon-edit"></el-button>
                        <el-button @click="deletePost(scope.row)" size="mini" type="danger" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-col>

        <el-col :span="8">
            <quick-links></quick-links>
        </el-col>

    </el-row>
</template>

<script>
    import _ from 'lodash';
    import Post from './../../models/Post';
    import PostsList from './../posts/PostsList.vue';

    const post = new Post();

    export default {
        data () {
            return {
                posts: [],
                loading: true
            };
        },

        components: {
            PostsList
        },

        created () {
            this.fetchPosts();
        },

        methods: {
            async fetchPosts () {
                this.loading = true;

                const result = await post.with(['author', 'tags'])
                    .select(['title','published_at'])
                    .orderByDesc('published_at')
                    .filter('my')
                    .all();

                this.posts = result.data;

                this.loading = false;
            },

            editPost (post) {
                post.navigateToEditPage();
            },

            async deletePost (post) {
                console.log('delete', post);
                await post.delete();
                this.posts = _.reject(this.posts, { 'id': post.id });
            }
        }
    }
</script>

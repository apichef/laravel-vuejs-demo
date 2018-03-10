<template>
    <el-row :gutter="20">

        <el-col :span="8">
            <section class="cool-shadow posts-list">
                <div class="search list-group list-group-flush">
                    <div class="list-group-item">
                        <el-input placeholder="Search ..." v-model="query" suffix-icon="el-icon-search"></el-input>
                    </div>
                </div>
                <div class="list list-group list-group-flush">
                    <div class="list-group-item" v-for="post in posts" :key="post.id" @click.prevent="selectPost(post)" :class="{ active: post.id === selectedPost.id }">
                        <p class="card-title">{{ post.title }}</p>
                        <blockquote class="blockquote mb-0">
                            <footer class="blockquote-footer"><cite title="Source Title"> on {{ post.full_date }}</cite></footer>
                        </blockquote>
                    </div>
                    <infinite-loading @infinite="fetchPosts"></infinite-loading>
                </div>
            </section>
        </el-col>

        <el-col :span="16">
            <div class="card cool-shadow">
                <div class="card-header">
                    <p class="mt-2 mb-2"><i class="el-icon-edit ml-2 mr-2"></i> Manage Post</p>
                </div>
                <div class="card-body">
                    <el-form v-if="postSelected" ref="form" :model="selectedPost" label-position="top">
                        <el-form-item label="Title">
                            <el-input v-model="selectedPost.title"></el-input>
                        </el-form-item>
                        <el-form-item label="Subtitle">
                            <el-input type="textarea" v-model="selectedPost.subtitle"></el-input>
                        </el-form-item>
                        <el-form-item label="Body">
                            <el-input type="textarea" v-model="selectedPost.body" :rows="10"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="save">Save</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="mt-4 mb-4 text-center text-muted text-light" v-else>
                        <p>Select a post to edit. <i class="el-icon-info"></i></p>
                    </div>
                </div>
            </div>
        </el-col>

    </el-row>
</template>

<style lang="scss">
    @import "./../../../sass/variables";

    .posts-list {
        .search {
            input {
                border: none;
                background-color: $color-main-lightest;
            }

            .list-group-item {
                border: none;
                background-color: $color-main-lighter;
            }
        }

        .list {
            height: 60vh;
            overflow: scroll;

            .active {
                border-left: 4px solid $color-main-lighter;
            }
        }

        li {
            cursor: pointer;
        }
    }
</style>

<script>
    import _ from 'lodash';
    import Post from './../../models/Post';
    import PostsList from './../posts/PostsList.vue';
    import InfiniteLoading from 'vue-infinite-loading';

    const post = new Post();

    export default {
        data () {
            return {
                page: 0,
                query: '',
                posts: [],
                selectedPost: {},
                pagination: {
                    total: 0,
                    per_page: 8,
                    total_pages: 1
                },
                saving: false,
                value1: ''
            };
        },

        components: {
            PostsList,
            InfiniteLoading
        },

        computed: {
            postSelected () {
                return ! _.isEmpty(this.selectedPost);
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

            editPost (post) {
                post.navigateToEditPage();
            },

            async deletePost (post) {
                await post.delete();
                this.posts = _.reject(this.posts, { 'id': post.id });
            },

            async save () {
                this.saving = true;

                await this.selectedPost.save();

                this.saving = false;
            },

            selectPost (post) {
                this.selectedPost = post;
            }
        }
    }
</script>

<template>
    <section class="cool-shadow posts-list">
        <div class="search list-group list-group-flush">
            <div class="list-group-item">
                <el-input placeholder="Search ..." v-model="query" suffix-icon="el-icon-search"></el-input>
            </div>
        </div>
        <div class="list list-group list-group-flush">
            <div class="list-group-item" v-for="post in posts" :key="post.id" @click.prevent="selectPost(post)" :class="{ active: post.id === targetPost.id }">
                <p class="card-title">{{ post.title }}</p>
                <blockquote class="blockquote mb-0">
                    <footer class="blockquote-footer"><cite title="Source Title"> on {{ post.full_date }}</cite></footer>
                </blockquote>
            </div>
            <infinite-loading @infinite="fetchPosts"></infinite-loading>
        </div>
    </section>
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
    import InfiniteLoading from 'vue-infinite-loading';

    const post = new Post();

    export default {
        data () {
            return {
                page: 0,
                query: '',
                posts: [],
                pagination: {
                    total: 0,
                    per_page: 8,
                    total_pages: 1
                }
            };
        },

        props: {
            targetPost: {
                type: Object,
                required: true
            }
        },

        components: {
            InfiniteLoading
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
                this.$emit('selected', post);
            }
        }
    }
</script>

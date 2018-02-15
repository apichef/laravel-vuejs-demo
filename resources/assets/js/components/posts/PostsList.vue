<template>
    <el-row :gutter="20">

        <el-col :span="16">
            <div v-for="post in posts" :key="post.id" class="card mb-4">
                <div class="card-body">
                    <a :href="post.url"><h2 class="card-title">{{ post.title }}</h2></a>
                    <blockquote class="blockquote mb-0">
                        <p>{{ post.subtitle }}</p>
                        <footer class="blockquote-footer">by {{ post.author.name }} <cite title="Source Title"> on {{ post.full_date }}</cite></footer>
                        <div class="mt-2">
                            <span v-for="tag in post.tags.data" :key="tag.id" class="badge badge-secondary mr-2">#{{ tag.name }}</span>
                        </div>
                    </blockquote>
                </div>
            </div>

            <el-pagination
                layout="prev, pager, next"
                :total="pagination.total"
                :page-size="pagination.per_page"
                @current-change="fetchPosts">
            </el-pagination>
        </el-col>

        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>

    </el-row>
</template>

<style>
    .bg-purple {
        background: #d3dce6;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>

<script>
    import Post from './../../models/Post';

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

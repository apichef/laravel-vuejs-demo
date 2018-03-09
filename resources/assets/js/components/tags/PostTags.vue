<template>
    <section>
        <label>Tags</label>
        <br>
        <el-select @change="change" v-model="selectedTags" value-key="id" placeholder="Choose tags for your article" multiple filterable>
            <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag"></el-option>
        </el-select>
    </section>
</template>

<script>
    import _ from 'lodash';

    import Tag from './../../models/Tag';
    import Post from './../../models/Post';

    let tag = new Tag();
    let post = new Post();

    export default {
        props: {
            postId: {
                require: true,
                type: String
            }
        },

        data() {
            return {
                tags: [],
                selectedTags: [],
                post: {}
            }
        },

        created () {
            this.fetchTags();
            this.fetchPost(this.postId);
        },

        methods: {
            async fetchTags () {
                let result = await tag.all();
                this.tags = result.data;
            },

            async fetchPost (id) {
                let result = await post.with(['tags']).select({
                    posts: [],
                    tags: []
                }).find(id);
                this.post = result;
                this.selectedTags = result.tags.data;
            },

            change (data) {
                this.post.tags.data = data;
                this.post.sync('tags');
            }
        }
    }
</script>

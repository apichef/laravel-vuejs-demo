<template>
    <el-form ref="form" :model="model" label-position="top">
        <el-form-item label="Title" class="mb-0">
            <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="Subtitle" class="mb-0">
            <el-input type="textarea" v-model="model.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="Published or Schedule" class="mb-0">
            <el-date-picker type="date" v-model="model.published_at"></el-date-picker>
        </el-form-item>
        <el-form-item label="Body">
            <el-input type="textarea" v-model="model.body" :rows="10"></el-input>
        </el-form-item>
        <post-tags :post="post"></post-tags>
        <el-form-item class="m-0">
            <save-button :model="model" @saved="saved" action="manage/savePost"></save-button>
            <delete-button :model="model" action="manage/deletedPost"></delete-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import PostTags from './PostTags.vue';

    export default {
        data () {
            return {
                model: {}
            };
        },

        props: {
            post: {
                type: Object,
                required: true
            }
        },

        components: {
            PostTags
        },

        watch: {
            post (post) {
                this.model = post.clone();
            }
        },

        created () {
            this.model = this.post.clone();
        },

        methods: {
            saved (post) {
                this.$emit('saved', post);
            }
        }
    }
</script>

<template>
    <el-form ref="form" :model="post" label-position="top">
        <el-form-item label="Title" class="mb-0">
            <el-input v-model="post.title"></el-input>
        </el-form-item>
        <el-form-item label="Subtitle" class="mb-0">
            <el-input type="textarea" v-model="post.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="Published or Schedule" class="mb-0">
            <el-date-picker type="date" v-model="post.published_at"></el-date-picker>
        </el-form-item>
        <el-form-item label="Body">
            <el-input type="textarea" v-model="post.body" :rows="10"></el-input>
        </el-form-item>
        <el-form-item class="m-0">
            <save-button :model="post" @saved="saved"></save-button>
            <delete-button :model="post" @deleted="deleted"></delete-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        props: {
            post: {
                type: Object,
                required: true
            }
        },

        methods: {
            saved (post) {
                this.$emit('saved', post);
            },

            deleted (post) {
                this.$emit('deleted', post);
            }
        }
    }
</script>

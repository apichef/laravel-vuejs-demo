<template>
    <div class="card cool-shadow">
        <div class="card-header">
            <p class="mt-2 mb-2"><i class="el-icon-edit ml-2 mr-2"></i> Manage Post</p>
        </div>
        <div class="card-body">
            <el-form ref="form" :model="selectedPost" label-position="top">
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
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                selectedPost: {},
                saving: false
            };
        },

        props: {
            post: {
                type: Object,
                required: true
            }
        },

        created () {
            this.selectedPost = this.post;
        },

        methods: {
            async save () {
                this.saving = true;
                await this.post.save();
                this.saving = false;
            }
        }
    }
</script>

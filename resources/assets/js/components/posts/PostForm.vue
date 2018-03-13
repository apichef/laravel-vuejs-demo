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
                <el-form-item label="Date Published">
                    <el-date-picker type="date" v-model="selectedPost.published_at"></el-date-picker>
                </el-form-item>
                <el-form-item label="Body">
                    <el-input type="textarea" v-model="selectedPost.body" :rows="10"></el-input>
                </el-form-item>
                <el-form-item class="m-0">
                    <el-button type="success" :loading="saving" @click="save">Save</el-button>
                    <el-button type="danger" :loading="destroying" @click="confirmDestroy">Delete</el-button>
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
                saving: false,
                destroying: false
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

        watch: {
            post (post) {
                this.selectedPost = post;
            }
        },

        methods: {
            async save () {
                this.saving = true;
                await this.selectedPost.save();
                this.saving = false;
            },

            async confirmDestroy () {
                try {
                    this.destroying = true;
                    await this.$confirm('This will permanently delete the post. Continue?', {
                        confirmButtonClass: 'el-button--danger',
                        type: 'Warning'
                    });
                    this.destroy();
                } catch (e) {
                    this.destroying = false;
                }
            },

            async destroy () {
                await this.selectedPost.delete();
                this.destroying = false;
                this.$emit('destroyed', this.selectedPost);
            }
        }
    }
</script>

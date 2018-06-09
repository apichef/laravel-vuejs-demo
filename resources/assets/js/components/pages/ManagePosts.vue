<template>
    <el-row :gutter="20">

        <el-col :span="8">
            <section class="cool-shadow">
                <filters></filters>

                <results :posts="posts" :active-post="activePost" @selected="setActivePost">
                    <infinite-loading @infinite="fetchPosts"></infinite-loading>
                </results>

                <div class="list-group list-group-flush">
                    <div class="list-group-item p-2 text-center small">
                        <p class="mb-0">{{ posts.length }} of {{ pagination.total }} loaded.</p>
                    </div>
                </div>
            </section>
        </el-col>

        <el-col :span="16">
            <el-tabs v-if="hasActivePost" type="border-card" class="cool-shadow border-0">
                <el-tab-pane label="Preview">
                    <show :post="activePost"></show>
                </el-tab-pane>
                <el-tab-pane label="Edit Post">
                    <post-form :post="activePost" @saved="saved"></post-form>
                </el-tab-pane>
            </el-tabs>
            <el-alert title="Select a post from left side panel to make changes." type="info" :closable="false" class="cool-shadow border" show-icon v-else></el-alert>
        </el-col>

    </el-row>
</template>

<script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

    import Show from './../posts/Show.vue';
    import PostForm from './../posts/Form.vue';
    import Filters from './../posts/search/Filters.vue';
    import Results from './../posts/search/Results.vue';

    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        components: {
            Show,
            Filters,
            Results,
            PostForm,
            InfiniteLoading
        },

        computed: {
            ...mapState('manage', [
                'posts',
                'activePost',
                'pagination'
            ]),

            ...mapGetters('manage', [
                'hasActivePost'
            ])
        },

        methods: {
            ...mapMutations('manage', [
                'setActivePost'
            ]),

            ...mapActions('manage', [
                'fetchNext'
            ]),

            async fetchPosts($state) {
                await this.fetchNext();
                $state.loaded();

                if (this.posts.length === this.pagination.total) {
                    $state.complete();
                }
            },

            saved (post) {
                this.$notify({
                    message: 'Post saved successfully.',
                    type: 'success'
                });
            }
        }
    }
</script>

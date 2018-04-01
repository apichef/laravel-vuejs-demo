<template>
    <section class="border-0 posts-list">
        <div class="list list-group list-group-flush">
            <div class="list-group-item" v-for="post in posts" :key="post.id" @click.prevent="$emit('selected', post)" :class="{ active: post.id === activePost.id }">
                <post-summery :post="post"></post-summery>
            </div>
            <slot></slot>
        </div>
    </section>
</template>

<script>
    import PostSummery from './../PostSummery.vue';

    export default {
        props: {
            posts: {
                type: Array,
                required: true
            },
            activePost: {
                type: Object,
                required: true
            }
        },

        components: {
            PostSummery
        }
    }
</script>

<style lang="scss">
    @import "../../../../sass/variables";

    .posts-list {
        .list {
            height: 75vh;
            overflow: scroll;

            .active {
                border-left: 4px solid $color-main;
                background-color: $color-main-lighter;
            }
        }

        li {
            cursor: pointer;
        }
    }
</style>

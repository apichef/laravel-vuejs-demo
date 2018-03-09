<template>
    <article>
        <post-summery v-for="post in posts" :key="post.id" :post="post"></post-summery>
    </article>
</template>

<script>
    import PostSummery from './PostSummery.vue';

    export default {
        props: {
            posts: {
                type: Array,
                required: true
            }
        },

        components: {
            PostSummery
        }
    }
</script>

<template>
    <article>
        <div v-for="post in posts" :key="post.id" class="card cool-shadow border-0 mb-4">
            <div class="card-body">
                <post-summery :post="post"></post-summery>
            </div>
        </div>
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

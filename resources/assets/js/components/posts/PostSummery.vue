<template>
    <div class="post">
        <a :href="post.url"><a class="post-title">{{ post.title }}</a></a>
        <p>{{ post.subtitle }}</p>
        <footer class="blockquote-footer">
            by {{ post.author.name }}
            <cite title="Source Title" :class="{ 'text-success': post.is_published, 'text-info': !post.is_published }">
                <span v-if="post.is_published">published on </span>
                <span v-else>scheduled on </span>
                {{ post.full_date }}
            </cite>
        </footer>

        <div class="mt-2">
            <tags-list :tags="post.tags.data"></tags-list>
        </div>
    </div>
</template>

<script>
    import TagsList from './../tags/TagsList.vue';

    export default {
        props: {
            post: {
                type: Object,
                required: true
            }
        },

        components: {
            TagsList
        }
    }
</script>

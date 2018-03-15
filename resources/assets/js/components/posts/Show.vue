<template>
    <article>
        <h4 class="m-4">{{ post.title }}</h4>
        <h6 class="m-4">{{ post.subtitle }}</h6>

        <footer class="blockquote-footer m-4">
            by {{ post.author.name }}
            <cite title="Source Title" :class="{ 'text-success': post.is_published, 'text-info': !post.is_published }">
                <span v-if="post.is_published">published on </span>
                <span v-else>scheduled on </span>
                {{ post.full_date }}
            </cite>
        </footer>

        <div class="m-4">
            <tags-list :tags="post.tags.data"></tags-list>
        </div>

        <div class="m-4">
            <div v-html="compiledMarkdown"></div>
        </div>

    </article>
</template>

<script>
    import TagsList from './../tags/TagsList.vue';
    import marked from 'marked';

    export default {
        props: {
            post: {
                type: Object,
                required:true
            }
        },

        computed: {
            compiledMarkdown: function () {
                return marked(this.post.body, { sanitize: true })
            }
        },

        components: {
            TagsList
        }
    }
</script>

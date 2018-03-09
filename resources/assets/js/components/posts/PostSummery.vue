<template>
    <div class="card cool-shadow mb-4">
        <div class="card-body">
            <a :href="post.url"><h2 class="card-title">{{ post.title }}</h2></a>
            <blockquote class="blockquote mb-0">
                <p>{{ post.subtitle }}</p>
                <footer class="blockquote-footer">by {{ post.author.name }} <cite title="Source Title"> on {{ post.full_date }}</cite></footer>

                <div class="mt-2">
                    <tags-list :tags="post.tags.data"></tags-list>
                </div>

            </blockquote>
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

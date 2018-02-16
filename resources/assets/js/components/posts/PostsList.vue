<template>
    <article>
        <div v-for="post in posts" :key="post.id" class="card mb-4">
            <div class="card-body">
                <a :href="post.url"><h2 class="card-title">{{ post.title }}</h2></a>
                <blockquote class="blockquote mb-0">
                    <p>{{ post.subtitle }}</p>
                    <footer class="blockquote-footer">by {{ post.author.name }} <cite title="Source Title"> on {{ post.full_date }}</cite></footer>
                    <div class="mt-2">
                        <span v-for="tag in post.tags.data" :key="tag.id" class="badge badge-secondary mr-2">#{{ tag.name }}</span>
                    </div>
                </blockquote>
            </div>
        </div>
    </article>
</template>

<script>
    export default {
        props: {
            posts: {
                type: Array,
                required: true
            }
        }
    }
</script>

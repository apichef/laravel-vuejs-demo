<template>
    <section>
        <span v-for="tag in tags" :key="tag.id" class="badge badge-primary mr-2">#{{ tag.name }}</span>
    </section>
</template>

<script>
    export default {
        props: {
            tags: {
                type: Array,
                required: true
            }
        }
    }
</script>

<template>
    <section>
        <span v-for="tag in tags" :key="tag.id" class="sarala-tag small mr-2">#{{ tag.name }}</span>
    </section>
</template>

<style lang="scss">
    @import "./../../../sass/variables";

    .sarala-tag {
        border-radius: 2px;
        padding: 2px 4px;
        background-color: $color-main-lighter;
        color: $color-second;
    }
</style>

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

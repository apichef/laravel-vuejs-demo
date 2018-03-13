<template>
    <div class="search list-group list-group-flush mb-2">
        <div class="cool-shadow list-group-item p-0 border">
            <el-input placeholder="Search ..." v-model="query" suffix-icon="el-icon-search" :class="'cool-shadow'"></el-input>
        </div>

        <p class="mb-0 mt-2"><small class="text-uppercase">advanced search</small></p>
    </div>
</template>

<style lang="scss">
    @import "./../../../sass/variables";

    .search {
        input {
            border: none;
            background-color: $color-main-lightest;
        }

        .list-group-item {
            border: none;
            background-color: $color-main-lighter;
        }
    }
</style>

<script>
    export default {
        data () {
            return {
                query: ''
            };
        }
    }
</script>

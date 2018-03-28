<template>
    <div class="search list-group list-group-flush mb-2">
        <div class="cool-shadow border-0 list-group-item p-0">
            <el-input placeholder="Search ..." v-model="query" suffix-icon="el-icon-search" class="cool-shadow border-0"></el-input>
        </div>

        <p class="mb-0 text-right"><small class="text-uppercase btn-advanced-search">advanced search <i class="el-icon-caret-bottom"></i></small></p>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                query: ''
            };
        }
    }
</script>

<style lang="scss">
    @import "../../../../sass/variables";

    .search {
        input {
            border: 1px solid $color-main-lighter;
            background-color: $color-main-lightest;
        }

        .btn-advanced-search {
            background-color: $color-main-lighter;
            padding: 4px 6px;
            color: $color-main;
            font-size: 10px;
            position: relative;
            top: -3px;
            border-radius: 0px 0px 6px 6px;
        }
    }
</style>

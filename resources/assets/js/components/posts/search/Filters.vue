<template>
    <div class="search list-group list-group-flush bg-white border-bottom">
        <div class="ist-group-item p-2">
            <el-input placeholder="Search ..." v-model="query">
                <template slot="append"><i class="el-icon-setting" @click="showAdwansedOptions"></i></template>
            </el-input>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                query: ''
            };
        },

        methods: {
            showAdwansedOptions () {
                alert("show");
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../../sass/variables";

    .search {
        input {
            border: none;
        }

        .el-icon-setting {
            cursor: pointer;
        }

        .el-input-group__append {
            background-color: white;
            border: none;

            .el-icon-setting {
                cursor: pointer;
            }
        }
    }
</style>

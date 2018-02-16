<template>
    <div class="text-center">
        <el-pagination
                layout="prev, pager, next"
                :total="pagination.total"
                :page-size="pagination.per_page"
                @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        props: {
            pagination: {
                type: Object,
                required: true
            }
        },

        methods: {
            changePage (page) {
                this.$emit('current-change', page);
            }
        }
    }
</script>

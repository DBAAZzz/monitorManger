<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { tableType, columnType } from './type'

export default defineComponent({
  emits: ['pageChange', 'pageSizeChange'],
  props: {
    tableColumn: {
      type: Array as PropType<columnType[]>,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Array as PropType<tableType[]>,
      default: () => {
        return []
      }
    },
    pageSize: {
      type: Number,
      default: 20
    }
  },
  setup(props, { emit }) {
    let currentPage = ref<number>(1)
    let pageSize = ref<number>(props.pageSize)

    watch(currentPage, (newVal: number) => {
      pageChange(newVal)
    })
    watch(pageSize, (newVal) => {
      pageSizeChange(newVal)
    })
    const pageChange = (pageNo: number) => {
      emit('pageChange', pageNo)
    }
    const pageSizeChange = (pageSize: number) => {
      emit('pageSizeChange', pageSize)
    }
    return {
      currentPage,
      pageSize
    }
  },
})
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="columnItem in tableColumn"
      :key="columnItem.key"
      :prop="columnItem.key"
      :width="columnItem.width"
      :label="columnItem.label"
      :align="columnItem.align || 'center'"
    ></el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:pageSize="pageSize"
      :default-page-size="$props.pageSize"
      :page-sizes="[10, 15, 20, 30]"
      :total="tableData.length"
      :background="true"
      :hide-on-single-page="false"
      layout="sizes, total, prev, pager, next"
    ></el-pagination>
  </div>
</template>

<style scoped lang="scss">
@charset "UTF-8";
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  background: #fff;
}
</style>
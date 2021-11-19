<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { tableType, columnType } from './type'

export default defineComponent({
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
    }
  },
  setup() {

  },
})
</script>

<template>
  <el-table :data="tableData" style="width: 100%" height="250">
    <el-table-column
      v-for="columnItem in tableColumn"
      :key="columnItem.key"
      :prop="columnItem.key"
      :width="columnItem.width"
      :label="columnItem.label"
      :align="columnItem.align || 'center'"
    ></el-table-column>
  </el-table>
</template>

<style scoped lang="scss">
@charset "UTF-8";
</style>

<script setup lang="ts" >
import Table from '@/components/Form/Table/index.vue'
import { columnType, tableType } from '@/components/Form/Table/type'
import { onMounted } from 'vue';
import { Test } from './component'

let columnArray: Array<columnType> = [
  {
    key: 'issue',
    label: '问题',
    width: '500',
    slotEl: Test
  },
  {
    key: 'date',
    label: 'date'
  },
  {
    key: 'name',
    label: '名字',
  },
  {
    key: 'state',
    label: '州'
  },
  {
    key: 'city',
    label: '城市'
  },
  {
    key: 'address',
    label: '地址'
  }
]

let tableData: Array<tableType> = [
  {
    issue: '信心',
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    issue: 'Error',
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
  },
];


onMounted(() => {

})
</script>

<template>
  <div class="issue_list">
    <Table :table-column="columnArray" :table-data="tableData"></Table>
  </div>
</template>

<style lang="scss" scoped>
@charset "UTF-8";
.issue_list {
  width: 100%;
}
</style>
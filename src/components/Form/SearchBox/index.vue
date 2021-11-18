<template>
  <div>
    <div v-for="(item, index) in options" :key="index" class="search-item">
      <Input
        v-if="item.type == 'input'"
        :label="item.label"
        :placeholder="item.placeholder"
        v-model:value="item.value"
        @inputFunc="changeValueEvent($event, item)"
        :ref="el => domRef.list[index] = el"
      ></Input>
      <Select
        v-if="item.type == 'select'"
        :label="item.label"
        :placeholder="item.placeholder"
        :options="item.options"
        @changeFunc="changeValueEvent($event, item)"
        :ref="el => domRef.list[index] = el"
      ></Select>
      <DatePicker
        v-if="item.type == 'dateRange'"
        :label="item.label"
        :startPlaceholder="item.startPlaceholder"
        :endPlaceholder="item.endPlaceholder"
        @changeFunc="changeValueEvent($event, item)"
        :ref="el => domRef.list[index] = el"
      ></DatePicker>
    </div>
    <div class="buttonBox">
      <el-button @click="reset()" type="primary">重置</el-button>
      <el-button @click="search()" type="primary">搜索</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, reactive, watchEffect } from 'vue'
import Select from '../Select/index.vue'
import Input from '../Input/index.vue'
import DatePicker from '../DatePicker/index.vue'
import type { RefObject, ComponentRef } from './type'
import type { DefaultOption } from '@types'

export default defineComponent({
  emits: ['search', 'reset'],
  components: {
    Select, Input, DatePicker
  },
  props: {
    options: {
      type: Array as PropType<DefaultOption[]>,
      required: true,
      default: []
    }
  },
  setup(props, { emit }) {
    let searchParams: { [propName: string]: any } = {};
    let domRef = reactive<RefObject>({
      list: []
    });
    let changeValueEvent = (value: any, item: DefaultOption): void => {
      (item.key || []).forEach((keyName: string, index: number): void => {
        if (item.key.length > 1 && value[0] && value[1]) {
          searchParams[keyName] = value[index] || '';
        } else if (item.key.length == 1 && value) {
          searchParams[keyName] = value || ''
        } else {
          delete searchParams[keyName];
        }
      })
    }
    let reset = () => {
      nextTick(() => {
        domRef.list.forEach((item: ComponentRef) => {
          item.InputValue = null;
        });
        searchParams = {};
        emit('reset');
      })
    }
    let search = () => {
      emit('search', searchParams)
    }
    watchEffect(() => {
      props.options.forEach((item: DefaultOption): void => {
        (item.key || []).forEach((keyName: string, index: number) => {
          if (item.key.length > 1 && item.value) {
            searchParams[keyName] = item.value[index] || '';
          } else if (item.value) {
            searchParams[keyName] = item.value || ''
          }
        })
      })
    })
    return {
      changeValueEvent,
      reset,
      search,
      domRef
    }
  },
})
</script>

<style scoped lang="scss">
@charset "UTF-8";
.search-item {
  display: inline-block;
}
.buttonBox {
  display: inline-block;
}
</style>

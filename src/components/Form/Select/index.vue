<template>
  <div class="search-input">
    <span class="label">{{ label }}：</span>
    <el-select
      v-model="InputValue"
      :placeholder="placeholder"
      @change="changeValue"
      :clearable="clearable"
    >
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watchEffect } from "vue";
import type { SelectOptions } from './type'
export default defineComponent({
  emits: ['changeFunc'],
  props: {
    label: {
      type: String,
      required: false,
      default: '标签页'
    },
    placeholder: {
      type: String,
      required: false,
      default: '请输入内容'
    },
    options: {
      type: Array as PropType<SelectOptions[]>,
      required: false,
      default: []
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props, { emit }) {
    let InputValue = ref<string | number>('');
    let changeValue = (value: any): void => {
      emit('changeFunc', value)
    }
    onMounted(() => {
      
    })
    watchEffect(() => {
      InputValue.value = props.value;
    })
    return {
      changeValue,
      InputValue
    }
  }
})
</script>

<style lang="scss" scoped>
@charset "UTF-8";
.search-input {
  display: inline-block;
  margin: 0 15px 15px 0;
  .label {
    font-size: 14px;
    color: #666;
  }
}
.el-input {
  width: auto;
}
.el-input__inner {
  width: auto;
}
</style>
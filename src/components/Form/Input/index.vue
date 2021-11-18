<template>
  <div class="search-input">
    <span class="label">{{ label }}：</span>
    <el-input
      v-model="InputValue"
      :placeholder="placeholder"
      @change="changeValue('change', $event)"
      @input="changeValue('input', $event)"
    ></el-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  emits: ['inputFunc', 'changeFunc'],
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
    value: {
      default: ''
    }
  },
  setup(props, { emit }) {
    let InputValue = ref('');
    let changeValue = (emitName: string, value: any): void => {
      if (emitName == 'change') {
        emit('changeFunc', value)
      } else if (emitName == 'input') {
        emit('inputFunc', value)
      }
    }
    watchEffect((): void => {
      InputValue.value = props.value;
    })
    return {
      InputValue,
      changeValue
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
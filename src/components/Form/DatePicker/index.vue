<template>
  <div class="search-input">
    <span class="label">{{ label }}：</span>
    <el-date-picker
      v-model="InputValue"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      type="datetimerange"
      @change="changeValue"
    ></el-date-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watchEffect } from "vue";
import dayjs from "dayjs"
export default defineComponent({
  emits: ['changeFunc'],
  props: {
    label: {
      type: String,
      required: false,
      default: '标签页'
    },
    startPlaceholder: {
      type: String,
      required: false,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      required: false,
      default: '结束日期'
    },
    value: {
      type: Array,
      default: []
    }
  },
  setup(props, { emit }) {
    let InputValue = ref<Date[]>([])
    let changeValue = (value: any): void => {
      if (value) {
        emit('changeFunc', [
          dayjs((value[0])).format('YYYY-MM-DD HH:mm:ss'),
          dayjs((value[1])).format('YYYY-MM-DD HH:mm:ss')
        ])
      } else {
        emit('changeFunc', [
          null,
          null
        ])
      }
    }
    watchEffect((): void => {
      InputValue.value = props.value as Array<Date>;
    })
    onMounted(() => {

    })
    return {
      InputValue,
      changeValue,
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
</style>
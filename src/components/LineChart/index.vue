<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts/core';
import {
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  MarkPointComponent,
  MarkPointComponentOption,
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

export default defineComponent({
  props: {
    width: {
      type: String,
      required: true,
      default: '400px'
    },
    height: {
      type: String,
      required: true,
      default: '400px'
    }
  },
  setup() {
    echarts.use([
      GridComponent,
      LineChart,
      TooltipComponent,
      CanvasRenderer,
      UniversalTransition,
      MarkPointComponent
    ]);

    type EChartsOption = echarts.ComposeOption<
      GridComponentOption
      | LineSeriesOption
      | MarkPointComponentOption
      | TooltipComponentOption
    >;

    let myChart;

    let option: EChartsOption;

    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [
        {
          name: '错误数量',
          data: [20, 32, 51, 34, 90, 33, 120],
          type: 'line',
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
        },
        {
          name: '错误人数',
          data: [1, 2, 3, 4, 5, 6, 20],
          type: 'line',
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
        }
      ]
    };

    onMounted(() => {
      var chartDom = document.getElementById('line')!;
      myChart = echarts.init(chartDom);
      option && myChart.setOption(option);
    })

    onUnmounted(() => {
      myChart?.dispose()
    })

    window.addEventListener('resize', () => {
      myChart?.resize()
    })


  },
})
</script>

<template>
  <div id="line" :style="`width:${$props.width};height:${$props.height}`"></div>
</template>

<style lang="scss" scoped>
@charset "UTF-8";
</style>
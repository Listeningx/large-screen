<!--
 描述: 客户分布
 作者: Jack Chen
 日期: 2020-05-09
-->

<template>
  <div class="distribution-container"> 
    <div class='chart' :style="{ height: he + 'px', width: wi + 'px' }" id="chart_right2"></div>
    <!-- <div id="information">{{warning}}</div> -->
  </div>
</template>

<script>
import * as echarts from 'echarts';
import * as axios from 'axios'
const labelRight = {
  position: 'right'
};

export default {
  name: "distribution",
  props: {
    wi: {
      type: Number,
      required: true,
    },
    he: {
      type: Number,
      required: true,
    },
  },
  watch: {
    wi(newVal, oldVal ) {
      console.log('wi changed:', newVal, oldVal);
      // perform any side effects here, such as updating the UI
      let myChart = echarts.getInstanceByDom(document.getElementById('chart_right2'));
      myChart.resize();
    },
    he(newVal, oldVal) {
      console.log('he changed:', newVal, oldVal);
      // perform any side effects here, such as updating the UI
      let myChart = echarts.getInstanceByDom(document.getElementById('chart_right2'));
      myChart.resize();
    },
  },
  data() {
    return {
    }
  },
  mounted() {
    this.getEchartRight2();
    // this.warning = '注意！14100100-12100100支线负载过高！';
  },
  methods: {
    getEchartRight2() {
      setTimeout(()=>{
      let myChart = echarts.init(document.getElementById('chart_right2'));
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 80,
          bottom: 30
        },
        xAxis: {
          type: 'value',
          position: 'top',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          data: [
            '线路越限情况',
            '新能源机组消纳量',
            '平机功率越限',
            '无出力越限',
            '节点电压越限',
            '电网运行费用',
          ]
        },
        series: [
          {
            name: 'Cost',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              formatter: '{b}'
            },
            data: [
              { value: 1 },
              { value: 2 },
              { value: -1, label: labelRight,  itemStyle: { color: '#a90000'}},
              { value: -2, label: labelRight,  itemStyle: { color: '#a90000'}},
              { value: -1, label: labelRight,  itemStyle: { color: '#a90000'}},
              { value: -2, label: labelRight,  itemStyle: { color: '#a90000'}}
            ]
          }
        ]
      };

      myChart.setOption(option, true);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
      },200);
    },
  },
  beforeDestroy() {
    
  }
};
</script>

<style lang="scss" scoped>
.distribution-container {
  .chart {
    margin-top: -40px;
  }
}
#information{
  margin-left: 0.1875rem;
        color: #fff;
              font-size: 0.225rem;
              // font-size: 0.175rem;
          line-height: 0.475rem;
          padding: 0.1rem 0;
        
}
</style>

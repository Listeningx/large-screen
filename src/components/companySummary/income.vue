<!--
 描述: 营业收入
 作者: Jack Chen
 日期: 2020-05-09
-->

<template>
  <div class="income-container"> 
    <div class="chart" :style="{ height: he + 'px', width: wi + 'px' }" id="chart_left3"></div>  
  </div>
</template>

<script>
import * as echarts from 'echarts';
import * as axios from 'axios'
export default {
  name: "income",
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
      let myChart = echarts.getInstanceByDom(document.getElementById('chart_left3'));
      myChart.resize();
    },
    he(newVal, oldVal) {
      console.log('he changed:', newVal, oldVal);
      // perform any side effects here, such as updating the UI
      let myChart = echarts.getInstanceByDom(document.getElementById('chart_left3'));
      myChart.resize();
    },
  },
  data() {
    return {
      
    }
  },
  mounted() {
    this.getEchartLeft3();
  },
  methods: {
    getEchartLeft3() {
      setTimeout(()=>{

      let myChart = echarts.init(document.getElementById('chart_left3'));
      let data = {
        city: ['9:20', '9:30', '9:40', '9:50', '10:00', '10:10'],
        num: ['895', '1121', '985', '1290', '848', '1830'],
        num2:['1272','1001','912','890','954','976'],
        num3:['894','1232','908','799','989','1176']
      }

      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255,255,255,0)' // 0% 处的颜色
                }, {
                  offset: 0.5,
                  color: 'rgba(255,255,255,1)' // 100% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(255,255,255,0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
          },
          // formatter: (value) => {
            // console.log("value = "+value)
            // console.log(value)
            // return value[0].name + '总功率：<br>' + value[0].value + 'kW' +value[1].value; 
          // }
        },
        grid: {
          top: '5%',
          left: '2%',
          right: '2%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisLine: { //坐标轴轴线相关设置。数学上的x轴
            show: false,
            lineStyle: {
              color: '#092b5d'
            },
          },
          axisLabel: { //坐标轴刻度标签的相关设置
            textStyle: {
              color: '#24c4ff',
              margin: 15,
            },
            formatter: (data) => {
                return data;
            }
          },
          axisTick: {
            show: false,
          },
          data: data.city
        }],
        yAxis: [{
          min: 500,
          max: 1500,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#092b5d'
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#092b5d"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#24c4ff',
            }
          },
          axisTick: {
            show: false,
          },
        }],
        series: [{
          name: '太阳能',
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: '#7c80f4', // 线条颜色
            },
            borderColor: 'rgba(0,0,0,.4)',
          },
          itemStyle: {
            // color: "rgba(14,30,73,1)",
            // borderColor: "#646ace",
            // borderWidth: 2
          },
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'top',
          //     formatter: [
          //       ' {a|{c}}',
          //     ].join(','),
          //     rich: {
          //       a: {
          //         color: '#fff',
          //         align: 'center',
          //       },
          //     }
          //   }
          // },
          smooth: true,
          areaStyle: { //区域填充样式
            normal: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "rgba(124, 128, 244,.3)"
              },{
                offset: 1,
                color: "rgba(124, 128, 244, 0)"
              }], false),
              shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
              shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: data.num
        },
        {
          name: '火力',
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: '#7c80f4', // 线条颜色
            },
            borderColor: 'rgba(0,0,0,.4)',
          },
          itemStyle: {
            // color: "rgba(14,30,73,1)",
            // borderColor: "#646ace",
            // borderWidth: 2
          },
          smooth: true,
          areaStyle: { //区域填充样式
            normal: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "rgba(124, 128, 244,.3)"
              },{
                offset: 1,
                color: "rgba(124, 128, 244, 0)"
              }], false),
              shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
              shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: data.num2
        },
        {
          name: '风力',
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: '#7c80f4', // 线条颜色
            },
            borderColor: 'rgba(0,0,0,.4)',
          },
          itemStyle: {
            // color: "rgba(14,30,73,1)",
            // borderColor: "#646ace",
            // borderWidth: 2
          },
          smooth: true,
          areaStyle: { //区域填充样式
            normal: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "rgba(124, 128, 244,.3)"
              },{
                offset: 1,
                color: "rgba(124, 128, 244, 0)"
              }], false),
              shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
              shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: data.num3
        }
      ]
      }

      myChart.setOption(option, true);
      window.addEventListener('resize', () => {
        myChart.resize();
      })
    },200);
  },
  beforeDestroy() {
    
  }
}
}//export default
</script>

<style lang="scss" scoped>
.income-container {
  .chart {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>

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

      // 定义时间轴
        const now = new Date();
        const timeAxis = [];
        for (let i = 0; i < 6; i++) {
          const time = new Date(now - (5 - i) * 5 * 60 * 1000);
          timeAxis.push(time.getHours() + ':' + time.getMinutes());
        }
        // 定义初始数据
        let data1 = [],data2=[],data3=[];
        for (let i = 0; i < 6; i++) {
          data1.push(Math.random() * 100);
          data2.push(Math.random() * 100);
          data3.push(Math.random() * 100);
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
          data: timeAxis,

        }],
        yAxis: [
         
        {
          type: 'value',  
          // min: 2000,
          // max: 10000,
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
          data: data1
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
          data: data2
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
          data: data3
        }
      ]
      }

      myChart.setOption(option, true);
      setInterval(function () {
        this.$axios.get('/grid/generate')
        .then(response => {
          // 更新数据
          const now = new Date();
          data1.shift();
          data1.push(response.data[0]);
          data2.shift();
          data2.push(response.data[1]);
          data3.shift();
          data3.push(response.data[2]);
          timeAxis.shift();
          timeAxis.push(now.getHours() + ':' + now.getMinutes());

          // 更新图表配置项
          chart.setOption({
            xAxis: {
              data: timeAxis
            },
            series: [{
              data: data1
            },{
              data:data2
            },{
              data:data3
            }]
          });
        })
        .catch(error => {
          console.error(error);
        });
    }, 5 * 60 * 1000); // 每 5 分钟更新一次
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

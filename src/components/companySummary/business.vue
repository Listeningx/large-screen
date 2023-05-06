<!--
 描述: 业务范围
 作者: Jack Chen
 日期: 2020-05-09
-->

<template>
  
    <div class="business-container"> 

      <div class="chart" :style="{ height: he + 'px', width: wi + 'px' }" id="chart_left1"></div> 

  </div>

</template>

<script>
import * as echarts from 'echarts';
import * as axios from 'axios'
  import VueDragResize from 'vue-drag-resize'
export default {
  name: "business",
  components: {
      VueDragResize
    },
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
      let myChart = echarts.getInstanceByDom(document.getElementById('chart_left1'));
      myChart.resize();
    },
    he(newVal, oldVal) {
      console.log('he changed:', newVal, oldVal);
      // perform any side effects here, such as updating the UI
      let myChart = echarts.getInstanceByDom(document.getElementById('chart_left1'));
      myChart.resize();
    },
  },
  data() {
    return {
      flow:[],
    }
  },
  mounted() {
    this.$axios({
      method: "get",
      url: "/grid/flow" 
    })
      .then((res) => {
        /* res.data - 返回值 */
       console.log("flow_suc");
        this.flow = res.data
        console.log(this.flow)
      }).catch((err) => {
        /* 异常信息 */
        console.log(err);
       console.log("flow_err");

  })
  this.getEchartLeft1();

},
  methods: {
    
    getEchartLeft1() {
      setTimeout(()=>{
      // 实例化对象
      let myChart = echarts.init(document.getElementById('chart_left1'));
      let charts = { // 按顺序排列从大到小
        cityList: ['工厂', '办公楼', '住宅', '车站', '学校'],
        cityData: [1500, 1200, 900, 600, 400]
      }

      let top10CityList = charts.cityList;
      // let top10CityData = charts.cityData;
      let top10CityData = this.flow;

      let color = ['rgba(14,109,236', 'rgba(255,91,6', 'rgba(100,255,249', 'rgba(248,195,248', 'rgba(110,234,19', 'rgba(255,168,17', 'rgba(218,111,227'];

      let lineY = [];
      for (let i = 0; i < charts.cityList.length; i++) {
        let x = i
        if (x > color.length - 1) {
          x = color.length - 1
        }
        let data = {
          name: charts.cityList[i],
          color: color[x] + ')',
          value: top10CityData[i],
          itemStyle: {
            normal: {
              show: true,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: color[x] + ', 0.3)'
              }, {
                offset: 1,
                color: color[x] + ', 1)'
              }], false),
              barBorderRadius: 10
            },
            emphasis: {
              shadowBlur: 15,
              shadowColor: 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
        lineY.push(data)
      }  

      // 指定配置和数据
      let option = {
        color: color,
        tooltip: {
          trigger: 'item',
        },
        grid: {
          borderWidth: 0,
          top: '5%',
          left: '2%',
          right: '2%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        }],
        yAxis: [{
          type: 'category',
          inverse: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            inside: false,
            textStyle: {
              color: '#b3ccf8',
              fontSize: 13
            },
          },
          data: top10CityList
        }, {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            inside: false,
            textStyle: {
              color: '#b3ccf8',
              fontSize: 13
            },
            formatter: (val) => {
              return `${val}`
            }
          },
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          },
          // data: top10CityData.reverse()
        }],
        series: [{
          name: '',
          type: 'bar',
          zlevel: 2,
          barWidth: '10px',
          data: lineY,
          animationDuration: 1500,
          label: {
            normal: {
              color: '#b3ccf8',
              show: false,
              position: [0, '-15px'],
              textStyle: {
                fontSize: 13
              },
              formatter: (a, b) => {
                return a.name;
              }
            }
          }
        }]
      };
      function run(data) {
        for (var i = 0; i < data.length; ++i) {
          if (Math.random() > 0.9) {
            data[i].value += Math.round(Math.random() * 2000);
          } else {
            data[i].value += Math.round(Math.random() * 200);
          }
        }
        myChart.setOption({
          series: [
            {
              type: 'bar',
              data
            }
          ]
        });
      }
      setInterval(function () {
        run(lineY);
      }, 3000);
      // 把配置给实例对象
     
        myChart.setOption(option, true);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
      },200);
      
    },
  },
  beforeDestroy() {
    
  },
 
};
</script>

<style lang="scss" scoped>
.business-container {
  .chart {
    height: 3rem;
  }
}
.chart {
    height: 3rem;
    // height: 30px;

  }
</style>

<!--
 描述: 产品热词
 作者: Jack Chen
 日期: 2020-05-09
-->

<template>
  <div class="word-container"> 
    <!-- <div class="chart" id="chart_right1"></div> -->
    <div :style="{ height: he + 'px', width: wi + 'px' }" id="chart_right1">
          </div> 
  </div>
</template>

<script>
import * as echarts from 'echarts';
import * as axios from 'axios'
import '@/assets/js/echarts-wordcloud.min'

export default {
  name: "wordCloud",
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
      let myChart = echarts.getInstanceByDom(document.getElementById('chart_right1'));
      myChart.resize();
    },
    he(newVal, oldVal) {
      console.log('he changed:', newVal, oldVal);
      // perform any side effects here, such as updating the UI
      let myChart = echarts.getInstanceByDom(document.getElementById('chart_right1'));
      myChart.resize();
    },
  },
  data() {
    return {

    }
  },
  mounted() {
    this.getEchartRight1();
    this.$axios({
      method: "get",
      url: "/grid/reward" 
    })
      .then((res) => {
       console.log("result_reward");
       console.log(res.data)
      }).catch((err) => {
        console.log(err);
       console.log("flow_err");

  })
  },
  methods: {
    getEchartRight1() {
      setTimeout(()=>{
      let myChart = echarts.init(document.getElementById('chart_right1'));
      function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
          name: now.toString(),
          value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
          ]
        };
      }
      let data = [];
      let now = new Date(1997, 9, 3);
      let oneDay = 24 * 3600 * 1000;
      let value = Math.random() * 1000;
      for (var i = 0; i < 1000; i++) {
        data.push(randomData());
      }
      console.log("------------------reward data------------------");
      console.log(data);
      let option = {
        // title: {
        //   text: 'Dynamic Data & Time Axis'
        // },
        //鼠标移动上去触发
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return (
              date.getDate() +
              '/' +
              (date.getMonth() + 1) +
              '/' +
              date.getFullYear() +
              ' : ' +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ]
      };
      setInterval(function () {
        for (var i = 0; i < 5; i++) {
          data.shift();
          data.push(randomData());
        }
        myChart.setOption({
          series: [
            {
              data: data
            }
          ]
        });
      }, 1000);


      myChart.setOption(option, true);
      window.addEventListener('resize', () => {
        myChart.resize();
      })
    },200);
  },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.word-container {
  .chart {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
#information{
  margin-left: 0.1875rem;
        color: #fff;
              font-size: 0.225rem;
          line-height: 0.475rem;
          padding: 0.1rem 0;
        
}
</style>

<!--
 描述: 产品热词
 作者: Jack Chen
 日期: 2020-05-09
-->

<template>
  <div class="word-container"> 
    <!-- <div class="chart" id="chart_right1"></div> -->

    <div :style="{ height: he + 'px', width: wi + 'px' }" >
      <div>
      <el-button type="primary" @click="jump2map" style="position:absolute;top:90px;left:-10px">跳转页面</el-button>
      <el-button type="primary" @click="stop" style="position:absolute;top:90px;z-index=10000;left:90px">停止模拟</el-button>
      <el-button type="primary" @click="stop" style="position:absolute;top:90px;z-index=10000;left:180px">重新开始</el-button>
             
      <!-- <timeSlider /> -->
      </div>
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
    stop:{
      type:Function,
      required:true,
    }
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
      timer: null,
      warning:''
    }
  },
  mounted() {
    this.getEchartRight1();
    // this.timer = setInterval(() => {
    //   this.getEchartRight1();
    // }, 5000)
  },
  methods: {
    jump2map(event){
    console.log("jumpjump")
    this.$router.push({
          path: '/map'
         })
  },
    getEchartRight1() {
      this.warning = '当前电网总负载为75%，处于较安全状态';
      let myChart = echarts.init(document.getElementById('chart_right1'));
      let option = {
        // tooltip: {
        //   show: false
        // },
        series: [{
          type: 'wordCloud',
          gridSize: 1,
          sizeRange: [12, 50],
          rotationRange: [-90, 90],
          rotationStep: 45,
          shape: 'diamond',
          width: '90%',
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 6
          },
          textStyle: {
            normal: {
              textBorderColor: 'rgba(255,255,255,0.3)',
              textBorderWidth: 1,
              color: () => {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')';
              }
            },
            emphasis: {
              fontSize: 20,
              // shadowBlur: 10,
              // shadowColor: 'rgba(255,255,255, .1)'
            }
          },
          data: [{
            name: '区块链',
            value: 810
          }, {
            name: '云计算',
            value: 520
          },{
            name: "人工智能",
            value: 928
          },{
            name: "大数据",
            value: 906
          },{
            name: "工业互联网",
            value: 825
          },{
            name: "医疗",
            value: 514
          },{
            name: "质量溯源",
            value: 486
          },{
            name: "政务",
            value: 53
          },{
            name: "密码学",
            value: 927
          },{
            name: "金融行业",
            value: 1308
          },{
            name: "供应链",
            value: 693
          },{
            name: "公有链",
            value: 611
          },{
            name: "私有链",
            value: 512
          },{
            name: "联盟链",
            value: 382
          },{
            name: "数据共享",
            value: 312
          },{
            name: "文创版权",
            value: 187
          },{
            name: "天河链",
            value: 163
          },{
            name: "数据存证",
            value: 104
          },{
            name: "UDFS存储",
            value: 3
          },{
            name: "在线教育",
            value: 31
          },{
            name: "关联分析",
            value: 941
          },{
            name: "智慧停车",
            value: 585
          },{
            name: "链云生态",
            value: 473
          },{
            name: "应用层",
            value: 358
          },{
            name: "网络层",
            value: 246
          },{
            name: "数据层",
            value: 207
          },{
            name: "基础层",
            value: 194
          },{
            name: "智能合约",
            value: 104
          },{
            name: "去中心化",
            value: 87
          },{
            name: "数字货币",
            value: 415
          },{
            name: "酷屏",
            value: 253
          },{
            name: "可视化",
            value: 211
          },{
            name: "P2P",
            value: 116
          },{
            name: "数据挖掘",
            value: 1309
          }]
        }]
      }

      myChart.setOption(option, true);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
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
    height: 3rem;
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

<!--
 描述: 人才队伍
 作者: Jack Chen
 日期: 2020-05-09
-->

<template>
  <div class="talent-container"> 
    <div class="chart" id="chart_left2"></div>   
  </div>
</template>

<script>
export default {
  name: "talent",
  data() {
    return {
      
    }
  },
  mounted() {
    this.getEchartLeft2();
  },
  methods: {
    getEchartLeft2() {
      setTimeout(()=>{
      
      let myChart = echarts.init(document.getElementById('chart_left2'));
      let scaleData = [{
        name: '太阳能',
        value: 1025
      },{
        name: '风力',
        value: 2352
      },{
        name: '火力',
        value: 876
      }];
      let rich = {
        white: {
          color: '#ddd',
          align: 'center',
          padding: [3, 0]
        }
      };
      let placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 10
        }
      };
      let data = [];
      let color=['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000']
      for (let i = 0; i < scaleData.length; i++) {
        data.push({
          value: scaleData[i].value,
          name: scaleData[i].name,
          itemStyle: {
            normal: {
              borderWidth: 3,
              shadowBlur: 10,
              borderColor: color[i],
              shadowColor: color[i]
            }
          },
          tooltip:{
           
            position:'top',
          },
     
        }, {
          value: 1,
          name: '',
          itemStyle: placeHolderStyle
        });
        //!!!这里用空白占位置，表示圈圈中没有内容的地方
      }

      let option = {
        tooltip: {
          trigger: 'item',
        },
        series: [{
          name: '',
          type: 'pie',
          clockWise: false,
          center: ['50%', '50%'],
          hoverAnimation: true,
          radius:['60%','90%'],
          itemStyle: {
            normal: {
              borderRadius: 4,
        borderColor: '#fff',
        borderWidth: 0.1,
            }
          },
          labelLine:{
            show:false,
          },
          label:
          {
            show:false,
            position:'center',
            formatter: (params) => {
                  let percent = 0;
                  let total = 0;
                  for (let i = 0; i < scaleData.length; i++) {
                    total += scaleData[i].value;
                  }
                  percent = ((params.value / total) * 100).toFixed(0);
                  if (params.name !== '') {
                    return params.name + '\n{white|'  + percent + '%}';
                  } else {
                    return '';
                  }
                },
            rich: rich,
          },
          data: data,
          emphasis: {
            label: {
                show: true,
                // position: 'center',
                color: '#ddd',
                edgeDistance:10,
                fontSize: 30,
          fontWeight: 'bold'
              },
              labelLine: {
                show:false
              },
              
          },
    
        }]
      }

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
.talent-container {
  .chart {
    height: 3rem;
  }
}
</style>

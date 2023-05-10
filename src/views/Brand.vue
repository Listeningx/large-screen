<!--
 描述: 公司品牌介绍
 作者: Jack Chen
 日期: 2020-05-10
-->

<template>
  <div class="brand-container">
  	<div class="wrap">
      <header>
        <div class="weather">
          <img :src="imgSrc">
          <span class="tem">20°C</span> 
          <span class="wea">晴</span>
        </div>
        <h2>“灵犀”电网运行情况实时显示大屏</h2>
        <div class="showTime">
          <span class="time">{{ nowTime }}</span>
          <span class="date">
            <span>{{ week }}</span>
            <span>{{ date }}</span>
          </span>
        </div>
      </header>

      <section class="mainbox">
        <div class="item center">

        <div class="item left">


      <VueDragResize  :isResizable="true"    v-on:resizing="resize_l1" 
          v-on:dragging="resize_l1" :z="999" :x="18" :y="68" h="300" w="400">
        <div class="panel">

            <h2>电能流向</h2>
            <business :wi="width_l1" :he="height_l1" h="auto" w="auto" />
            <div class="panel-footer"></div>
        </div>
      </VueDragResize>
   

      <VueDragResize :isResizable="true"    v-on:resizing="resize_l2" 
          v-on:dragging="resize_l2" :z="999" :x="18"  :y=325>

          <div class="panel">
            <h2>发电机功率占比</h2>
            <talent  :wi="width_l2" :he="height_l2"/>
            <div class="panel-footer"></div>
          </div>
      </VueDragResize>
      <VueDragResize  :isResizable="true"    v-on:resizing="resize_l3" 
          v-on:dragging="resize_l3" :z="999" :x="18" :y="580">

          <div class="panel">
            <h2>功率曲线</h2>
            <income  :wi="width_l3" :he="height_l3"/>
            <div class="panel-footer"></div>
          </div>
      </VueDragResize>
        </div>

        <!-- <div class="item center"> -->
         
          <div class="resume">
            <div class="resume-hd">
              <ul>
                <li>
                  <countTo :startVal='startVal' :endVal='one' :duration='6000' separator="" autoplay=true></countTo>
                </li>
                <li>
                  <countTo :startVal='startVal' :endVal='two' :duration='6000' separator="" autoplay=true></countTo>
                </li>
                <li>
                  <countTo :startVal='startVal' :endVal='three' :duration='6000' separator="" autoplay=true></countTo>
                </li>
                <li>
                  <countTo :startVal='startVal' :endVal='four' :duration='6000' separator="" autoplay=true></countTo>
                </li>
                <li>
                  <countTo :startVal='startVal' :endVal='five' :duration='6000' separator="" autoplay=true></countTo>
                </li>
                <li>
                  <countTo :startVal='startVal' :endVal='six' :duration='6000' separator="" autoplay=true></countTo>
                </li>
              </ul>
            </div>
            <div class="resume-bd">
              <ul>
                <li>电网运行费用</li>
                <li>电压越限情况</li>
                <li>无功出力越限情况</li>
                <li>平衡机功率超标比例</li>
                <li>新能源机组容量</li>
                <li>线路越限情况</li>
              </ul>
            </div>
          </div>
                <el-dialog
                title="选择"
                :visible.sync="dialogVisible"
                width="30%"
                center
              >
                        <startForm :getEchart="getEchart"  v-on:closeDialog="closeDialog"/>
              </el-dialog>
    
        <!-- </div> -->
    
        
          <div class="map">
            <div class="chart" id="chart_map" height="100%" ref="chart_map"></div>
            <div class="map1"></div>
            <div class="map2"></div>
            <div class="map3"></div>
          </div>

          <div class="bottom">
            <timeSlider  v-on:stop="stop" v-on:openDialog="openDialog"/>
          </div>
        <div class="item right">

<!--           
          <VueDragResize 
          :isActive="true" 
          :w="200" 
          :h="200" 
          :isResizable="true"  :z="999" :x="1290" :y=68
          v-on:resizing="resize_r2" 
          v-on:dragging="resize_r2">
          <div class="panel">
            <h2>奖励指标</h2>
            <distribution :wi="width_r2" :he="height_r2" />
       
            <div class="panel-footer"></div>
          </div>
          </VueDragResize> -->

      <VueDragResize  :isResizable="true"    v-on:resizing="resize_r1" 
          v-on:dragging="resize_r1" :z="999" :x="1290" :y=650  >

          <div class="panel">
            <h2>累计奖励</h2>
            <wordCloud  :wi="width_r1" :he="height_r1" />
            <div class="panel-footer"></div>
          </div>
        </VueDragResize>

      <VueDragResize  :isResizable="true"    v-on:resizing="resize_r3" 
          v-on:dragging="resize_r3" :z="999" :x="1290" :y="340">

          <div class="panel">
            <h2>异常事件</h2>
            <history  :wi="width_r3" :he="height_r3"/>
            <div class="panel-footer"></div>
          </div>
      </VueDragResize>

        </div>
      </div>

      </section>
  
    </div>
  </div>
</template>

<script>
import '@/assets/js/flexible'
import '@/assets/js/china'
import countTo from 'vue-count-to'

import topo from "@/assets/js/grid_top_struct.json"
import VueDragResize from 'vue-drag-resize'
import startForm from "../components/form.vue"
import timeSlider from "../components/timeSlider.vue"
import * as echarts from 'echarts';
import * as axios from 'axios'
import { ref, onMounted } from '@vue/composition-api';
export default {
  name: 'Brand',
  components: {
    countTo,
    VueDragResize,
    startForm,
    timeSlider
  },
  data() {
  	return {
      nowTime: '',
      week: '',
      date: '',
      timer: null,
      imgSrc: '',
      weatcherData: {},
      startVal: 0,
      one:0,
      two:0,
      three:0,
      four:0,
      five:0,
      six:0,

      geoCoordMap: {},
      bus_num:427,
      dialogVisible: true,

      width_r2: 250,
      height_r2: 250,
      top_r2: 0,
      left_l2: 0,

      width_l2: 200,
      height_l2: 200,
      top_l2: 0,
      left_l2: 0,

      width_l1: 300,
      height_l1: 300,
      top_l1: 0,
      left_l1: 0,

      width_l3: 200,
      height_l3: 200,
      top_l3: 0,
      left_l3: 0,

      width_r1: 300,
      height_r1: 100,
      top_r1: 0,
      left_r1: 0,

      width_r3: 200,
      height_r3: 200,
      top_r3: 0,
      left_r3: 0,

      sync:0
  	}
  },
  computed: {
  	
  },
  created() {
  },
  mounted() {
    this.getWeather();
    this.timer = setInterval(() => {
      this.getWeather();
    }, 1000 * 60 * 60)

    this.nowTimes();
    // this.getEchart();

  },
  methods: {
    stop(){
        console.log("stop")
        let myChart = echarts.getInstanceByDom(document.getElementById('chart_map'));
        myChart.clear();
      },
    closeDialog(){
      console.log("close")
      this.dialogVisible = false;
    },
    openDialog(){
      this.dialogVisible = true;
    },
    resize_r2 (newRect) {
      this.width_r2 = newRect.width;
      this.height_r2 = newRect.height;
      this.top_r2 = newRect.top;
      this.left_r2 = newRect.left;
    },
    resize_l1 (newRect) {
      this.width_l1 = newRect.width;
      this.height_l1 = newRect.height;
      this.top_l1 = newRect.top;
      this.left_l1 = newRect.left;
    },
    resize_l2 (newRect) {
      this.width_l2 = newRect.width;
      this.height_l2 = newRect.height;
      this.top_l2 = newRect.top;
      this.left_l2 = newRect.left;
    },
    resize_l3 (newRect) {
      this.width_l3 = newRect.width;
      this.height_l3 = newRect.height;
      this.top_l3 = newRect.top;
      this.left_l3 = newRect.left;
    },
    resize_r1 (newRect) {
      this.width_r1 = newRect.width;
      this.height_r1 = newRect.height;
      this.top_r1 = newRect.top;
      this.left_r1 = newRect.left;
    },
    resize_r3 (newRect) {
      this.width_r3 = newRect.width;
      this.height_r3 = newRect.height;
      this.top_r3 = newRect.top;
      this.left_r3 = newRect.left;
    },
    timeFormate(timeStamp) { //显示当前时间
      let newDate = new Date(timeStamp);
      let year = newDate.getFullYear();
      let month = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
      let date = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
      let hh = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
      let mm = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
      let ss = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds();
      let week = newDate.getDay();
      let weeks = ['日', '一', '二', '三', '四', '五', '六'];
      let getWeek = '星期' + weeks[week];
      this.week = getWeek;
      this.date = year + '.' + month + '.' + date;
      this.nowTime = hh + ':' + mm + ':' + ss;
    },
    nowTimes() {
      // console.log("nowtimes")
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes)
      this.nowTimes = null;
    },
    getWeather() { // 第三方天气api接口
      this.$axios.get('https://www.tianqiapi.com/api/', {
        params: {
          appid: '26148275',
          appsecret: '2id6H48Y',
          version: 'v6'
        }
      }).then(res => {
        if (res.data) {
          if (res.data.wea_img == 'xue') {
            this.imgSrc = require('../assets/img/brand/xue.png');
          } else if (res.data.wea_img == 'yin') {
            this.imgSrc = require('../assets/img/brand/yin.png');
          } else if (res.data.wea_img == 'yu' || res.data.wea_img == 'bingbao') {
            this.imgSrc = require('../assets/img/brand/yu.png');
          } else if (res.data.wea_img == 'yun') {
            this.imgSrc = require('../assets/img/brand/yun.png');
          } else if (res.data.wea_img == 'wu') {
            this.imgSrc = require('../assets/img/brand/wu.png');
          } else if (res.data.wea_img == 'shachen') {
            this.imgSrc = require('../assets/img/brand/shachen.png');
          } else if (res.data.wea_img == 'lei') {
            this.imgSrc = require('../assets/img/brand/lei.png');
          } else {
            this.imgSrc = require('../assets/img/brand/qing.png');
          }
          this.weatcherData = res.data;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getGridStatus(graph){
      console.log("in get")
      let gen_p,gen_q,gen_v,ld_p,stoenergy_p,ld_q,ld_v,p_or,q_or,v_or,a_or,p_ex,q_ex,v_ex,a_ex;
        this.$axios({
        method: "get",
        url: "/grid/gen_p/"
      })
        .then((res) => {
          /* res.data - 返回值 */
        console.log("gen_p_suc");
        gen_p = res.data;
        }).catch((err) => {
          /* 异常信息 */
          console.log(err);
        console.log("res_err");
        });

        this.$axios({
        method: "get",
        url: "/grid/ld_p/"
      })
        .then((res) => {
          /* res.data - 返回值 */
        console.log("ld_p_suc");
        ld_p = res.data;
        }).catch((err) => {
          /* 异常信息 */
          console.log(err);
        console.log("res_err");
        });


        setTimeout(()=>{
          let gen_p_cnt = 0,ld_p_cnt = 0;
          for(let node of graph.nodes){
            var tmp = node.name.split("_");
            if(tmp[0]=="gen"){
              node.gen_p = gen_p[gen_p_cnt++];
              
              node.tooltip = {
                formatter:node.name + '<br/>机组有功出力：'+node.gen_p
              }
              console.log(node.name)
              console.log(node)
            }else if(tmp[0]=="ld"){
              node.ld_p = ld_p[ld_p_cnt++]
              node.tooltip = {
                formatter:node.name + '<br/>负荷/储能有功：'+node.ld_p
              }
            }
          }
        },2000)
    },
    convertData(data) { // 拓扑图数据转换
      var num = 30;
      let res = {nodes:[],links:[]};
      console.log("convertdata")

      let gens = data.bus_gen;
      // console.log(gens)
        Reflect.ownKeys(gens).forEach(function(key){
          // console.log(key,gens[key]);
          res.nodes.push({
          name:key,
          category: 0,//0代表总线
          symbolSize:15,
        });

        if(gens[key]!=''){
     
          var id = gens[key].toString().split(".");

          res.nodes.push({
          name:"gen_" + id[1],
          category: 1,//1代表发电机
          symbolSize:10,
          symbol:'diamond',
          tooltip:{

          }
        });

          res.links.push({
            //为使线都是蓝色，交换起止点，让source是总线结点，target是发电机
            target:"gen_" + id[1],
            source:key.toString(),
      // value:100,

          })
        }
        });

      let lds = data.bus_load;
      Reflect.ownKeys(lds).forEach(function(key){
        if(lds[key]!=''){
          var id = lds[key].toString().split(".");
          res.nodes.push({
            name:"ld_" + id[1],
            category:2,//2表示负载
          symbolSize:10,
          symbol:'triangle'
          });

          res.links.push({
            source:key.toString(),
            target:"ld_" + id[1],
      // value:100,

          })
        }
      })
      
      let edges = new Map();
      let branches = data.bus_branch;
      Reflect.ownKeys(branches).forEach(function(key){
        if(branches[key]!=''){

          for(let i = 0;i < branches[key].length;i++){
            let item = branches[key][i].split("_");
            let num = item[0].split("h");
            num = num[1];
            if(edges.get(num)==null){
               if(item[1]=="or"){
                  edges.set(num,{or:key});
                }else if(item[1]=="ex"){
                  edges.set(num,{ex:key});
                }
            }else{
              if(item[1]=="or"){
                  edges.get(num).or=key;
                }else if(item[1]=="ex"){
                  edges.get(num).ex=key;
                }
            }
          }
        }
      });
      for (let branch of edges.values()) {
        let color = '';
        if(num >= 90){
          color = 'red'
        }else if(num >= 70){
          color = 'orange'
        }else{
          color = '#05f8f8'
        }
        res.links.push({
          source:branch.or,
          target:branch.ex,
          lineStyle:{
            color:color
          },
         
          label:{
            show:true,
            formatter:num+"%",
            color:"#fff",
            textBorderColor:"#000",
          },
          edgeLable:{
            
          }
        });
        num = (num + Math.ceil(Math.random()*10) )% 100 +1
      }

      res.categories = [
      {
        "name": "总线"
      },
      {
        "name": "发电机"
      },
      {
        "name": "负载"
      },
    ];
 
     console.log(res)
      return res;
    },
    getTopoInfo(){//更新拓扑图数据信息
      let topo_data = {
        bus_gen:{},bus_load:{},bus_branch:{}
      }
      this.$axios({
      method: "get",
      url: "/grid/bus_gen/"
    })
      .then((res) => {
        /* res.data - 返回值 */
       console.log("res_suc");
       var tmp = res.data;
      tmp = tmp.replace(/\"/g, "");
      tmp = tmp.replace(/\'/g, "\"");
      tmp = JSON.parse(tmp);
      topo_data.bus_gen = tmp.bus_gen
        // sync++;
        // console.log("sync="+ sync)
      }).catch((err) => {
        /* 异常信息 */
        console.log(err);
       console.log("res_err");

      });
      this.$axios({
      method: "get",
      url: "/grid/bus_load/" 
    })
      .then((res) => {
        /* res.data - 返回值 */
       console.log("res_suc");
       var tmp = res.data;
      tmp = tmp.replace(/\"/g, "");
      tmp = tmp.replace(/\'/g, "\"");
      tmp = JSON.parse(tmp);
      topo_data.bus_load = tmp.bus_load
      // sync++;
      // console.log("sync="+ sync)

      }).catch((err) => {
        /* 异常信息 */
        console.log(err);
       console.log("res_err");

      });
      this.$axios({
      method: "get",
      url: "/grid/bus_branch/" 
    })
      .then((res) => {
        /* res.data - 返回值 */
       console.log("res_suc");
      // topo_data.bus_branch = res.data;
      var tmp = res.data;
      tmp = tmp.replace(/\"/g, "");
      tmp = tmp.replace(/\'/g, "\"");
      tmp = JSON.parse(tmp);
      topo_data.bus_branch = tmp.bus_branch
      // sync++;
      // console.log("sync="+ sync)

      }).catch((err) => {
        /* 异常信息 */
        console.log(err);
       console.log("res_err");

      });

      console.log("topo_data")

      console.log(topo_data);
      return topo_data;
    },

    setTopoOption(graph){//设置拓扑图格式
      let myChart = echarts.getInstanceByDom(document.getElementById('chart_map'));

  myChart.hideLoading();
  graph.nodes.forEach(function (node) {
    node.label = {
      show: node.symbolSize > 30
    };
  });
  var option = {
    title: {
      top: 'bottom',
      left: 'right'
    },
    tooltip: {
      trigger:'item'
    },
    legend: [
      {
        data: graph.categories.map(function (a) {
          return a.name;
        }),
        right:'10%',
        top:'10%',
        z:99999,
        orient:'vertical',
        selector: ['all', 'inverse']
      },
    ],
    animation:false,
    animationDuration: 150,
    animationEasingUpdate: 'quinticInOut',
    backgroundColor:'transparent',
    timeline:{
      show:true,
    },
    series: [
      {
        color:['#05f8f8','#e64983','#f8e088'],

        type: 'graph',
        layout: 'force',

        force:{
          repulsion:50,
        },
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.01,
          width:3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          },
          itemstyle:{
            symbol:'arrow',

          }
        },
       
      }
    ]
  };

      myChart.setOption(option);

     // 保存节点和边的高亮样式
      var highlightStyle = {
        node: {
          itemStyle: {
            symbol: 'img://../assets/img/bus.png'  // 自定义节点的高亮形状
          }
        },
        edge: {
          lineStyle: {
            color: '#f00',  // 自定义边的高亮颜色
            width: 3  // 自定义边的高亮宽度
          }
        }
      };

      // 监听鼠标移入节点事件，更新节点和边的样式
      myChart.on('mouseover', function (params) {
        var dataIndex = params.dataIndex;
        var option = myChart.getOption();

        // 更新节点样式
        option.series[0].data[dataIndex].itemStyle = highlightStyle.node.itemStyle;

        // 更新边样式
        option.series[0].links.forEach(function (link) {
          if (link.source === dataIndex || link.target === dataIndex) {
            link.lineStyle = highlightStyle.edge.lineStyle;
          }
        });

        // 重新渲染图表
        myChart.setOption(option);
        });

        // 监听鼠标移出节点事件，恢复节点和边的样式
        myChart.on('mouseout', function () {
          var option = myChart.getOption();

          // 恢复节点样式
          option.series[0].data.forEach(function (node) {
            node.itemStyle = null;
          });

          // 恢复边样式
          option.series[0].links.forEach(function (link) {
            link.lineStyle = null;
          });

          // 重新渲染图表
          myChart.setOption(option);
        });

    },

    getEchart() { // 初始化地图数据

   

      let myChart = echarts.init(document.getElementById('chart_map'),'dark');
      // let sync = 0;//用于同步
      myChart.showLoading();
      var that = this
      var methods = this.$options.methods
      let topo_data = this.getTopoInfo();




    //todo:修改topo的格式,在接收数据后执行
    // setTimeout(()=>{
    //   this.setTopoOption(topo_data);

//   setInterval(function () {
// console.log("setinteeeeeeeerval")
//   var source = "bus-"+ Math.round((97) * Math.random())+"100100";
//   var target = "bus-"+ Math.round((97) * Math.random())+"100100";
//   console.log(source)
//   if (source !== target) {
//     graph.links.push( {
//       source:source,
//       target:target,
//       value:200,
//       label:{
//             show:true,
//             formatter:(Math.round((97) * Math.random()) + 1 )+"%",
//             color:"#fff",
//             textBorderColor:"#000",
//           }
//         });
//   }
//   myChart.setOption({
//     series: [
//       {
//         roam: true,
//         data: graph.nodes,
//         edges: graph.links
//       }
//     ]
//   });
//   // console.log('nodes: ' + data.length);
//   // console.log('links: ' + data.length);
// }, 5000);

 


// }, 5000);

setTimeout(function(){

    var graph = methods.convertData(topo_data);
    that.getGridStatus(graph);
    setTimeout(()=>{
          methods.setTopoOption(graph);
    },2000)

    setInterval(function(){
      let topo_data = that.getTopoInfo();
      setTimeout(()=>{
        var graph = methods.convertData(topo_data);
        that.getGridStatus(graph)
        setTimeout(()=>{
          methods.setTopoOption(graph);
        },2000)

      },4000)
    },5000);

  },5000);


    },
 
  beforeDestroy() {
    clearInterval(this.timer);
  },
  jump2map(event){
    console.log("jumpjump")
    this.$router.push({
          path: '/map'
         })
  },
  }}
  </script>

<style lang="scss" scoped>

.loginBtn {
	  		width: 100%;
	  		padding: 12px 0;
	  		border: 1px solid #d3d7f7;
        font-size: 16px;
    		color: #d3d7f7;
    		cursor: pointer;
    		background: transparent;
    		border-radius: 4px;
        margin-top: 10px;
    		&:hover {
    			color: #fff;
    			background: #0090ff;
    			border-color: #0090ff;
    		}
	  	}
.brand-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  // height:13.125rem;
  background: #000;
  .wrap {
    background: url(../assets/img/brand/bg.jpg) no-repeat #000;
    background-size: cover;
    width: 100vw;
  height: 100vh;
    line-height: 1.15;
    header {
      position: relative;
      height: 1rem;
      background: url(../assets/img/brand/head_bg.png) no-repeat top center;
      background-size: 100% 100%;
      h2 {
        color: #7ef0ff;
        font-size: 0.475rem;
        text-align: center;
        line-height: 0.75rem;
        letter-spacing: 1px;
      }
      .weather {
        position: absolute;
        left: 1.375rem;
        top: 0.35rem;
        font-size: 0.25rem;
        color: rgba(126, 240, 255, .7);
        img {
          width: .45rem;
        }
        span {
          display: inline-block;
        }
        .tem {
          margin: 0 .1rem 0 .2rem;
        }
      }
      .showTime {
        position: absolute;
        right: 1.375rem;
        top: 0.5rem;
        color: rgba(126, 240, 255, .7);
        display: flex;
        .time {
          font-size: .28rem;
          margin-right: .18rem;
        }
        .date {
          span {
            display: block;
            &:nth-child(1) {
              font-size: .12rem;
              text-align: right;
            }
            &:nth-child(2) {
              font-size: .14rem;
            }
          }
        }
      }
    }
    
    .mainbox {
      // height: 13.125rem;
      position: absolute;
  top: 1rem;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 1rem);
      min-width: 1024px;
      max-width: 1920px;
      padding: 0.125rem 0.125rem 0;
      display: flex;
      justify-content: center;
      // align-items: center;
      .item {
        flex: 1;
        // height: 100%;
        // height:100vh;

        &.center {
          // flex: 5;//在这里调三栏占比
          // margin: 0 0.125rem 0.1rem;
          // overflow: hidden;
          // display: flex;
        height: 100%;


          .resume {
          // flex: 0 0 60%;
          z-index: 999;
          position: absolute;
          left: 20%;
          right: 20%;
          margin: 0 auto;
          text-align: center; 
            background: rgba(101, 132, 226, 0.1);
            padding: 0.1875rem;
            transform: translateY(0px); /* 设置垂直方向上的偏移 */
            .resume-hd {
              position: relative;
              border: 1px solid rgba(25, 186, 139, 0.17);
              ul {
                display: flex;
                %li-line {
                  content: "";
                  position: absolute;
                  height: 50%;
                  width: 1px;
                  background: rgba(255, 255, 255, 0.2);
                  top: 25%;
                }
                li {
                  position: relative;
                  flex: 1;
                  text-align: center;
                  height: 1.2rem;
                  line-height: 1.2rem;
                  font-size: 0.65rem;
                  color: #ffeb7b;
                  padding: 0.05rem 0;
                  font-family: 'DIGITALDREAMFAT';
                  font-weight: bold;
                  &:nth-child(2) {
                    &:after {
                      @extend %li-line;
                      right: 0;
                    }
                    &:before {
                      @extend %li-line;
                      left: 0;
                    }
                  }
                  &:nth-child(4) {
                    &:after {
                      @extend %li-line;
                      right: 0;
                    }
                    &:before {
                      @extend %li-line;
                      left: 0;
                    }
                  }
                  &:nth-child(6) {
              
                    &:before {
                      @extend %li-line;
                      left: 0;
                    }
                  }
                }
              }
              &:before {
                content: "";
                position: absolute;
                width: 30px;
                height: 10px;
                border-top: 2px solid #02a6b5;
                border-left: 2px solid #02a6b5;
                top: 0;
                left: 0;
              }
              &:after {
                content: "";
                position: absolute;
                width: 30px;
                height: 10px;
                border-bottom: 2px solid #02a6b5;
                border-right: 2px solid #02a6b5;
                right: 0;
                bottom: 0;
              }
            }
            .resume-bd {
              ul {
                display: flex;
                li {
                  flex: 1;
                  height: 0.5rem;
                  line-height: 0.5rem;
                  text-align: center;
                  font-size: 0.225rem;
                  color: rgba(255, 255, 255, 0.7);
                  padding-top: 0.125rem;
                }
              }
            }
          }
          .bottom{
            z-index: 999;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60%;
          }

        }
        
        %map-style {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6.475rem;
          height: 6.475rem;
          // background: url(../assets/img/brand/map.png) no-repeat;
          background-size: 100% 100%;
          opacity: 0.3;
        }
        .map {
            // position: absolute;
            // top:0%;
            // left:0;
          position: relative;
          max-height: fit-content;
          height:100%;
          .chart {
            // position: fixed;
            // top: 20%;
            // left: 0%;
            // z-index: 1;
            // // height: 100%;
            // height: 13.125rem;
            // width: 100%;
            // // opacity: 0.6;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            // height: 13.125rem;
            height: 100%;
            width: 100%;
          }
          .map1 {
            @extend %map-style;
          }
          .map2 {
            @extend %map-style;
            width: 8.0375rem;
            height: 8.0375rem;
            // background-image: url(../assets/img/brand/lbx.png);
            opacity: 0.6;
            -webkit-animation: rotate 15s linear infinite;
            animation: rotate 15s linear infinite;
            z-index: 2;
          }
          .map3 {
            @extend %map-style;
            width: 7.075rem;
            height: 7.075rem;
            // background-image: url(../assets/img/brand/jt.png);
            -webkit-animation: rotate1 10s linear infinite;
            animation: rotate1 10s linear infinite;
          }
        }
        .panel {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          // position: relative;
          height: height;
          border: 1px solid rgba(25, 186, 139, 0.17);
          background: rgba(255, 255, 255, 0.04) url(../assets/img/brand/line.png);
          padding: 0 0.1875rem 0;
          // margin-bottom: 0.1875rem;
          &:before {
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            width: 10px;
            height: 10px;
            border-top: 2px solid #02a6b5;
            border-left: 2px solid #02a6b5;
          }
          &:after {
            position: absolute;
            top: 0;
            right: 0;
            content: "";
            width: 10px;
            height: 10px;
            border-top: 2px solid #02a6b5;
            border-right: 2px solid #02a6b5;
          }

          .panel-footer {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            &:before {
              position: absolute;
              bottom: 0;
              left: 0;
              content: "";
              width: 10px;
              height: 10px;
              border-bottom: 2px solid #02a6b5;
              border-left: 2px solid #02a6b5;
            }
            &:after {
              position: absolute;
              bottom: 0;
              right: 0;
              content: "";
              width: 10px;
              height: 10px;
              border-bottom: 2px solid #02a6b5;
              border-right: 2px solid #02a6b5;
            }
          }

          h2 {
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            color: #fff;
            font-size: 0.225rem;
            font-weight: 400;
            a {
              margin: 0 0.1875rem;
              color: #fff;
              text-decoration: none;
            }
          }
          .chart {
            height: 3rem;
          }
        }
      }

    }

  }

}

@-webkit-keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@-webkit-keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}
@media screen and (min-width: 1920) {
  html {
    font-size: 80px !important;
  }
}	
.vdr.active:before {
  display:none;
}
</style>

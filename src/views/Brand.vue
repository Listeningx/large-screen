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
        <div class="item center" ref="parent">

        <!-- <div class="item left"> -->


      <VueDragResize  :isResizable="true"    v-on:resizing="resize_l1" 
          v-on:dragging="resize_l1" :z="999"  h="300" w="400" :x="parentW-400" :y="parentH*0.3">
        <div class="panel">

            <h2>电能流向</h2>
            <business :wi="width_l1" :he="height_l1" h="auto" w="auto" />
            <div class="panel-footer"></div>
        </div>
      </VueDragResize>
   

      <VueDragResize :isResizable="true"    v-on:resizing="resize_l2" 
          v-on:dragging="resize_l2" :z="999" :x="parentW*0.02"  :y="parentH*0.1" h="300" w="250">

          <div class="panel">
            <h2>发电机功率占比</h2>
            <talent  :wi="width_l2" :he="height_l2"/>
            <div class="panel-footer"></div>
          </div>
      </VueDragResize>
      <VueDragResize  :isResizable="true"    v-on:resizing="resize_l3" 
          v-on:dragging="resize_l3" :z="999" h="400" w="400"  :x="parentW-400" :y="400">

          <div class="panel">
            <h2>功率曲线</h2>
            <income  :wi="width_l3" :he="height_l3"/>
            <div class="panel-footer"></div>
          </div>
      </VueDragResize>
        <!-- </div> -->

        <!-- <div class="item center"> -->
         
          <div class="resume">
            <div class="resume-hd">
              <ul>
                <li>
                  <countTo :startVal='this.startVal1' :endVal='this.one' :duration='4000' separator="" autoplay="true"></countTo>
                </li>
                <li>
                  <countTo :startVal='this.startVal2' :endVal='this.two' :duration='4000' separator="" autoplay="true"></countTo>
                </li>
                <li>
                  <countTo :startVal='this.startVal3' :endVal='this.three' :duration='4000' separator="" autoplay="true"></countTo>
                </li>
                <li>
                  <countTo :startVal='this.startVal4' :endVal='this.four' :duration='4000' separator="" autoplay="true"></countTo>
                </li>
                <li>
                  <countTo :startVal='this.startVal5' :endVal='this.five' :duration='4000' separator="" autoplay="true"></countTo>
                </li>
                <li>
                  <countTo :startVal='this.startVal6' :endVal='this.six' :duration='4000' separator="" autoplay="true"></countTo>
                </li>
              </ul>
            </div>
            <div class="resume-bd">
              <ul>
                <li>电网运行费用</li>
                <li>电压越限数量</li>
                <li>无功出力越限数量</li>
                <li>平衡机工作状态</li>
                <li>新能源机组容量</li>
                <li>线路越限数量</li>
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
            <timeSlider  v-on:stop="stop" v-on:openDialog="openDialog" v-on:convertHistoryData = "convertHistoryData" v-on:restoreTimer="restoreTimer"/>
          </div>
        <!-- <div class="item right"> -->

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
          v-on:dragging="resize_r1" :z="999" h="200" w="300" :x="10" :y="parentH-200"  >

          <div class="panel">
            <h2 style="margin-bottom: -50px;">累计奖励</h2>
            <wordCloud  :wi="width_r1" :he="height_r1" />
            <div class="panel-footer"></div>
          </div>
        </VueDragResize>

      <VueDragResize  :isResizable="true"    v-on:resizing="resize_r3" 
          v-on:dragging="resize_r3" :z="999" h="300" w="300" :x="10" :y="parentH*0.1+300">

          <div class="panel">
            <h2>异常事件</h2>
            <history  :wi="width_r3" :he="height_r3"/>
            <div class="panel-footer"></div>
          </div>
      </VueDragResize>

        <!-- </div> -->
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
      graph_timer:null,
      check_value:null,

      imgSrc: '',
      weatcherData: {},
      startVal1: 0,
      startVal2: 0,
      startVal3: 0,
      startVal4: 0,
      startVal5: 0,
      startVal6: 0,
      one:0,
      two:0,
      three:0,
      four:0,
      five:0,
      six:0,

      geoCoordMap: {},
      bus_num:427,
      dialogVisible: true,

      parentH:0,
      parentW:0,
      width_r2: 250,
      height_r2: 250,
      top_r2: 0,
      left_l2: 0,

      width_l2: 200,
      height_l2: 400,
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

      width_r1: 200,
      height_r1: 300,
      top_r1: 0,
      left_r1: 0,

      width_r3: 200,
      height_r3: 200,
      top_r3: 0,
      left_r3: 0,

      sync:0,
      history:0,
  	}
  },
  computed: {
  	
  },
  created() {
    setInterval(this.checkValue, 10000); // 10秒执行一次
  },
  mounted() {
    this.getWeather();
    this.timer = setInterval(() => {
      this.getWeather();
    }, 1000 * 60 * 60)

    this.nowTimes();
    // this.getEchart();
    this.parentH = this.$refs.parent.clientHeight
    this.parentW = this.$refs.parent.clientWidth
    console.log('parenth:'+this.parentH)
    console.log('parentw:'+this.parentW)
    this.getRewards();
  },
  methods: {
    async checkValue() {
      this.startVal1 = this.one
      this.startVal2 = this.two
      this.startVal3 = this.three
      this.startVal4 = this.four
      this.startVal5 = this.five
      this.startVal6 = this.six
      
      this.getRewards()
    },
    getRewards(){
      this.$axios({
        method: "get",
        url: "/grid/expense"
      }).then(res => {
        this.one = res.data
        // console.log("=============expense===========")
        // console.log(res)
      })
      this.$axios({
        method: "get",
        url: "/grid/volt"
      }).then(res => {
        this.two = res.data
      })
      this.$axios({
        method: "get",
        url: "/grid/q"
      }).then(res => {
        this.three = res.data
      })
      this.$axios({
        method: "get",
        url: "/grid/p"
      }).then(res => {
        this.four = res.data
      })
      this.$axios({
        method: "get",
        url: "/grid/new_energy"
      }).then(res => {
        this.five = res.data
      })
      this.$axios({
        method: "get",
        url: "/grid/over"
      }).then(res => {
        this.six = res.data
      })
    },
    
    stop(){
        console.log("stop")
        
        clearInterval(this.graph_timer); 
        console.log(this.graph_timer == null)
        // let myChart = echarts.getInstanceByDom(document.getElementById('chart_map'));
        // myChart.clear();
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
                formatter:function(params){
                  const node = params.data;
                  const img = `<img src="../assets/img/wind.png" width="50" height="50" />`;
                  return node.name + '<br/>机组有功出力：'+node.gen_p
                }
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

      // let icon_bus = '<svg t="1683689038796" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="812" width="200" height="200"><path d="M511.999 511.999m-511.999 0a511.999 511.999 0 1 0 1023.998 0 511.999 511.999 0 1 0-1023.998 0Z" fill="#FFD630" p-id="813"></path><path d="M1023.901998 522.101178l-125.680209-125.68021L144.830546 613.950792l412.703254 408.001172c258.124537-22.704399 461.324109-237.024166 466.368198-499.850786z" fill="#F5BE18" p-id="814"></path><path d="M146.320572 388.048821l35.890631-6.192109c0-6.306111 5.160091-11.580204 11.580203-11.580203H600.990564c3.670065 0 6.880121 1.72003 9.06016 4.358076h248.952376c7.108125 0 12.958228 5.848103 12.958227 12.958228v0.458008h5.962105c14.104248 0 25.570449 9.404165 25.57045 20.870367v184.163237c0 11.466202-11.466202 20.870367-25.57045 20.870367H146.550576c-14.104248 0-26.488466-9.402165-25.570449-20.870367l15.36627-183.475225c0.916016-11.466202-3.900069-21.672381 10.206179-21.672381l-0.232004 0.112002z" fill="#3A99D7" p-id="815"></path><path d="M187.7213 424.521462h52.634925v172.35503H187.7213z" fill="#C1E9FF" p-id="816"></path><path d="M194.943427 431.385583h38.076669v66.289165H194.943427z" fill="#FFFFFF" p-id="817"></path><path d="M763.367419 424.521462h52.634925v172.35503h-52.634925z" fill="#C1E9FF" p-id="818"></path><path d="M770.591546 431.385583h38.076669v66.289165h-38.076669z" fill="#FFFFFF" p-id="819"></path><path d="M819.672408 424.521462h52.634926v172.35503h-52.634926z" fill="#C1E9FF" p-id="820"></path><path d="M826.894535 431.385583h38.07667v66.289165H826.894535z" fill="#FFFFFF" p-id="821"></path><path d="M903.267878 581.38622v11.810207c0 11.466202-11.466202 20.870367-25.57045 20.870367H146.320572c-14.104248 0-25.570449-9.402165-25.570449-20.870367v-11.810207h782.517755z" fill="#E84F4F" p-id="822"></path><path d="M299.407263 559.023827c-26.14446 0-47.360833 21.214373-47.360832 47.358832 0 26.14246 21.214373 47.360833 47.360832 47.360833s47.360833-21.214373 47.360833-47.360833c-0.002-26.14446-21.216373-47.358832-47.360833-47.358832z" fill="#333333" p-id="823"></path><path d="M299.407263 577.600153c-15.93828 0-28.782506 12.958228-28.782506 28.782506 0 15.93828 12.958228 28.782506 28.782506 28.782506 15.93828 0 28.782506-12.958228 28.782506-28.782506 0.002-15.93828-12.958228-28.782506-28.782506-28.782506z" fill="#E6E6E6" p-id="824"></path><path d="M299.407263 595.146462a11.256198 11.256198 0 0 0-11.238198 11.236197 11.256198 11.256198 0 0 0 11.238198 11.236198 11.256198 11.256198 0 0 0 11.238198-11.236198 11.256198 11.256198 0 0 0-11.238198-11.236197z" fill="#B3B3B3" p-id="825"></path><path d="M260.190574 405.823134h71.555257c2.178038 0 3.900069 1.834032 3.900069 4.01407v56.532994c0 2.178038-1.72003 4.014071-3.900069 4.01407h-71.555257c-2.178038 0-3.900069-1.834032-3.900069-4.01407v-56.532994c0-2.180038 1.72003-4.014071 3.900069-4.01407z m412.47325 0h71.555258c2.178038 0 3.900069 1.834032 3.900069 4.01407v56.532994c0 2.178038-1.72003 4.014071-3.900069 4.01407h-71.555258c-2.178038 0-3.900069-1.834032-3.900068-4.01407v-56.532994c0.002-2.180038 1.72003-4.014071 3.900068-4.01407z m-103.089812 0h71.555258c2.178038 0 3.900069 1.834032 3.900068 4.01407v56.532994c0 2.178038-1.72003 4.014071-3.900068 4.01407h-71.555258c-2.178038 0-3.900069-1.834032-3.900069-4.01407v-56.532994c0.002-2.180038 1.72203-4.014071 3.900069-4.01407z m-103.089812 0h71.555258c2.178038 0 3.900069 1.834032 3.900068 4.01407v56.532994c0 2.178038-1.72003 4.014071-3.900068 4.01407h-71.555258c-2.178038 0-3.900069-1.834032-3.900069-4.01407v-56.532994c0-2.180038 1.72203-4.014071 3.900069-4.01407z m-103.089812 0h71.555258c2.178038 0 3.900069 1.834032 3.900068 4.01407v56.532994c0 2.178038-1.72003 4.014071-3.900068 4.01407h-71.555258c-2.178038 0-3.900069-1.834032-3.900069-4.01407v-56.532994c0.002-2.180038 1.72003-4.014071 3.900069-4.01407z" fill="#C1E9FF" p-id="826"></path><path d="M135.426381 418.321353l24.768435-0.458008c4.930087-0.114002 8.944157 4.014071 8.944157 8.944157v100.223762a8.956157 8.956157 0 0 1-8.944157 8.944157H125.566207c-6.764119 0.57401 1.834032-125.336203 9.862174-117.76807l-0.002 0.114002z" fill="#FFFFFF" p-id="827"></path><path d="M712.110518 559.023827c-26.14446 0-47.360833 21.214373-47.360833 47.358832 0 26.14246 21.214373 47.360833 47.360833 47.360833s47.358832-21.214373 47.358832-47.360833c-0.002-26.14446-21.214373-47.358832-47.358832-47.358832z" fill="#333333" p-id="828"></path><path d="M712.110518 577.600153c-15.93828 0-28.782506 12.958228-28.782506 28.782506 0 15.93828 12.958228 28.782506 28.782506 28.782506 15.93828 0 28.782506-12.958228 28.782506-28.782506 0-15.93828-12.958228-28.782506-28.782506-28.782506z" fill="#E6E6E6" p-id="829"></path><path d="M712.110518 595.146462a11.256198 11.256198 0 0 0-11.238198 11.236197 11.256198 11.256198 0 0 0 11.238198 11.236198 11.254198 11.254198 0 0 0 11.236197-11.236198 11.254198 11.254198 0 0 0-11.236197-11.236197z" fill="#B3B3B3" p-id="830"></path><path d="M134.28036 551.455694h17.890315a8.600151 8.600151 0 0 1 8.600151 8.600151v6.192109a8.600151 8.600151 0 0 1-8.600151 8.600151h-17.890315a8.600151 8.600151 0 0 1-8.600151-8.600151v-6.192109a8.600151 8.600151 0 0 1 8.600151-8.600151z" fill="#FFFFFF" p-id="831"></path><path d="M131.184306 586.202304h4.358077a5.848103 5.848103 0 0 1 5.848102 5.848103v4.358077a5.848103 5.848103 0 0 1-5.848102 5.848103h-4.358077a5.848103 5.848103 0 0 1-5.848103-5.848103v-4.358077a5.846103 5.846103 0 0 1 5.848103-5.848103z" fill="#666666" p-id="832"></path></svg>';
      // let icon_wind = '<svg t="1683693969058" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1129" width="200" height="200"><path d="M955.777 343.887c-16.301-79.474-83.544-134.493-167.092-134.493-6.114 0-14.262 2.04-22.415 2.04-63.168 8.153-122.261 63.168-134.489 122.266-2.038 12.224 8.149 32.604 18.34 38.713 4.075 2.038 10.189 4.078 14.264 4.078 10.189 0 20.376-8.153 26.49-22.416 2.038-4.075 2.038-6.114 4.075-10.189 0-4.078 2.04-8.153 4.078-12.227 16.302-36.678 52.98-59.094 93.732-59.094 14.267 0 26.49 4.075 38.718 8.148 50.946 20.382 77.435 77.435 61.133 128.38-14.262 46.868-55.02 73.357-112.073 73.357H104.01c-6.113 0-14.263 0-20.376 4.074-8.153 6.114-18.34 20.381-18.34 30.569 0 12.227 14.262 22.417 22.415 26.49 6.113 2.04 10.189 2.04 14.263 2.04 4.078 0 6.114 0 6.114-4.08h666.336c18.336 0 36.678 0 55.02-4.074 89.658-20.375 142.637-103.924 126.335-193.582zM637.893 643.434H104.008c-6.113 0-12.228 0-18.34 4.074-8.15 6.113-18.339 18.342-18.339 28.53s12.224 22.416 20.377 26.49c6.113 4.075 12.227 4.075 16.302 4.075h489.054c20.376 0 46.867 0 71.322 2.04 22.415 2.034 42.792 14.261 55.02 32.603 14.262 18.337 18.335 40.752 12.226 63.168-10.192 34.643-32.603 55.019-65.207 59.094h-14.266c-28.529 0-50.945-14.262-67.246-40.752-6.11-12.228-16.303-24.455-30.566-24.455-6.113 0-12.227 2.04-18.34 6.113-26.49 16.301-12.224 40.756-6.11 50.945 24.451 44.827 73.357 71.322 124.3 71.322 18.337 0 34.64-2.041 50.94-6.115 63.174-22.416 101.891-89.662 89.664-156.905-14.263-75.4-71.322-120.227-156.906-120.227z" fill="#2C2C2C" p-id="1130"></path><path d="M106.047 384.64h173.207c14.262 0 79.47 0 95.771-2.035h65.207c75.396-2.04 136.528-61.132 138.568-138.567 2.035-75.396-55.02-140.603-132.454-146.716h-10.188c-55.02 0-108 34.643-126.34 81.509-4.076 10.187 0 32.604 10.188 40.756 4.074 6.11 10.188 8.149 16.302 8.149 8.152 0 18.34-6.114 26.49-16.301 2.04-2.041 4.079-6.114 6.113-8.15 2.039-2.04 4.075-6.114 6.113-8.153 14.262-20.376 38.718-32.603 63.168-32.603 6.113 0 12.227 0 18.34 2.04 40.757 12.222 63.17 46.866 59.095 87.623-6.114 40.752-38.718 69.282-79.47 69.282h-324c-18.337 0-46.866 0-46.866 32.603 0 8.149 2.038 16.302 8.153 22.416 8.148 8.147 20.375 8.147 32.603 8.147z" fill="#2C2C2C" p-id="1131"></path></svg>'
      // let icon_fire = '<svg t="1683693882518" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="980" width="200" height="200"><path d="M336 972.8c-60.8-128-28.8-201.6 19.2-268.8 51.2-76.8 64-150.4 64-150.4s41.6 51.2 25.6 134.4c70.4-80 83.2-208 73.6-256 160 112 230.4 358.4 137.6 537.6 492.8-281.6 121.6-700.8 57.6-745.6 22.4 48 25.6 128-19.2 166.4-73.6-281.6-256-336-256-336 22.4 144-76.8 300.8-172.8 419.2-3.2-57.6-6.4-96-38.4-153.6-6.4 105.6-86.4 188.8-108.8 294.4C89.6 758.4 140.8 860.8 336 972.8L336 972.8z" p-id="981"></path></svg>'
      // let icon_sun = '<svg t="1683693985538" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1279" width="200" height="200"><path d="M501.48 493.55m-233.03 0a233.03 233.03 0 1 0 466.06 0 233.03 233.03 0 1 0-466.06 0Z" fill="#F9C626" p-id="1280"></path><path d="M501.52 185.35H478.9c-8.28 0-15-6.72-15-15V87.59c0-8.28 6.72-15 15-15h22.62c8.28 0 15 6.72 15 15v82.76c0 8.28-6.72 15-15 15zM281.37 262.76l-16 16c-5.86 5.86-15.36 5.86-21.21 0l-58.52-58.52c-5.86-5.86-5.86-15.36 0-21.21l16-16c5.86-5.86 15.36-5.86 21.21 0l58.52 58.52c5.86 5.86 5.86 15.35 0 21.21zM185.76 478.48v22.62c0 8.28-6.72 15-15 15H88c-8.28 0-15-6.72-15-15v-22.62c0-8.28 6.72-15 15-15h82.76c8.28 0 15 6.72 15 15zM270.69 698.63l16 16c5.86 5.86 5.86 15.36 0 21.21l-58.52 58.52c-5.86 5.86-15.36 5.86-21.21 0l-16-16c-5.86-5.86-5.86-15.36 0-21.21l58.52-58.52c5.85-5.86 15.35-5.86 21.21 0zM486.41 794.24h22.62c8.28 0 15 6.72 15 15V892c0 8.28-6.72 15-15 15h-22.62c-8.28 0-15-6.72-15-15v-82.76c0-8.28 6.72-15 15-15zM706.56 709.31l16-16c5.86-5.86 15.36-5.86 21.21 0l58.52 58.52c5.86 5.86 5.86 15.36 0 21.21l-16 16c-5.86 5.86-15.36 5.86-21.21 0l-58.52-58.52c-5.86-5.85-5.86-15.35 0-21.21zM802.17 493.59v-22.62c0-8.28 6.72-15 15-15h82.76c8.28 0 15 6.72 15 15v22.62c0 8.28-6.72 15-15 15h-82.76c-8.28 0-15-6.72-15-15zM717.24 273.44l-16-16c-5.86-5.86-5.86-15.36 0-21.21l58.52-58.52c5.86-5.86 15.36-5.86 21.21 0l16 16c5.86 5.86 5.86 15.36 0 21.21l-58.52 58.52c-5.86 5.86-15.35 5.86-21.21 0z" fill="#F9C626" p-id="1281"></path></svg>'
      
      // let icons = new Map();
      // // icons.set("bus",icon_bus);
      // icons.set("sun",icon_sun);
      // icons.set("wind",icon_wind);
      // icons.set("fire",icon_fire);

      // icons.forEach((key,value)=>{
      //   let icon = value;
      //   icon = encodeURIComponent(icon) // 转译
      //   icon = 'data:image/svg+xml;utf8,' + icon // 添加url前缀
      //   icon = 'image://' + icon // 添加ECharts需要的前缀
      //   icons.set(key,icon);
      // });

      Reflect.ownKeys(gens).forEach(function(key){
          // console.log(key,gens[key]);
          res.nodes.push({
          name:key,
          category: 0,//0代表总线
          symbolSize:15,
          // symbol:icons.get('bus'),
        });

        if(gens[key]!=''){
     
          var id = gens[key].toString().split(".");

          res.nodes.push({
          name:"gen_" + id[1],
          category: 1,//1代表发电机
          symbolSize:10,
          symbol:'diamond',
            // symbol: icons.get('fire')

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

      console.log("=============graph===========\n")
      console.log(graph)
      let myChart = echarts.getInstanceByDom(document.getElementById('chart_map'));

  myChart.hideLoading();
  graph.nodes.forEach(function (node) {
    node.label = {
      show: node.symbolSize > 30
    };
    // if (node.category === 0) { //总线
    //   node.symbol = 'image://'+require('@/assets/iconfont/bus.png');
    // } else if (node.category === 1) { //发电机
    //   if(node.name.split('_')[1] % 4 == 0) {
    //     node.symbol = 'image://'+require('@/assets/iconfont/solar-panel.png');
    //   } else if(node.name.split('_')[1] % 4 == 1){
    //     node.symbol = 'image://'+require('@/assets/iconfont/clean-energy.png');
    //   } else if(node.name.split('_')[1] % 4 == 2){
    //     node.symbol = 'image://'+require('@/assets/iconfont/thermal.png');
    //   } else {
    //     node.symbol = 'image://'+require('@/assets/iconfont/radiation.png');
    //   }
    // } else if (node.category === 2) { //负载
    //   node.symbol = 'image://'+require('@/assets/iconfont/architecture-and-city.png');
    // }
    // node.symbolSize = 32;
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
           symbol:'diomand',
           color:'red',
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
        console.log(params)
        // 更新节点样式
        console.log("==============cur node=============")
        console.log(option.series[0].data[dataIndex])
        let node = option.series[0].data[dataIndex]

        if (node.category === 0) { //总线
          option.series[0].data[dataIndex].symbol = 'image://'+require('@/assets/iconfont/bus.png');
        } else if (node.category === 1) { //发电机
          if(node.name.split('_')[1] % 4 == 0) {
            option.series[0].data[dataIndex].symbol = 'image://'+require('@/assets/iconfont/solar-panel.png');
          } else if(node.name.split('_')[1] % 4 == 1){
            option.series[0].data[dataIndex].symbol = 'image://'+require('@/assets/iconfont/clean-energy.png');
          } else if(node.name.split('_')[1] % 4 == 2){
            option.series[0].data[dataIndex].symbol = 'image://'+require('@/assets/iconfont/thermal.png');
          } else {
            option.series[0].data[dataIndex].symbol = 'image://'+require('@/assets/iconfont/radiation.png');
          }
        } else if (node.category === 2) { //负载
          option.series[0].data[dataIndex].symbol = 'image://'+require('@/assets/iconfont/building.png');
        }
        option.series[0].data[dataIndex].symbolSize = 32;
        // option.series[0].data[dataIndex].itemStyle = highlightStyle.node.itemStyle;

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
            node.symbol = null;
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

      // let myChart = echarts.getInstanceByDom(document.getElementById('chart_map'));
      //   myChart.dispose();

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

    that.graph_timer = setInterval(function(){
      let topo_data = that.getTopoInfo();
      setTimeout(()=>{
        var graph = methods.convertData(topo_data);
        that.getGridStatus(graph)
        setTimeout(()=>{
          methods.setTopoOption(graph);
        },2000)

      },4000)
    },9000);


  },5000);


    },
 
  beforeDestroy() {
    clearInterval(this.timer);
  },
    convertHistoryData(data){
      console.log("============converthistorydata===========")
      clearInterval(this.graph_timer);
      const graph = this.convertData(data);
      this.setTopoOption(graph)
    },
    restoreTimer(){
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!restore!!!!!!!!!!!!!!!!!!!!!!!!!")
      var methods = this.$options.methods
      var that = this

      this.graph_timer = setInterval(function(){
      let topo_data = that.getTopoInfo();
      setTimeout(()=>{
        var graph = methods.convertData(topo_data);
        that.getGridStatus(graph)
        setTimeout(()=>{
          methods.setTopoOption(graph);
        },2000)

      },4000)
    },9000);
    }
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

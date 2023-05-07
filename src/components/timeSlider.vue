<template>
    <div >
      <span class="demonstration">选择拓扑图模拟时间</span>
      <span> <el-button type="primary" @click="stop">停止模拟</el-button></span>
      <span> <el-button type="primary" @click="restart">重新开始</el-button></span>
      <span>
        <a href="http://39.105.194.84:8002/webroot/decision" target="_blank">打开中国电网展示大屏</a>
      </span>
    

      <el-slider
        v-model="value1" max = 100 :format-tooltip="formatTooltip"
        :step="10">
      </el-slider>
    </div>
    
  </template>
  
  <script>
    export default {
    name:'timeSlider',
      props:{
        dialogVisible:{
          type:Boolean
        },
      },
      data() {
        return {
          value1: -20,
        }
      },
      methods: {
      formatTooltip(val) {
        return val - 100;
      },
      stop(){
        this.$emit("stop");
      },
      restart(){
        this.$emit("openDialog");
      }
    }
    }
  </script>
  <style>
.demonstration{
  color: rgb(255, 255, 255);
}
</style>
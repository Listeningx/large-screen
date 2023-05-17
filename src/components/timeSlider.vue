<template>
    <div class="container">
      <span class="demonstration">选择拓扑图模拟时间</span>
      <span> <el-button type="primary" @click="stop">停止模拟</el-button></span>
      <span> <el-button type="primary" @click="restart">重新开始</el-button></span>
      <span>
        <a href="http://39.105.194.84:8002/webroot/decision" target="_blank">打开中国电网展示大屏</a>
      </span>
    

      <el-slider
        v-model="value1" max = 10 :format-tooltip="formatTooltip"  @change="handleSliderChange"
        :step="1" id="slider">
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
          value1: 10,
        }
      },
      mounted(){
      
      },
      methods: {
      formatTooltip(val) {
        return val - 10;
      },
      stop(){
        this.$emit("stop");
      },
      restart(){
        this.$emit("openDialog");
      },
      handleSliderChange() {
        if(this.value1 < 10){
          this.fetchHistoryData(10-this.value1);
        }else{
          this.$emit("restoreTimer")
        }
      // 滑条值变化时触发的事件
      // 可选：在这里进行额外的操作，或者不使用watch，直接在此函数中调用fetchHistoryData函数
    },
    fetchHistoryData(position) {
      // 发送 Axios GET 请求
      console.log("silderchange====================")

      this.$axios.get('/grid/history', {
            params: {
              cnt: position
            }
          })
      .then(response => {
        // 处理请求成功的响应数据
        const historyData = response.data;
        // 进行后续操作，比如更新页面内容等
        console.log(historyData);
        this.$emit("convertHistoryData",historyData);

      })
      .catch(error => {
        // 处理请求失败的情况
        console.error('请求历史信息失败:', error);
      });
    },
    }
    }
  </script>
  <style>
.demonstration{
  color: rgb(255, 255, 255);
}
.container span {
  margin-right: 10px; /* 设置间距大小，根据需求调整 */
  margin-left: 10px; /* 设置间距大小，根据需求调整 */

}
</style>
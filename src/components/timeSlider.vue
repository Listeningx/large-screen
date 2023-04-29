<template>
    <div >
      <span class="demonstration">时间戳</span>
      <el-slider
        v-model="value1" max = 100 :format-tooltip="formatTooltip"
        :step="10">
      </el-slider>
    </div>
    
  </template>
  
  <script>
    export default {
    name:'timeSlider',
      data() {
        return {
          value1: -20,
        }
      },
      methods: {
      formatTooltip(val) {
        return val - 100;
      }
    }
    }
  </script>
  <style>
.demonstration{
  color: rgb(255, 255, 255);
}
</style>
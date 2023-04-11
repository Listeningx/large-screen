<template>
    <div>
      <VueDragResize :isActive="true"  :isResizable="true"  :z="999">
        <img src="@/assets/img/bg-1.png" v-drag height="100px" width="100px" />
      </VueDragResize>
    </div>
  </template>
  
  <style>
  .vdr.active:before{
    outline: none
  }
  </style>
  
  <script>
  import VueDragResize from 'vue-drag-resize'
  export default {
    name: 'littleBar',
    components: {
      VueDragResize
    },
    data () {
      return {}
    },
    methods: {},
    mounted () {
  
    }
  }
  </script>
  
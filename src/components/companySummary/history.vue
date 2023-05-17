<!--
 描述: 发展历程
 作者: Jack Chen
 日期: 2020-05-09
-->

<template>
  <div class="history-container">
    <div class="tabs"> 
      <ul class="tab-tilte">
        <li v-for="(itemTit, index) in tabTitle" :key="itemTit" @mouseover="handleMouseOver(index)" @mouseout="handleMouseOut(index)" :class="{active: cur == index}">
          {{ itemTit }}
        </li>
      </ul>
      <div class="indicatorDots">
        <span :class="{active: cur == i}" v-for="(v, i) in tabTitle" :key="i"></span>
      </div>
      <div class="tab-content">
        <div v-for="(itemCon, index) in tabCon" v-show="cur == index" :key="itemCon">
          <div v-for="(v, i) in itemCon" :key="i" class="content">
            {{ v }}
          </div>
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
import * as echarts from 'echarts';
import * as axios from 'axios'
export default {
  name: "history",
  data() {
    return {
      timer: null,
      tabTitle: ['线路', '平衡机','发电机'],
      tabCon: [
        [
          '9:20:03 线路软过载',
          '10:27:40 线路断开'
        ],
        [
          '9:30:03 平衡机接近极限',
          '11:32:43  平衡机接近极限',
        ],
        [
          '9:56:14 发电机达到上限'
        ],
        // [
        //   '9:41:09 gen_20功率增加59kW',
        //   '9:46:25 ld_35电压降低34kV',
        //   '9:48:18 ld_24电压增加32kV',
        // ],
        // [
        //   '9:52:13 ld_22功率降低19kV',
        //   '9:57:45 ld_57电压降低2V',
        // ],
        // [
        //   '10:01:13 ld_67电压降低68kV',
        //   '10:04:51 ld_7电压降低41kV',
        //   '10:08:07 ld_29电压降低63kV',
        // ],
        // [
        //   '10:15:33 gen_48功率增加178kW',
        //   '10:18:10 ld_9电压增加90kV',
        //   '10:19:02 ld_20电压降低32kV',
        // ]
      ],
      cur: 0, //默认选中第一个tab
    }
  },
  mounted() {
    this.getTimer();
    this.$axios({
      method: "get",
      url: "/grid/exception" 
    })
      .then((res) => {
       console.log("=============exc==============");
       console.log(res.data)
       this.tabCon[0]=res.data[0].toString()
      }).catch((err) => {
        console.log(err);
      //  console.log("flow_err");

  })
  },
  methods: {
    getTimer() {
      this.timer = setInterval(() => {
        this.cur++;
        if (this.cur == this.tabTitle.length) {
          this.cur = 0;
        }
      }, 2000)
    },
    handleMouseOver(index) {
      this.cur = index;
      clearInterval(this.timer);
    },
    handleMouseOut(index) {
      this.getTimer();
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.history-container {
  margin: 0 0.125rem;
  .tabs {
    display: flex;
    .tab-tilte {
      li {
        color: #fff;
        background-color: rgba(36, 196, 255, 0.5);
        text-align: center;
        cursor: pointer;
        font-size: 0.125rem;
        width: 1.0rem;
        height: 0.35rem;
        line-height: 0.35rem;
        margin-bottom: 0.175rem;
        -webkit-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        &.active{
          background: linear-gradient(to right, #1b81bc, 20%, #24c4ff);
          color: #fff;
        }
      }
    }
    .indicatorDots {
      background-color: rgba(36, 196, 255, 0.5);
      width: 1px;
      height: 2.8rem;
      margin: 0.0625rem 0 0 0.375rem;
      span {
        display: block;
        height: 0.525rem;
        margin-left: -0.0875rem;
        &:after {
          content: '';
          display: block;
          width: 0.125rem;
          height: 0.125rem;
          background: #ddd;
          -webkit-border-radius: 50%;
          -ms-border-radius: 50%;
          -o-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          border: 2px solid #1b81bc;
        }
        &.active {
          &:after {
            background: #24c4ff;
            -webkit-box-shadow: 0 0 0.125rem #1b81bc;
            box-shadow: 0 0 0.125rem #1b81bc;
          }
        }
      }
    }
    .tab-content {
      display: flex;
      align-items: center;
      div {
        margin-left: 0.1875rem;
        color: #fff;
        .content {
          font-size: 0.175rem;
          line-height: 0.275rem;
          padding: 0.1rem 0;
        }
      }
    }
  }
}
</style>

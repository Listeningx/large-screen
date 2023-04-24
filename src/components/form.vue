<template>
    <div>
   
        <el-form ref="form" :model="form" label-width="80px">
        
        <el-form-item label="模拟算法">
            <el-radio-group v-model="form.algorithm">
            <el-radio label="UKPG"></el-radio>
            <el-radio label="random"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="速率">
            <el-radio-group v-model="form.speed">
            <el-radio label="0.1s"></el-radio>
            <el-radio label="2s"></el-radio>
            <el-radio label="5s"></el-radio>
            <el-radio label="10s"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="电网环境">
            <el-radio-group v-model="form.env">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item center>
            <el-button type="primary" @click="start" style="text-align:center">开始模拟</el-button>
        </el-form-item>
        </el-form>

</div>
</template>

<script>
export default {
    name:'startForm',
    data() {
      return {
        form: {
            algorithm:'',
            speed:'',
            env:'',
        }
      }
    },
    props:{
        getEchart:Function,
        dialogVisible:Boolean,
    },
    methods: {
      start() {
        console.log('submit!');
        this.dialogVisible = false;
        console.log(this.form)
        this.$axios({
          method: "post",

          // TODO:
          url: "/api/grid/start" ,

          data: {
            /* 传入参数 */
            policy: this.form.algorithm,
            speed: this.form.speed,
            env:this.form.env,
          },
        })
          .then((res) => {
            /* res.data - 返回值 */
            if(res.data.result==1){
              window.alert("创建成功")
            }
          })
          .catch((err) => {
            /* 异常信息 */
            console.log(err);
          });
          this.getEchart();

      },
      }
    }
  
</script>
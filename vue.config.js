module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/vueDataV/" : "/",
  publicPath:"./",
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    open:true,
    host:"localhost",

    port: 8095,
    proxy: {
      '/api': {    //这里的/api表示的意思是以/api开头的才生效 ->刷下面的重点
        target: "http://39.105.194.84:8001/",
        changOrigin: true,   //如果接口跨域这里就要这个参数配置
        pathRewrite: {
            //'^/api': '/api'  //实际请求地址是http://baidu.com/api/news/list
            '^/api': ''  //实际请求地址是http://baidu.com/news/list
            // 我的理解就是http://baidu.com替换了/api/news/list里面的/api

        }
      }
    }
  },
  configureWebpack: {
    // 把原本需要写在webpack.config.js中的配置代码 写在这里 会自动合并
    externals: {
     'jquery' : '$',
     'echarts': 'echarts',
     'axios' : 'axios'
    }
  }
};
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueParticles from 'vue-particles'
import Vcomp from './components/index'
import Toast from './components/toast'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as echarts from 'echarts';
import '@/assets/styles/base.scss'
import '@/assets/styles/common.scss'
import '@/assets/iconfont/iconfont.css'

import axios from 'axios'
import VueAxios from "vue-axios";
 
Vue.use(VueAxios, axios)

Vue.use(vueParticles)
Vue.use(Vcomp)
Vue.use(ElementUI);
Vue.use(echarts)
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

Vue.prototype.$Toast = Toast

axios.defaults.baseURL =  "http://39.105.194.84:8001/";
// axios.defaults.baseURL =  "/api/";


router.beforeEach((to, from, next) => {
	if (to.meta.title) {
	  document.title = to.meta.title;
	}
	next();
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')




import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

// 导入 axios
import axios from 'axios'
// 设置axios 的根路径
axios.defaults.baseURL = 'http://localhost:8090/mtms/'
// 配置axios请求拦截器，为每次请求添加请求头，设置token
axios.interceptors.request.use(config => {
  console.log('config', config)

  config.headers.Authorization = window.sessionStorage.getItem('access_token')
  // 在最后必须return config
  return config
})
// 把axios 挂载到 Vue原型中
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

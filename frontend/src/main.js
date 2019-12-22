import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './assets/css/global.css'
import './plugins/element.js'
import './assets/css/admin.css'
import './assets/css/amazeui.min.css'
import './assets/css/app.css'

Vue.config.productionTip = false
// 配置请求的根路径
/* let ROOT
if (process.env.NODE_ENV === 'development') {
  ROOT = '/api'// 开发环境下的代理地址，解决本地跨域
} else {
  ROOT = 'http://127.0.0.1:8888/api/private/v1/'// 生产环境下的地址
} */
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
/* axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
}) */
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

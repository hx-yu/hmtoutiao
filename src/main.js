import Vue from 'vue'
import App from './App.vue'
// 引入导航守卫
import './permission'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import Components from './components'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
Vue.use(ElementUI)
Vue.use(Components)
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/home', component: Home },
    { path: '/login', component: Login }
  ]
})

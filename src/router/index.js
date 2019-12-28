import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import HomeMain from '../views/home/home.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '',
          component: HomeMain },
        { path: 'commentlist',
          component: () => import('../views/comment') },
        { path: 'materialmaster',
          component: () => import('../views/materialmaster') },
        { path: 'contentlist',
          component: () => import('../views/contentlist') },
        { path: 'publish',
          component: () => import('../views/publish') },
        { path: 'publish/:articleId',
          component: () => import('../views/publish') },
        { path: 'userinfo',
          component: () => import('../views/userinfo') },
        { path: 'imgdata',
          component: () => import('../views/imgdata') }]
    }, { path: '/login', component: Login }]
})

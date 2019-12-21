// 引入路由
import router from '../router'
// 给路由配置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user_token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

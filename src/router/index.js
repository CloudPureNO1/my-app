import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/home', name: 'Home', component: Home }
]

const router = new VueRouter({
  routes
})

// 挂载路有导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的页面
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行 next('/login')强制跳转
  if (to.path === '/login') next()
  // 获取access_token
  // sessionStorage 与window.sessionStorate 是同一个对象
  const tokenStr = window.sessionStorage.getItem('access_token')
  if (!tokenStr) return next('/login')
  next()
})

export default router

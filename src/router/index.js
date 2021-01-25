import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

/**
 * vue项目报错：Avoided redundant navigation to current location: "/"。先说一下是怎么触发这个报错的，就是博主用element ui写得侧边导航栏中用到了路由，然后重复点击这个路由就出现这个报错了。其实这个报错并不影响项目的正常运行，但是作为有一点代码洁癖的程序员，这种红色的错误信息是绝对无法忍受的！
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: 'Welcome', component: Welcome },
      { path: '/users', name: 'Users', component: Users }
    ]
  }
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

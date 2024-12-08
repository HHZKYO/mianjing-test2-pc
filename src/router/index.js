import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Dashboard from '@/views/Dashboard'
import Article from '@/views/Article'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      { path: '/dashboard', component: Dashboard },
      { path: '/article', component: Article }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    next()
    return
  }
  if (whiteList.includes(to.path)) {
    next()
    return
  }
  next('login')
})

export default router

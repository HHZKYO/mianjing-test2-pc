import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Dashboard from '@/views/Dashboard'
import Article from '@/views/Article'

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

export default router

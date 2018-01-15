import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
        path:'/dashboard',
        name:'Dashboard',
        component:Dashboard
    }
  ]
})

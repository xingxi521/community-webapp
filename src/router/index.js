import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      index: 0
    },
    component: Home
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/views/Message/Message.vue')
  },
  {
    path: '/hot',
    name: 'Hot',
    component: () => import('@/views/Hot/Hot.vue')
  },
  {
    path: '/my',
    name: 'My',
    meta: {
      index: 0
    },
    component: () => import('@/views/My/My.vue')
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import('@/views/My/Center.vue')
  },
  {
    path: '/changepassword',
    name: 'ChangePassWord',
    meta: {
      index: 1
    },
    component: () => import('@/views/My/ChangePassWord.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    meta: {
      index: 1
    },
    component: () => import('@/views/My/Setting.vue')
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import('@/views/My/Sign.vue')
  },
  {
    path: '/details/:id',
    props: true,
    name: 'Details',
    meta: {
      index: 1
    },
    component: () => import('@/views/Post/PostDetails.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register/Register.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/Forget/Forget.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

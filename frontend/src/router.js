import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './assets/components/Login.vue'
import Home from './assets/components/Home.vue'
import Welcome from './assets/components/Welcome.vue'
import Student from './assets/components/Student.vue'
import Class from './assets/components/Class.vue'
import Change from './assets/components/Change.vue'
import ChooseClass from './assets/components/ChooseClass.vue'
import Department from './assets/components/Department.vue'
import Jiangcheng from './assets/components/Jiangcheng.vue'
import Studentmessage from './assets/components/Studentmessage.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/student', component: Student },
      { path: '/class', component: Class },
      { path: '/change', component: Change },
      { path: '/chooseClass', component: ChooseClass },
      { path: '/department', component: Department },
      { path: '/jiangcheng', component: Jiangcheng },
      { path: '/studentmessage', component: Studentmessage }
    ]
  }
]

const router = new VueRouter({
  routes
})
/* router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  next()
}) */
export default router

import Vue from 'vue'//引入vue
import VueRouter from 'vue-router'//引入路由插件
Vue.use(VueRouter)//注册路由插件
// 路由列表
const routes = [
  {
    path: '/',//页面地址
    name: 'index',//路由名称
    component: () => import('../views/index.vue'),//路由文件地址
    children: [{//二级路由列表
      path: '/',
      name: 'index',
      meta: { title: "首页" },
      component: () => import('../views/index/index.vue'),
    }, {
      path: '/researcher',
      name: 'researcher',
      meta: { title: "科研队伍" },
      component: () => import('../views/index/researcher.vue'),
    }, {
      path: '/article',
      name: 'article',
      meta: { title: "动态发布" },
      component: () => import('../views/index/article.vue'),
    }, {
      path: '/duty',
      name: 'duty',
      meta: { title: "排班管理" },
      component: () => import('../views/index/duty.vue'),
    }, {
      path: '/task',
      name: 'task',
      meta: { title: "任务管理" },
      component: () => import('../views/index/task.vue'),
    }]
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: "登录" },
    component: () => import('../views/login.vue'),

  },
]
// 路由配置
const router = new VueRouter({
  mode: 'history',//使用history路由模式，不设置这个url地址上会有"#"
  base: process.env.BASE_URL,//路由地址 （这个基本不用管）
  routes//引入路由列表
})

export default router//导出

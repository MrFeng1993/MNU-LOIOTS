import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from "vue-router";
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./utils/index.css";
Vue.use(ElementUI);
Vue.config.productionTip = false
import Api from "@/api";
Vue.prototype.$Api = Api;
// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  // if (!localStorage.getItem('userName') && to.path !== '/login') {
  if (false && to.path !== '/login') {
    next({ path: "/login" })
  } else {
    next()
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

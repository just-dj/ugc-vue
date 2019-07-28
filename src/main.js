// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// const ElementUI = require('element-ui')
import echarts from 'echarts'
import App from './App'
import VueRouter from 'vue-router'
//路由文件
import routes from './router/router.js'
import store from './vuex/store'
import Vuex from 'vuex'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex)

Vue.prototype.$echarts = echarts;

// 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
export const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});

/* eslint-disable no-new */

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  // el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
}).$mount('#app');


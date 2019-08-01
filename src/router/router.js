import home from '../components/home.vue'
import indexPage from '../components/indexPage.vue'


let routes = [
  {
    path: '/',
    // component: (resolve) => require(['../components/home.vue'], resolve),
    component: home,
    redirect: '/indexPage',
    name: '导航一',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      {
        path: '/indexPage',
        // component: (resolve) => require(['../components/indexPage.vue'], resolve),
        component: indexPage,
        meta: {keepAlive: true},
        name: '首页',
        hidden: true
      }
    ]
  },
];

export default routes;

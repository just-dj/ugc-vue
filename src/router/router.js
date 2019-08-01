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

    ]
  },
];

export default routes;

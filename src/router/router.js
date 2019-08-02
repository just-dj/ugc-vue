import home from '../components/home.vue'
import blogPage from '../components/blogPage.vue'
import bbsPage from '../components/bbsPage.vue'
import meetingPage from '../components/meetingPage.vue'
import managerIndex from '../components/managerIndex.vue'


let routes = [
  {
    path: '/',
    component: (resolve) => require(['../components/home.vue'], resolve),
    // component: home,
    redirect: '/blogPage',
    name: '导航',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      {
        path: '/blogPage',
        component: (resolve) => require(['../components/blogPage.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: true},
        name: '博客',
        hidden: true
      },
      {
        path: '/bbsPage',
        component: (resolve) => require(['../components/bbsPage.vue'], resolve),
        // component: bbsPage,
        meta: {keepAlive: true},
        name: '论坛',
        hidden: true
      },
      {
        path: '/meetingPage',
        component: (resolve) => require(['../components/meetingPage.vue'], resolve),
        // component: meetingPage,
        meta: {keepAlive: true},
        name: '会议纪要',
        hidden: true
      },
      {
        path: '/managerIndex',
        component: (resolve) => require(['../components/managerIndex.vue'], resolve),
        // component: managerIndex,
        meta: {keepAlive: true},
        name: '管理首页',
        hidden: true
      }
    ]
  },
];

export default routes;

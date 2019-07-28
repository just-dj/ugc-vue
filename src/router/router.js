import home from '../components/home.vue'
import indexPage from '../components/indexPage.vue'
import dataAnalysePage from '../components/dataAnalysePage.vue'
import companyJobManagerPage from '../components/companyJobManagerPage.vue'
import adminJobManagerPage from '../components/adminJobManagerPage.vue'
import jobPage from '../components/jobPage.vue'
import jobTypeManagerPage from '../components/jobTypeManagerPage.vue'
import messagePage from '../components/messagePage.vue'
import userManagerPage from '../components/userManagerPage.vue'
import personCenter from '../components/personCenter.vue'
import jobDetail from '../components/jobDetailPage.vue'
import appliedJobPage from '../components/appliedJobPage.vue'
import jobSignUpPage from '../components/jobSignUpPage.vue'
import appealInfoManagerPage from '../components/appealInfoManagerPage.vue'

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
      },
      {
        path: '/jobPage',
        // component: (resolve) => require(['../components/jobPage.vue'], resolve),
        component: jobPage,
        meta: {keepAlive: false},
        name: '兼职查询',
        hidden: true
      },
      {
        path: '/userManagerPage',
        // component: (resolve) => require(['../components/userManagerPage.vue'], resolve),
        component: userManagerPage,
        meta: {keepAlive: false},
        name: '用户管理',
        hidden: true
      },
      {
        path: '/jobTypeManagerPage',
        // component: (resolve) => require(['../components/jobTypeManagerPage.vue'], resolve),
        component: jobTypeManagerPage,
        meta: {keepAlive: false},
        name: '类别管理',
        hidden: true
      },
      {
        path: '/companyJobManagerPage',
        // component: (resolve) => require(['../components/companyJobManagerPage.vue'], resolve),
        component: companyJobManagerPage,
        meta: {keepAlive: false},
        name: '企业兼职管理',
        hidden: true
      },
      {
        path: '/adminJobManagerPage',
        // component: (resolve) => require(['../components/adminJobManagerPage.vue'], resolve),
        component: adminJobManagerPage,
        meta: {keepAlive: true},
        name: '兼职管理',
        hidden: true
      },
      {
        path: '/dataAnalysePage',
        // component: (resolve) => require(['../components/dataAnalysePage.vue'], resolve),
        component: dataAnalysePage,
        meta: {keepAlive: false},
        name: '数据分析',
        hidden: true
      },
      {
        path: '/messagePage',
        // component: (resolve) => require(['../components/messagePage.vue'], resolve),
        component: messagePage,
        meta: {keepAlive: false},
        name: '消息',
        hidden: true
      },
      {
        path: '/personCenter',
        // component: (resolve) => require(['../components/personCenter.vue'], resolve),
        component: personCenter,
        meta: {keepAlive: false},
        name: '个人中心',
        hidden: true
      },
      {
        path: '/jobDetail',
        // component: (resolve) => require(['../components/jobDetailPage.vue'], resolve),
        component: jobDetail,
        meta: {keepAlive: false},
        name: '兼职详情',
        hidden: true
      },
      {
        path: '/appliedJobPage',
        // component: (resolve) => require(['../components/jobDetailPage.vue'], resolve),
        component: appliedJobPage,
        meta: {keepAlive: false},
        name: '申请/收藏',
        hidden: true
      },
      {
        path: '/jobSignUpPage',
        // component: (resolve) => require(['../components/jobDetailPage.vue'], resolve),
        component: jobSignUpPage,
        meta: {keepAlive: false},
        name: '职位申请情况',
        hidden: true
      },
      {
        path: '/appealInfoManagerPage',
        // component: (resolve) => require(['../components/jobDetailPage.vue'], resolve),
        component: appealInfoManagerPage,
        meta: {keepAlive: false},
        name: '申诉处理',
        hidden: true
      }
    ]
  },
];

export default routes;

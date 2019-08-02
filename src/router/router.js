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
        meta: {keepAlive: false},
        name: '博客',
        hidden: true
      },
      {
        path: '/bbsPage',
        component: (resolve) => require(['../components/bbsPage.vue'], resolve),
        // component: bbsPage,
        meta: {keepAlive: false},
        name: '论坛',
        hidden: true
      },
      {
        path: '/meetingPage',
        component: (resolve) => require(['../components/meetingPage.vue'], resolve),
        // component: meetingPage,
        meta: {keepAlive: false},
        name: '会议纪要',
        hidden: true
      }
    ]
  },
  {
    path: '/managerIndex',
    component: (resolve) => require(['../components/managerIndex.vue'], resolve),
    // component: managerIndex,
    meta: {keepAlive: false},
    name: '管理首页',
    hidden: true,
    children: [
      {
        path: '/accountManager',
        component: (resolve) => require(['../components/accountManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '账号管理',
        hidden: true
      },
      {
        path: '/roleManager',
        component: (resolve) => require(['../components/roleManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '角色管理',
        hidden: true
      },
      {
        path: '/moduleManager',
        component: (resolve) => require(['../components/moduleManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '模块管理',
        hidden: true
      },
      {
        path: '/bbsManager',
        component: (resolve) => require(['../components/bbsManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '论坛管理',
        hidden: true
      },
      {
        path: '/blogManager',
        component: (resolve) => require(['../components/blogManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '博客管理',
        hidden: true
      },
      {
        path: '/articleManager',
        component: (resolve) => require(['../components/articleManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '文章管理',
        hidden: true
      },
      {
        path: '/announcementManager',
        component: (resolve) => require(['../components/announcementManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '登录公告',
        hidden: true
      },
      {
        path: '/reportManager',
        component: (resolve) => require(['../components/reportManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '举报处理',
        hidden: true
      },
      {
        path: '/userCount',
        component: (resolve) => require(['../components/userCount.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '用户统计',
        hidden: true
      },
      {
        path: '/blogCount',
        component: (resolve) => require(['../components/blogCount.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '博客统计',
        hidden: true
      },
      {
        path: '/articleCount',
        component: (resolve) => require(['../components/articleCount.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '发帖统计',
        hidden: true
      },
      {
        path: '/meetingCount',
        component: (resolve) => require(['../components/meetingCount.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '会议统计',
        hidden: true
      }

      ]
  }
]
;

export default routes;

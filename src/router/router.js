let routes = [
  {
    path: '/',
    component: (resolve) => require(['../components/home.vue'], resolve),
    // component: home,
    redirect: '/meetingPage',
    name: '导航',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      {
        path: '/blogPage',
        component: (resolve) => require(['../components/blog/blogPage.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '博客',
        hidden: true
      },
      {
        path: '/readBlogPage',
        component: (resolve) => require(['../components/blog/readBlogPage.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '查看博客',
        hidden: true
      },
      {
        path: '/editBlogPage',
        component: (resolve) => require(['../components/blog/editBlogPage.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: true},
        name: '编辑博客',
        hidden: true
      },
      {
        path: '/bbsPage',
        component: (resolve) => require(['../components/bbs/bbsPage.vue'], resolve),
        // component: bbsPage,
        meta: {keepAlive: false},
        name: '论坛',
        hidden: true
      },
      {
        path: '/readBBSPage',
        component: (resolve) => require(['../components/bbs/readBBSPage.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '查看论坛',
        hidden: true
      },
      {
        path: '/meetingPage',
        component: (resolve) => require(['../components/meeting/meetingPage.vue'], resolve),
        // component: meetingPage,
        meta: {keepAlive: false},
        name: '会议纪要',
        hidden: true
      },
      {
        path: '/editMeetingPage',
        component: (resolve) => require(['../components/meeting/editMeetingPage.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: true},
        name: '编辑会议纪要',
        hidden: true
      },
      {
        path: '/readMeetingPage',
        component: (resolve) => require(['../components/meeting/readMeetingPage.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '查看会议纪要',
        hidden: true
      },
      {
        path: '/personCenter',
        component: (resolve) => require(['../components/personCenter.vue'], resolve),
        // component: meetingPage,
        meta: {keepAlive: false},
        name: '个人中心',
        hidden: true
      }
    ]
  },
  {
    path: '/managerIndex',
    component: (resolve) => require(['../components/manager/managerIndex.vue'], resolve),
    // component: managerIndex,
    meta: {keepAlive: false},
    name: '管理首页',
    hidden: true,
    children: [
      {
        path: '/accountManager',
        component: (resolve) => require(['../components/manager/accountManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '账号管理',
        hidden: true
      },
      {
        path: '/roleManager',
        component: (resolve) => require(['../components/manager/roleManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '角色管理',
        hidden: true
      },
      {
        path: '/moduleManager',
        component: (resolve) => require(['../components/manager/moduleManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '模块管理',
        hidden: true
      },
      {
        path: '/bbsManager',
        component: (resolve) => require(['../components/manager/bbsManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '论坛管理',
        hidden: true
      },
      {
        path: '/blogManager',
        component: (resolve) => require(['../components/manager/blogManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '博客管理',
        hidden: true
      },
      {
        path: '/articleManager',
        component: (resolve) => require(['../components/manager/articleManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '文章管理',
        hidden: true
      },
      {
        path: '/announcementManager',
        component: (resolve) => require(['../components/manager/announcementManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '登录公告',
        hidden: true
      },
      {
        path: '/reportManager',
        component: (resolve) => require(['../components/manager/reportManager.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '举报处理',
        hidden: true
      },
      {
        path: '/userCount',
        component: (resolve) => require(['../components/manager/dataAnalysis/userCount.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '用户统计',
        hidden: true
      },
      {
        path: '/blogCount',
        component: (resolve) => require(['../components/manager/dataAnalysis/blogCount.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '博客统计',
        hidden: true
      },
      {
        path: '/articleCount',
        component: (resolve) => require(['../components/manager/dataAnalysis/articleCount.vue'], resolve),
        // component: blogPage,
        meta: {keepAlive: false},
        name: '发帖统计',
        hidden: true
      },
      {
        path: '/meetingCount',
        component: (resolve) => require(['../components/manager/dataAnalysis/meetingCount.vue'], resolve),
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

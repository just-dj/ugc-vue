webpackJsonp([22],{Mt1B:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("pFYg"),i=a.n(n),l=(a("P9l9"),a("MS2J")),o=(a("YtJ0"),{name:"managerIndex",data:function(){return{}},computed:{},methods:{isEmpty:function(e){switch(void 0===e?"undefined":i()(e)){case"undefined":return!0;case"string":if(0===e.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,"").length)return!0;break;case"boolean":if(!e)return!0;break;case"number":if(0===e||isNaN(e))return!0;break;case"object":if(null===e||0===e.length)return!0;for(var t in e)return!1;return!0}return!1},contains:function(e,t){return this.isEmpty(e)?(console.log("为空"),!1):-1!=e.indexOf(t)}},beforeCreate:function(){},created:function(){l.c(localStorage.getItem("token"))?console.log("还未登录 "):(console.log("已经登录 "),this.isLogin=!0,this.accountManager=this.contains(JSON.parse(localStorage.getItem("module")),"5d429edbbb9fe01c646d1fd7"),this.roleManager=this.contains(JSON.parse(localStorage.getItem("module")),"5d4450bc910a3fdc04c7b1b6"),this.moduleManager=this.contains(JSON.parse(localStorage.getItem("module")),"5d44512d910a3fdc04c7b21d"),this.bbsManager=this.contains(JSON.parse(localStorage.getItem("module")),"5d445124910a3fdc04c7b216"),this.blogManager=this.contains(JSON.parse(localStorage.getItem("module")),"5d44511b910a3fdc04c7b209"),this.articleManager=this.contains(JSON.parse(localStorage.getItem("module")),"5d445111910a3fdc04c7b1ff"),this.announcementManager=this.contains(JSON.parse(localStorage.getItem("module")),"5d445108910a3fdc04c7b1f7"),this.reportManager=this.contains(JSON.parse(localStorage.getItem("module")),"5d445100910a3fdc04c7b1f0"),this.userCount=this.contains(JSON.parse(localStorage.getItem("module")),"5d4450f7910a3fdc04c7b1e8"),this.blogCount=this.contains(JSON.parse(localStorage.getItem("module")),"5d4450ec910a3fdc04c7b1e0"),this.articleCount=this.contains(JSON.parse(localStorage.getItem("module")),"5d4450e1910a3fdc04c7b1d1"),this.meetingCount=this.contains(JSON.parse(localStorage.getItem("module")),"5d4450d4910a3fdc04c7b1c7"),this.$store.commit("setHeadImg",{name:"stark",user:JSON.parse(localStorage.getItem("user"))}))},mounted:function(){}}),c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticStyle:{width:"100%",height:"100%"}},[a("div",{staticStyle:{display:"flex","justify-content":"flex-start","align-items":"center",height:"100%",width:"100%"}},[a("div",{staticClass:"left",staticStyle:{position:"fixed",top:"0",left:"0",width:"180px",height:"100%","background-color":"rgb(84,92,100)"}},[a("el-menu",{staticClass:"el-menu-demo",staticStyle:{width:"180px"},attrs:{"default-active":this.$route.path,mode:"vertical",router:"","background-color":"#545c64","text-color":"#fff","active-text-color":"#409EFF"}},[a("el-menu-item",{key:"blogPage",attrs:{index:"/blogPage"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-arrow-left"}),e._v(" "),a("span",{staticStyle:{color:"#ebb563"}},[e._v("返回博客")])])],2),e._v(" "),e.accountManager?a("el-menu-item",{key:"5d429edbbb9fe01c646d1fd7",attrs:{index:"/accountManager"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-document"}),e._v(" "),a("span",[e._v("账号管理")])])],2):e._e(),e._v(" "),e.roleManager?a("el-menu-item",{key:"5d4450bc910a3fdc04c7b1b6",attrs:{index:"/roleManager"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-document"}),e._v(" "),a("span",[e._v("角色管理")])])],2):e._e(),e._v(" "),e.moduleManager?a("el-menu-item",{key:"5d44512d910a3fdc04c7b21d",attrs:{index:"/moduleManager"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-document"}),e._v(" "),a("span",[e._v("模块管理")])])],2):e._e(),e._v(" "),e.bbsManager?a("el-menu-item",{key:"5d445124910a3fdc04c7b216",attrs:{index:"/bbsManager"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-document"}),e._v(" "),a("span",[e._v("论坛管理")])])],2):e._e(),e._v(" "),e.blogManager?a("el-menu-item",{key:"5d44511b910a3fdc04c7b209",attrs:{index:"/blogManager"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-document"}),e._v(" "),a("span",[e._v("博客管理")])])],2):e._e(),e._v(" "),e.articleManager?a("el-menu-item",{key:"5d445111910a3fdc04c7b1ff",attrs:{index:"/articleManager"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-document"}),e._v(" "),a("span",[e._v("文章管理")])])],2):e._e(),e._v(" "),e.announcementManager?a("el-menu-item",{key:"5d445108910a3fdc04c7b1f7",attrs:{index:"/announcementManager"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-bell"}),e._v(" "),a("span",[e._v("登录公告")])])],2):e._e(),e._v(" "),e.reportManager?a("el-menu-item",{key:"5d445100910a3fdc04c7b1f0",attrs:{index:"/reportManager"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-bell"}),e._v(" "),a("span",[e._v("举报处理")])])],2):e._e(),e._v(" "),a("el-submenu",{attrs:{index:"/"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-location"}),e._v(" "),a("span",[e._v("数据统计")])]),e._v(" "),a("el-menu-item-group",[e.userCount?a("el-menu-item",{key:"5d4450f7910a3fdc04c7b1e8",staticStyle:{"min-width":"180px"},attrs:{index:"/userCount"}},[e._v("用户统计\n            ")]):e._e(),e._v(" "),e.blogCount?a("el-menu-item",{key:"5d4450ec910a3fdc04c7b1e0",staticStyle:{"min-width":"180px"},attrs:{index:"/blogCount"}},[e._v("博客统计\n            ")]):e._e(),e._v(" "),e.articleCount?a("el-menu-item",{key:"5d4450e1910a3fdc04c7b1d1",staticStyle:{"min-width":"180px"},attrs:{index:"/articleCount"}},[e._v("发帖统计\n            ")]):e._e(),e._v(" "),e.meetingCount?a("el-menu-item",{key:"5d4450d4910a3fdc04c7b1c7",staticStyle:{"min-width":"180px"},attrs:{index:"/meetingCount"}},[e._v("会议统计\n            ")]):e._e()],1)],2)],1)],1),e._v(" "),a("div",{staticStyle:{"max-height":"100%",height:"100%",overflow:"hidden",width:"calc(100% - 180px)","margin-left":"180px"}},[a("transition",{attrs:{name:"el-zoom-in-top"}},[a("router-view",{staticStyle:{height:"100%"}})],1)],1)])])},staticRenderFns:[]};var s=a("VU/8")(o,c,!1,function(e){a("PxRl")},"data-v-02d1886a",null);t.default=s.exports},PxRl:function(e,t){}});
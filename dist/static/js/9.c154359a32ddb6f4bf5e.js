webpackJsonp([9],{"2pB2":function(t,e){},LbMB:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("pFYg"),a=i.n(s),r=i("mvHQ"),n=i.n(r),o=i("+qPk"),c=i("MS2J"),l=i("P9l9"),m={name:"readBlogPage",components:{VueEditor:o.a},data:function(){return{isShow:!1,id:"",article:{},type:"preview",isLogin:!1,author:"",isLiked:!1,userComment:"",isAuthorLiked:!1}},computed:{user:{get:function(){return this.$store.state.user},set:function(){}}},methods:{likeUser:function(){var t=this;Object(l.y)(this.article.authorId).then(function(e){200===e.code?(Object(c.c)(t.user.likeUser)&&(t.user.likeUserId=[]),t.isAuthorLiked=!0,t.user.likeUserId.push(t.article.authorId),localStorage.setItem("user",n()(e.data)),t.$store.commit("setHeadImg",{name:"stark",user:e.data})):2===e.code?(t.$store.commit("signInDialogVisibleTrue"),t.$router.push({path:"/meetingPage",query:{isError:!0}})):t.$message.error(e.msg)})},likeComment:function(t){var e=this;Object(c.c)(t.likeUserId)&&(t.likeUserId=[]),Object(c.b)(t.likeUserId,this.user.id)?this.$message.info("已经点过赞了"):(t.likeUserId.push(this.user.id),Object(l.b)({id:this.article.id,commentList:this.article.comment}).then(function(t){200===t.code||(2===t.code?(e.$store.commit("signInDialogVisibleTrue"),e.$router.push({path:"/meetingPage",query:{isError:!0}})):e.$message.error(t.msg))}))},sendComment:function(){var t=this,e={comment:this.userComment,commentTime:Date.now(),commentUserId:this.user.id,commentUserName:this.user.name,commentUserHeadURL:this.user.headImg,likeCount:0,child:[]},i=JSON.parse(n()(this.article.comment));Object(c.c)(i)&&(i=[]),i.unshift(e),c.d(i,"commentTime","desc"),Object(l.b)({id:this.article.id,commentList:i}).then(function(e){200===e.code?(t.$message.success("评论成功"),t.article.comment=i,t.userComment=""):2===e.code?(t.$store.commit("signInDialogVisibleTrue"),t.$router.push({path:"/meetingPage",query:{isError:!0}})):t.$message.error(e.msg)})},back:function(){this.$router.go(-1)},isEmpty:function(t){switch(void 0===t?"undefined":a()(t)){case"undefined":return!0;case"string":if(0===t.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,"").length)return!0;break;case"boolean":if(!t)return!0;break;case"number":if(0===t||isNaN(t))return!0;break;case"object":if(null===t||0===t.length)return!0;for(var e in t)return!1;return!0}return!1},like:function(){var t=this;Object(l.e)(this.article.id).then(function(e){200===e.code?t.article=e.data:2===e.code?(t.$store.commit("signInDialogVisibleTrue"),t.$router.push({path:"/meetingPage",query:{isError:!0}})):t.$message.error(e.msg)})},contains:function(t,e){return!this.isEmpty(t)&&-1!=t.indexOf(e)},formatTime:function(t){var e=new Date;e.setTime(t);var i=e.getMonth()+1;i<10&&(i="0"+i);var s=e.getDate();s<10&&(s="0"+s);var a=e.getHours();a<10&&(a="0"+a);var r=e.getMinutes();r<10&&(r="0"+r);var n=e.getSeconds();return n<10&&(n="0"+n),e.getFullYear()+"-"+i+"-"+s+"  "+a+":"+r+":"+n}},created:function(){c.c(localStorage.getItem("token"))?console.log("还未登录 "):(console.log("已经登录 "),this.isLogin=!0,this.$store.commit("setHeadImg",{name:"stark",user:JSON.parse(localStorage.getItem("user"))}))},mounted:function(){var t=this;this.article=JSON.parse(this.$route.query.article),c.c(this.article.id)?this.type="preview":(this.type="read",Object(l.s)(this.article.id).then(function(e){200===e.code?(console.log("正常"),t.article=e.data,c.d(t.article.comment,"commentTime","desc"),t.isAuthorLiked=t.article.authorId===t.user.id||Object(c.b)(t.user.likeUserId,t.article.authorId)):2===e.code?(t.$store.commit("signInDialogVisibleTrue"),t.$router.push({path:"/meetingPage",query:{isError:!0}})):t.$message.error(e.msg)}),Object(l.g)(this.article.id).then(),Object(l.w)(this.article.authorId).then(function(e){200===e.code?c.c(e.data)||(t.author=e.data):2===e.code?(t.$store.commit("signInDialogVisibleTrue"),t.$router.push({path:"/meetingPage",query:{isError:!0}})):t.$message.error(e.msg)}),this.isShow=!("0"===this.article.kind&&!Object(c.b)(this.user.roleId,"5d429a16bb9fe01c646d1fd5")))}},h={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-main",{staticStyle:{"background-color":"#fff"}},[i("div",{staticStyle:{width:"100%",display:"flex","justify-content":"center","align-items":"flex-start","margin-bottom":"100px"}},[i("el-button",{staticStyle:{position:"fixed",top:"81px",left:"32px"},attrs:{plain:"",icon:"el-icon-back"},on:{click:t.back}},[t._v("\n      返回\n    ")]),t._v(" "),i("div",{staticStyle:{width:"65%",display:"flex","flex-direction":"column","justify-content":"flex-start","align-items":"center"}},[i("div",{staticClass:"title"},[t._v("\n        "+t._s(t.article.title)+"\n      ")]),t._v(" "),t.isShow?i("div",{staticClass:"author-info"},["preview"===t.type?i("div",{staticStyle:{padding:"0px 16px",width:"100%",height:"100%",display:"flex","justify-content":"flex-start","align-items":"center"}},[i("img",{directives:[{name:"show",rawName:"v-show",value:t.isEmpty(t.user.headImg),expression:"isEmpty(user.headImg)"}],staticStyle:{width:"50px",height:"50px"},attrs:{src:"https://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/default_header_img.png"}}),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:!t.isEmpty(t.user.headImg),expression:"!isEmpty(user.headImg)"}],staticStyle:{width:"50px",height:"50px","border-radius":"50%"},attrs:{src:t.user.headImg}}),t._v(" "),i("div",{staticClass:"author-info-right",staticStyle:{height:"100%",width:"60%"}},[i("div",{staticClass:"authorInfo-top"},[i("div",{staticStyle:{color:"black","margin-right":"10px","font-size":"17px"}},[t._v("\n                "+t._s(this.user.name)+"\n              ")]),t._v(" "),i("div",{staticClass:"button-collect"},[i("span",{staticClass:"el-icon-plus",staticStyle:{color:"#fff",width:"100%",height:"100%",display:"flex","justify-content":"center","align-items":"center"}},[t._v("\n                关注\n              ")])])]),t._v(" "),i("div",{staticClass:"authorInfo-bottom"},[i("span",{staticClass:"authorInfo-bottom-info"},[t._v("等级")]),t._v(" "),i("span",{staticClass:"authorInfo-bottom-info"},[t._v("2019.07.15 15:78")]),t._v(" "),i("span",{staticClass:"authorInfo-bottom-info"},[t._v("字数 1852")]),t._v(" "),i("span",{staticClass:"authorInfo-bottom-info"},[t._v("阅读 785")]),t._v(" "),i("span",{staticClass:"authorInfo-bottom-info"},[t._v("评论 8")]),t._v(" "),i("span",{staticClass:"authorInfo-bottom-info"},[t._v("喜欢 89")])])])]):i("div",{staticStyle:{padding:"0px 16px",width:"100%",height:"100%",display:"flex","justify-content":"flex-start","align-items":"center"}},[i("img",{directives:[{name:"show",rawName:"v-show",value:t.isEmpty(t.author.headImg),expression:"isEmpty(author.headImg)"}],staticStyle:{width:"50px",height:"50px"},attrs:{src:"https://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/default_header_img.png"}}),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:!t.isEmpty(t.author.headImg),expression:"!isEmpty(author.headImg)"}],staticStyle:{width:"50px",height:"50px","border-radius":"50%"},attrs:{src:t.author.headImg}}),t._v(" "),i("div",{staticClass:"author-info-right",staticStyle:{height:"100%",width:"60%"}},[i("div",{staticClass:"authorInfo-top"},[i("div",{staticStyle:{color:"black","margin-right":"10px","font-size":"17px"}},[t._v("\n                "+t._s(this.author.name)+"\n              ")]),t._v(" "),t.isAuthorLiked?i("div",{staticClass:"button-collect"},[i("span",{staticStyle:{color:"#fff",width:"100%",height:"100%",display:"flex","justify-content":"center","align-items":"center"}},[t._v("\n                     已关注\n                  ")])]):i("div",{staticClass:"button-collect",on:{click:t.likeUser}},[i("span",{staticClass:"el-icon-plus",staticStyle:{color:"#fff",width:"100%",height:"100%",display:"flex","justify-content":"center","align-items":"center"}},[t._v("\n                    关注\n                  ")])])]),t._v(" "),i("div",{staticClass:"authorInfo-bottom"},[i("span",{staticClass:"authorInfo-bottom-info"},[t._v("等级")]),t._v(" "),i("span",{staticClass:"authorInfo-bottom-info"},[t._v(t._s(t.formatTime(t.article.presentTime)))]),t._v(" "),i("span",{staticClass:"authorInfo-bottom-info"},[t._v("字数 "+t._s(t.article.length))]),t._v(" "),i("span",{staticClass:"authorInfo-bottom-info"},[t._v("阅读 "+t._s(t.article.readCount))]),t._v(" "),i("span",{staticClass:"authorInfo-bottom-info"},[t._v("评论 "+t._s(t.isEmpty(t.article.comment)?0:t.article.comment.length))]),t._v(" "),i("span",{staticClass:"authorInfo-bottom-info"},[t._v("喜欢 "+t._s(t.article.likeCount))])])])])]):t._e(),t._v(" "),i("div",{staticClass:"content",staticStyle:{width:"100%",height:"100%","margin-bottom":"10px"}},[i("vue-editor",{model:{value:t.article.content,callback:function(e){t.$set(t.article,"content",e)},expression:"article.content"}},[t._v("\n          "+t._s(t.article.content)+"\n        ")])],1),t._v(" "),"read"===t.type?i("div",{staticClass:"author-detailInfo",staticStyle:{width:"100%",height:"150px"}}):t._e(),t._v(" "),"read"===t.type?i("div",{staticClass:"article-like",staticStyle:{width:"100%",height:"54px",margin:"10px 0"}},[i("div",{staticClass:"article-like-pane"},[t.contains(t.article.likeUser,t.user.id)?i("img",{staticStyle:{width:"30px",height:"30px","margin-right":"15px"},attrs:{src:"/static/img/icon/liked.png"},on:{click:t.like}}):i("img",{staticStyle:{width:"30px",height:"30px","margin-right":"15px"},attrs:{src:"/static/img/icon/like.png"},on:{click:t.like}}),t._v("\n          喜欢  |  "+t._s(t.article.likeCount)+"\n        ")])]):t._e(),t._v(" "),"read"===t.type?i("div",{staticClass:"comment"},[i("div",{staticStyle:{width:"100%",height:"145px"}},[i("el-input",{attrs:{type:"textarea",rows:3,placeholder:"输入你的评论"},model:{value:t.userComment,callback:function(e){t.userComment=e},expression:"userComment"}}),t._v(" "),i("div",{staticStyle:{"margin-top":"20px",width:"100%",display:"flex","justify-content":"flex-end","align-items":"center"}},[i("el-button",{staticStyle:{"margin-right":"20px",color:"#aaa"},attrs:{type:"text"},on:{click:function(e){t.userComment=""}}},[t._v("取消")]),t._v(" "),i("el-button",{staticStyle:{"border-radius":"20px"},attrs:{type:"success"},on:{click:t.sendComment}},[t._v("发送")])],1)],1),t._v(" "),i("div",{staticClass:"comment-title"},[t._v(" "+t._s(t.article.comment.length)+"条评论 ")]),t._v(" "),t._l(t.article.comment,function(e,s){return i("div",{staticClass:"comment-item",staticStyle:{width:"100%","border-top":"1px solid #eee"}},[i("div",{staticClass:"author-info",staticStyle:{"margin-bottom":"15px"}},[i("div",{staticStyle:{padding:"0px 16px",width:"100%",height:"100%",display:"flex","justify-content":"flex-start","align-items":"center"}},["0"===e.kind?i("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:"https://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/default_header_img.png"}}):t.isEmpty(e.commentUserHeadURL)?i("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:"https://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/default_header_img.png"}}):i("img",{staticStyle:{width:"50px",height:"50px","border-radius":"50%"},attrs:{src:e.commentUserHeadURL}}),t._v(" "),i("div",{staticClass:"author-info-right",staticStyle:{height:"100%",width:"60%"}},[i("div",{staticClass:"authorInfo-top"},[t.isShow?i("div",{staticStyle:{color:"black","margin-right":"10px","font-size":"17px"}},[t._v("\n                    "+t._s(e.commentUserName)+"\n                  ")]):i("div",{staticStyle:{color:"black","margin-right":"10px","font-size":"17px"}},[t._v("\n                    ***\n                  ")])]),t._v(" "),i("div",{staticClass:"authorInfo-bottom"},[i("span",{staticClass:"authorInfo-bottom-info"},[t._v(t._s(t.article.comment.length-s)+" 楼")]),t._v(" "),i("span",{staticClass:"authorInfo-bottom-info"},[t._v(t._s(t.formatTime(e.commentTime)))])])])])]),t._v(" "),i("div",{staticClass:"comment-content"},[i("span",{staticStyle:{"text-align":"left"}},[t._v(t._s(e.comment))])]),t._v(" "),i("div",{staticClass:"comment-operating"},[i("img",{staticClass:"special-hover",staticStyle:{width:"16px",height:"16px","margin-right":"10px"},attrs:{src:"/static/img/icon/zan.png"},on:{click:function(i){return t.likeComment(e)}}}),t._v("  "+t._s(t.isEmpty(e.likeUserId)?0:e.likeUserId.length)+"赞\n            "),i("img",{staticClass:"special-hover",staticStyle:{width:"20px",height:"20px","margin-left":"20px","margin-right":"10px"},attrs:{src:"/static/img/icon/message.png"}}),t._v("  回复\n          ")])])})],2):t._e()])],1)])},staticRenderFns:[]};var d=i("VU/8")(m,h,!1,function(t){i("2pB2")},"data-v-4753926a",null);e.default=d.exports}});
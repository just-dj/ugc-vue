webpackJsonp([21],{VeiJ:function(t,e){},WiAY:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("pFYg"),n=i.n(a),o=i("mvHQ"),s=i.n(o),l=i("P9l9"),r=i("MS2J"),c={name:"blogPage",data:function(){return{topArticle:[],ugc_blog_options:[],pageNum:0,pageSize:8,isLastPage:!1,selectNowKind:"0",labelPosition:"new",searchInput:"",articleList:[],fullScreenLoading:!1,articleLoading:!1,swiperData:[],forbidScroll:!1,top:0}},computed:{},methods:{labelChange:function(){this.openFullScreen(),this.getPageData()},toReadPage:function(t){this.$router.push({path:"/readBlogPage",query:{article:s()(t)}})},orderScroll:function(){console.log("滚动")},scroll:function(){var t=this,e=document.querySelector(".main-right"),i=e.offsetHeight;e.onscroll=function(){var a=e.scrollTop;if(t.forbidScroll)t.top=a;else{if(a>t.top){console.log("下");var n=e.scrollHeight;if(i+a-n>=-100){if(t.forbidScroll=!0,setTimeout(function(){t.forbidScroll=!1},1500),t.isLastPage)return void t.$message.info("没有更多！");t.articleLoading=!0,t.pageNum+=1,t.getPageData()}}else console.log("上");t.top=a}}},getData:function(t){this.selectNowKind!==t&&(this.selectNowKind=t,this.articleList=[],this.pageNum=0,this.openFullScreen(),this.getPageData())},getDuring:function(t){var e=Date.now()-t;return e<6e4?"刚刚":e<36e5?parseInt(e/6e4)+"分钟前":e<864e5?parseInt(e/36e5)+"小时前":parseInt(e/864e5)+"天前"},getPageData:function(){var t=this,e={pageNum:this.pageNum,pageSize:this.pageSize,kind:this.selectNowKind,label:this.labelPosition,searchInput:this.searchInput};Object(l.h)(e).then(function(e){t.articleLoading=!1,200===e.code?r.c(e.data)||(t.isLastPage=e.data.last,e.data.content.forEach(function(e){t.articleList.push(e)})):2===e.code?(t.$store.commit("signInDialogVisibleTrue"),t.$router.push({path:"/meetingPage",query:{isError:!0}})):t.$message.error(e.msg)})},openFullScreen:function(){var t=this;this.$store.commit("openFullScreenLoading"),setTimeout(function(){t.$store.commit("closeFullScreenLoading")},200+150*Math.random())},isEmpty:function(t){switch(void 0===t?"undefined":n()(t)){case"undefined":return!0;case"string":if(0===t.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,"").length)return!0;break;case"boolean":if(!t)return!0;break;case"number":if(0===t||isNaN(t))return!0;break;case"object":if(null===t||0===t.length)return!0;for(var e in t)return!1;return!0}return!1},contains:function(t,e){return this.isEmpty(t)?(console.log("为空"),!1):-1!=t.indexOf(e)}},mounted:function(){var t=this;this.openFullScreen(),this.scroll(),Object(l.n)("ugc_blog_options").then(function(e){200===e.code?(t.ugc_blog_options=e.data,t.selectNowKind=t.ugc_blog_options[0].value,t.getPageData()):console.error("博客类型下拉列表获取失败")}),Object(l.v)("").then(function(e){200===e.code?r.c(e.data)||(t.topArticle=e.data):2===e.code?(t.$store.commit("signInDialogVisibleTrue"),t.$router.push({path:"/meetingPage",query:{isError:!0}})):t.$message.error(e.msg)})}},g={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-container",{staticStyle:{width:"100%",display:"flex","justify-content":"space-between"}},[i("el-aside",{staticClass:"main-left",staticStyle:{width:"21%",margin:"0"}},[i("div",{staticClass:"left-menu",staticStyle:{position:"fixed",left:"140px",top:"81px","max-height":"770px",height:"593px"}},[i("el-scrollbar",t._l(t.ugc_blog_options,function(e,a){return i("el-button",{staticClass:"left-menu-item",on:{click:function(i){return t.getData(e.value)}}},[t._v("\n          "+t._s(e.label)+"\n        ")])}),1)],1)]),t._v(" "),i("el-main",{staticClass:"main-right",staticStyle:{height:"auto"}},[i("div",{staticClass:"top-article"},[i("el-carousel",{attrs:{interval:3e3,type:"card",height:"200px"}},t._l(t.topArticle,function(e,a){return i("el-carousel-item",{key:a},[i("div",{staticClass:"infoText",on:{click:function(i){return t.toReadPage(e)}}},[i("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.cover}})])])}),1)],1),t._v(" "),i("div",{staticClass:"list-article"},[i("div",{staticClass:"list-article-operate"},[i("el-radio-group",{attrs:{size:"medium"},on:{change:t.labelChange},model:{value:t.labelPosition,callback:function(e){t.labelPosition=e},expression:"labelPosition"}},[i("el-radio-button",{attrs:{label:"new"}},[t._v("最新发表")]),t._v(" "),i("el-radio-button",{attrs:{label:"hot"}},[t._v("最近热门")])],1),t._v(" "),i("el-input",{staticStyle:{width:"218px"},attrs:{placeholder:"请输入关键字"},on:{change:t.getPageData},model:{value:t.searchInput,callback:function(e){t.searchInput=e},expression:"searchInput"}})],1),t._v(" "),t._l(t.articleList,function(e,a){return i("div",{staticClass:"list-item"},[i("div",{staticClass:"list-item-left"},[i("div",{staticClass:"item-left-title",on:{click:function(i){return t.toReadPage(e)}}},[i("span",{staticStyle:{"font-size":"18px","font-weight":"bold",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[t._v(t._s(e.title))])]),t._v(" "),i("div",{staticClass:"item-left-introduce"},[i("span",{staticStyle:{"font-size":"16px",color:"#cccccc"}},[t._v(t._s(e.subTitle))])]),t._v(" "),i("div",{staticClass:"item-left-other"},["0"===!e.kind?i("span",{staticStyle:{"text-align":"right",width:"60px","margin-right":"70px","font-weight":"bold"}},[t._v(t._s(e.authorName))]):i("span",{staticStyle:{"text-align":"right",width:"60px","margin-right":"70px","font-weight":"bold"}},[t._v("**")]),t._v(" "),i("span",{staticStyle:{"text-align":"right",width:"60px","margin-right":"70px"}},[t._v(t._s(e.likeCount)+"点赞")]),t._v(" "),i("span",{staticStyle:{"text-align":"right",width:"70px","margin-right":"70px"}},[t._v(t._s(e.readCount)+"阅读")]),t._v(" "),i("span",{staticStyle:{"text-align":"right",width:"100px","margin-right":"70px"}},[t._v(t._s(t.getDuring(e.presentTime)))])])]),t._v(" "),i("img",{staticStyle:{width:"219px",height:"100%"},attrs:{src:e.cover}})])}),t._v(" "),i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.articleLoading,expression:"articleLoading"}],staticClass:"loading",staticStyle:{width:"5%",height:"30px",position:"fixed",right:"47.5%",bottom:"40px"},attrs:{"element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0)","element-loading-text":"拼命加载中"}})],2)])],1)},staticRenderFns:[]};var u=i("VU/8")(c,g,!1,function(t){i("VeiJ")},"data-v-06dcb100",null);e.default=u.exports}});
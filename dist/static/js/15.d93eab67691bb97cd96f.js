webpackJsonp([15],{KkOR:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("pFYg"),a=i.n(n),s=i("P9l9"),o=(i("MS2J"),{name:"bbsPage",data:function(){return{ugc_bbs_options:[],articleLoading:!1,pageNum:1,pageSize:20,articleList:[{id:"21312",articleId:"",title:"程序员养发秘籍XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX123514726",subTitle:"多吃饭，多运动，然而没有什么用",authorId:"",authorName:"强仔",likeCount:852,readCount:8858,presentTime:"",url:"https://c2liantong.oss-cn-beijing.aliyuncs.com/12797375-239fdb759f575719.png"},{id:"21312",articleId:"",title:"程序员养发秘籍",subTitle:"多吃饭，多运动，然而没有什么用",authorId:"",authorName:"强强",likeCount:852,readCount:8858,presentTime:"",url:"https://c2liantong.oss-cn-beijing.aliyuncs.com/18652432-61146d3b3189d83b.jpg"},{id:"21312",articleId:"",title:"程序员养发秘籍",subTitle:"多吃饭，多运动，然而没有什么用",authorId:"",authorName:"强东",likeCount:852,readCount:8858,presentTime:"",url:"https://c2liantong.oss-cn-beijing.aliyuncs.com/330475-160H1163G490.jpg"},{id:"21312",articleId:"",title:"程序员养发秘籍",subTitle:"多吃饭，多运动，然而没有什么用",authorId:"",authorName:"强仔",likeCount:852,readCount:8858,presentTime:"",url:"http://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/background.jpg"},{id:"21312",articleId:"",title:"程序员养发秘籍",subTitle:"多吃饭，多运动，然而没有什么用",authorId:"",authorName:"强仔",likeCount:852,readCount:8858,presentTime:"",url:"https://c2liantong.oss-cn-beijing.aliyuncs.com/12797375-239fdb759f575719.png"}],selectNowKind:"dsj",labelPosition:"new",searchInput:"",swiperData:[{headImg:"https://justdj-ugc.oss-cn-hangzhou.aliyuncs.com/10.jpg",nickname:"强仔"},{headImg:"https://justdj-ugc.oss-cn-hangzhou.aliyuncs.com/3.jpg",nickname:"强子"},{headImg:"\nhttps://justdj-ugc.oss-cn-hangzhou.aliyuncs.com/16.jpg",nickname:"强强"}]}},computed:{},methods:{toReadPage:function(t){this.$router.push({path:"/readBBSPage",query:{id:t}})},labelChange:function(){this.openFullScreen()},orderScroll:function(){console.log("滚动")},scroll:function(){var t=this,e=document.querySelector(".main-right"),i=e.offsetHeight;e.onscroll=function(){var n=e.scrollTop,a=e.scrollHeight;if(console.log("相减 "+(i+n-a)),i+n-a>=-100){if(!0===t.articleLoading)return;t.articleLoading=!0,t.pageNum+=1;t.pageNum,t.pageSize,t.selectNowKind,t.labelPosition;setTimeout(function(){t.articleLoading=!1;for(var e=0;e<5;e++)t.articleList.push({id:"21312",articleId:"",title:"程序员养发秘籍",subTitle:"多吃饭，多运动，然而没有什么用",authorId:"",authorName:"强仔",likeCount:852,readCount:8858,presentTime:"",url:"https://c2liantong.oss-cn-beijing.aliyuncs.com/12797375-239fdb759f575719.png"})},1e3+150*Math.random())}}},getData:function(t){this.selectNowKind!==t&&(this.selectNowKind=t,this.labelPosition="new",this.searchInput,this.openFullScreen(),this.$message.success(this.selectNowKind+"   "+this.labelPosition+"   "+this.searchInput))},openFullScreen:function(){var t=this;this.$store.commit("openFullScreenLoading"),setTimeout(function(){t.$store.commit("closeFullScreenLoading")},200+150*Math.random())},isEmpty:function(t){switch(void 0===t?"undefined":a()(t)){case"undefined":return!0;case"string":if(0===t.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,"").length)return!0;break;case"boolean":if(!t)return!0;break;case"number":if(0===t||isNaN(t))return!0;break;case"object":if(null===t||0===t.length)return!0;for(var e in t)return!1;return!0}return!1},contains:function(t,e){return this.isEmpty(t)?(console.log("为空"),!1):-1!=t.indexOf(e)}},created:function(){},mounted:function(){var t=this;this.openFullScreen(),this.scroll(),Object(s.m)("ugc_bbs_options").then(function(e){200===e.code?t.ugc_bbs_options=e.data:console.error("论坛类型下拉列表获取失败")})}}),l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-container",{staticStyle:{width:"100%",display:"flex","justify-content":"space-between"}},[i("el-aside",{staticClass:"main-left",staticStyle:{width:"21%",margin:"0"}},[i("div",{staticClass:"left-menu",staticStyle:{position:"fixed",left:"140px",top:"81px","max-height":"770px",height:"593px"}},[i("el-scrollbar",t._l(t.ugc_bbs_options,function(e,n){return i("el-button",{staticClass:"left-menu-item",on:{click:function(i){return t.getData(e.value)}}},[t._v(t._s(e.label))])}),1)],1)]),t._v(" "),i("el-main",{staticClass:"main-right",staticStyle:{height:"auto"}},[i("div",{staticClass:"top-article"},[i("el-carousel",{attrs:{interval:2e3,type:"card",height:"200px"}},t._l(t.swiperData,function(t,e){return i("el-carousel-item",{key:e},[i("div",{staticClass:"infoText"},[i("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.headImg}})])])}),1)],1),t._v(" "),i("div",{staticClass:"list-article"},[i("div",{staticClass:"list-article-operate"},[i("el-radio-group",{attrs:{size:"medium"},on:{change:t.labelChange},model:{value:t.labelPosition,callback:function(e){t.labelPosition=e},expression:"labelPosition"}},[i("el-radio-button",{attrs:{label:"new"}},[t._v("最新发表")]),t._v(" "),i("el-radio-button",{attrs:{label:"hot"}},[t._v("最近热门")])],1),t._v(" "),i("el-input",{staticStyle:{width:"218px"},attrs:{placeholder:"请输入关键字"},model:{value:t.searchInput,callback:function(e){t.searchInput=e},expression:"searchInput"}})],1),t._v(" "),i("div",{staticClass:"list-item-title"},[i("div",{staticClass:"title center",staticStyle:{"font-size":"18px","font-weight":"bold"}},[t._v("\n          标题\n        ")]),t._v(" "),i("div",{staticClass:"author center",staticStyle:{"font-size":"18px","font-weight":"bold"}},[t._v("\n          作者\n        ")]),t._v(" "),i("div",{staticClass:"readCount center",staticStyle:{"font-size":"18px","font-weight":"bold"}},[t._v("\n          点击量\n        ")]),t._v(" "),i("div",{staticClass:"presentTime center",staticStyle:{"font-size":"18px","font-weight":"bold"}},[t._v("\n          发表时间\n        ")])]),t._v(" "),t._l(t.articleList,function(e,n){return i("div",{staticClass:"list-item"},[i("div",{staticClass:"title ",on:{click:function(i){return t.toReadPage(e.id)}}},[t._v("\n          "+t._s(e.title)+"\n        ")]),t._v(" "),i("div",{staticClass:"author center"},[t._v("\n          "+t._s(e.authorName)+"\n        ")]),t._v(" "),i("div",{staticClass:"readCount center"},[t._v("\n          "+t._s(e.readCount)+" 点击\n        ")]),t._v(" "),i("div",{staticClass:"presentTime center"},[t._v("\n          发表时间\n        ")])])}),t._v(" "),i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.articleLoading,expression:"articleLoading"}],staticClass:"loading",staticStyle:{width:"100%",height:"300px",position:"fixed",right:"0",bottom:"-50px"},attrs:{"element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0)","element-loading-text":"拼命加载中"}})],2)])],1)},staticRenderFns:[]};var c=i("VU/8")(o,l,!1,function(t){i("M5Cx")},"data-v-23de2fe9",null);e.default=c.exports},M5Cx:function(t,e){}});
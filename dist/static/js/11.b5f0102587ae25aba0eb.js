webpackJsonp([11],{LKPi:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"ElTag",props:{text:String,closable:Boolean,type:String,hit:Boolean,disableTransitions:Boolean,color:String,size:String,effect:{type:String,default:"light",validator:function(e){return-1!==["dark","light","plain"].indexOf(e)}}},methods:{handleClose:function(e){e.stopPropagation(),this.$emit("close",e)},handleClick:function(e){this.$emit("click",e)}},computed:{tagSize:function(){return this.size||(this.$ELEMENT||{}).size}},render:function(e){var t=this.type,a=this.tagSize,n=this.hit,i=this.effect,l=e("span",{class:["el-tag",t?"el-tag--"+t:"",a?"el-tag--"+a:"",i?"el-tag--"+i:"",n&&"is-hit"],style:{backgroundColor:this.color},on:{click:this.handleClick}},[this.$slots.default,this.closable&&e("i",{class:"el-tag__close el-icon-close",on:{click:this.handleClose}})]);return this.disableTransitions?l:e("transition",{attrs:{name:"el-zoom-in-center"}},[l])}},i={components:{ElTag:a("VU/8")(n,null,!1,null,null,null).exports},data:function(){return{activeIndex2:"",handleSelect:"",checked:"",currentPage3:"",handleSizeChange:"",handleCurrentChange:"",dialogVisible:!1,reportData:[{id:"0001",date:"2016-05-03",name:"王小虎",articleName:"程序员的养生秘籍",reason:"涉黄，反动"},{id:"0001",date:"2016-05-03",name:"王小虎",articleName:"程序员的养生秘籍",reason:"涉黄，反动"},{id:"0001",date:"2016-05-03",name:"王小虎",articleName:"程序员的养生秘籍",reason:"涉黄，反动"},{id:"0001",date:"2016-05-04",name:"王小虎",articleName:"程序员的养生秘籍",reason:"涉黄，反动xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},{id:"0001",date:"2016-05-02",name:"王小虎",articleName:"程序员的养生秘籍",reason:"涉黄，反动"},{id:"0001",date:"2016-05-03",name:"王小虎",articleName:"程序员的养生秘籍",reason:"涉黄，反动"},{id:"0001",date:"2016-05-03",name:"王小虎",articleName:"程序员的养生秘籍",reason:"涉黄，反动"},{id:"0001",date:"2016-05-01",name:"王小虎",articleName:"程序员的养生秘籍",reason:"涉黄，反动"}]}},methods:{handleClose:function(e){this.$confirm("确认关闭？").then(function(t){e()}).catch(function(e){})},ignoreItem:function(){this.$confirm("忽略该举报信息？").then(function(e){done()}).catch(function(e){})},deleteArticle:function(){this.$confirm("确认删除该文章？").then(function(e){done()}).catch(function(e){})}},name:"reportManager"},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticStyle:{width:"100%",height:"100%"}},[e._m(0),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.reportData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"编号",sortable:"",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"date",label:"提交日期",sortable:"",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"举报人昵称",width:"140"}}),e._v(" "),a("el-table-column",{attrs:{prop:"articleName",label:"被举报文章",wideth:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"overflow"},[e._v(e._s(t.row.articleName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"reason",label:"举报原因",wideth:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"overflow"},[e._v(e._s(t.row.reason))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"check",label:"审核",wideth:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(t){e.dialogVisible=!0}}},[a("i",{staticClass:"el-icon-view",staticStyle:{"font-size":"large"}}),e._v("文章预览")])]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"处理",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.deleteArticle()}}},[a("i",{staticClass:"el-icon-delete",staticStyle:{"font-size":"large"}})]),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.ignoreItem()}}},[e._v("忽略")])]}}])})],1),e._v(" "),a("el-dialog",{attrs:{title:"标题",center:"true",visible:e.dialogVisible,width:"50%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticStyle:{height:"400px"}}),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"})]),e._v(" "),a("div",{staticClass:"block",attrs:{align:"center"}},[a("el-pagination",{attrs:{background:"","current-page":e.currentPage3,"page-size":100,layout:"prev, pager, next, jumper",total:1e3},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage3=t},"update:current-page":function(t){e.currentPage3=t}}})],1)],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticStyle:{"background-color":"#708090",height:"75px","line-height":"75px","font-size":"20px",color:"#fff"}},[this._v("未处理消息:"),t("span",{staticStyle:{"font-size":"30px",color:"#FFD640"}},[this._v(" 32 ")]),this._v("条")])}]};var o=a("VU/8")(i,l,!1,function(e){a("qHCW")},"data-v-39fe9bb7",null);t.default=o.exports},qHCW:function(e,t){}});
webpackJsonp([20],{aXxh:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"userCount",data:function(){return{form:{name:"",date:""},detailShow:!1,tableData:[{date:"",userName:"",userId:"",visitCnt:"",visitPosts:""}]}},methods:{handlerSearch:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.tableData.forEach(function(e){e.userName=t.form.name,e.date=t.form.date,e.userId=Math.floor(99999*Math.random()+1e4)+"@qq.com",e.visitCnt=Math.floor(999*Math.random()),e.visitPosts=Math.floor(999*Math.random())}),t.detailShow=!0})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticStyle:{width:"100%",height:"100%"}},[a("div",{staticClass:"body-main",staticStyle:{padding:"20px"}},[a("el-row",[a("h2",[e._v("用户访问统计")])]),e._v(" "),a("el-row",{attrs:{gutter:10}},[a("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form,"label-width":"80px",inline:"true"}},[a("el-form-item",{attrs:{label:"统计月份",required:""}},[a("el-date-picker",{attrs:{type:"month","value-format":"yyyy/MM",placeholder:"统计月份"},model:{value:e.form.date,callback:function(t){e.$set(e.form,"date",t)},expression:"form.date"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用户名",required:""}},[a("el-input",{attrs:{placeholder:"请输入用户名","prefix-icon":"el-icon-search"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handlerSearch("form")}}},[e._v("查询")])],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{"margin-top":"20px"}},[a("el-table",{directives:[{name:"show",rawName:"v-show",value:e.detailShow,expression:"detailShow"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,stripe:""}},[a("el-table-column",{attrs:{prop:"date",label:"月份",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"用户名",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userId",label:"账号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"visitCnt",label:"访问网站次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"visitPosts",label:"浏览文章数量"}})],1)],1)],1)])},staticRenderFns:[]};var o=a("VU/8")(r,l,!1,function(e){a("kviV")},"data-v-130a364b",null);t.default=o.exports},kviV:function(e,t){}});
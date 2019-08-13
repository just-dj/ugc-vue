webpackJsonp([4],{"0pbC":function(e,t){},FIId:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("pFYg"),i=o.n(r),n=o("mvHQ"),s=o.n(n),a=o("+qPk"),l=o("P9l9"),c=(o("MS2J"),{name:"editBlog",components:{VueEditor:a.a},data:function(){return{ugc_blog_options:[],fileList:[],uploadUrl:"",fullScreenLoading:!0,editForm:{title:"",kind:"",content:"",cover:"",status:1},editFormRules:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],kind:[{required:!0,message:"请选择分类",trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"blur"}]}}},methods:{clearEditForm:function(){this.editForm={title:"",kind:"",content:"",cover:"",status:1}},toReadPage:function(){this.$router.push({path:"/readBlogPage",query:{article:s()(this.editForm)}})},saveArticle:function(){var e=this;this.$refs.editForm.validate(function(t){if(!t)return!1;Object(l.a)(e.editForm).then(function(t){200===t.code?1===e.editForm.status?e.$message.success("发表成功"):e.$message.success("暂存成功"):2===t.code?(e.$store.commit("signInDialogVisibleTrue"),e.$router.push({path:"/meetingPage",query:{isError:!0}})):e.$message.error(t.msg)})})},saveAsDrift:function(){this.editForm.status=2,this.saveArticle()},uploadSuccess:function(e,t,o){console.log("上传成功"),200===e.code&&(console.log("进入方法体"),this.editForm.cover=e.msg)},beforeImageUpload:function(e){var t=e.size/1024/1024<2;return"image/jpeg"===e.type||"image/png"===e.type||this.$message.error("只能上传jpg/png文件!"),t||this.$message.error("上传图片大小不能超过 2MB!"),t},handleImageAdd:function(e,t,o,r){var i=new FormData;i.append("file",e),this.$http.post(this.uploadUrl,i).then(function(e){var r=e.data.msg;console.log(e),console.log(e.body),t.insertEmbed(o,"image",r)},function(e){console.log(e)})},openFullScreen:function(){var e=this;this.$store.commit("openFullScreenLoading"),setTimeout(function(){e.$store.commit("closeFullScreenLoading")},200+150*Math.random())},isEmpty:function(e){switch(void 0===e?"undefined":i()(e)){case"undefined":return!0;case"string":if(0===e.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,"").length)return!0;break;case"boolean":if(!e)return!0;break;case"number":if(0===e||isNaN(e))return!0;break;case"object":if(null===e||0===e.length)return!0;for(var t in e)return!1;return!0}return!1},contains:function(e,t){return this.isEmpty(e)?(console.log("为空"),!1):-1!=e.indexOf(t)}},mounted:function(){var e=this;if(this.openFullScreen(),!this.isEmpty(this.$route.query.article)){var t=JSON.parse(this.$route.query.article);this.editForm=t}this.uploadUrl="http://47.102.199.98:9002/api/universal/upload",Object(l.n)("ugc_blog_options").then(function(t){200===t.code?e.ugc_blog_options=t.data:console.error("博客类型下拉列表获取失败")})}}),u={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"edit-main"},[o("el-form",{ref:"editForm",staticStyle:{width:"80%",height:"90%"},attrs:{model:e.editForm,"label-width":"7rem",rules:e.editFormRules}},[o("el-row",[o("el-col",{attrs:{span:24}},[o("el-form-item",{attrs:{prop:"title"}},[o("el-input",{attrs:{autocomplete:"off",placeholder:"请输入博客标题"},model:{value:e.editForm.title,callback:function(t){e.$set(e.editForm,"title",t)},expression:"editForm.title"}})],1)],1)],1),e._v(" "),o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{prop:"kind"}},[o("el-select",{staticStyle:{width:"25rem"},attrs:{placeholder:"请选择博客分类"},model:{value:e.editForm.kind,callback:function(t){e.$set(e.editForm,"kind",t)},expression:"editForm.kind"}},e._l(e.ugc_blog_options,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",[o("el-upload",{attrs:{"show-file-list":!0,accept:"image/*",action:e.uploadUrl,limit:1,"before-upload":e.beforeImageUpload,"on-success":e.uploadSuccess}},[o("el-button",{attrs:{size:"medium ",type:"primary"}},[e._v("点击上传封面")]),e._v(" "),o("div",{staticClass:"el-upload__tip",staticStyle:{float:"right","margin-left":"25px"}},[e._v("只能上传jpg/png文件，且不超过2M")])],1)],1)],1)],1),e._v(" "),o("el-row",[o("el-form-item",{attrs:{prop:"content"}},[o("vue-editor",{staticStyle:{height:"350px"},attrs:{useCustomImageHandler:""},on:{imageAdded:e.handleImageAdd},model:{value:e.editForm.content,callback:function(t){e.$set(e.editForm,"content",t)},expression:"editForm.content"}})],1)],1)],1),e._v(" "),o("div",{staticStyle:{width:"80%",display:"flex","justify-content":"center","align-items":"center"}},[o("el-button",{attrs:{type:"primary"},on:{click:e.saveArticle}},[e._v("发表")]),e._v(" "),o("el-button",{on:{click:e.saveAsDrift}},[e._v("暂存")]),e._v(" "),o("el-button",{on:{click:e.toReadPage}},[e._v("预览")]),e._v(" "),o("el-button",{attrs:{type:"danger"},on:{click:e.clearEditForm}},[e._v("清空")])],1)],1)},staticRenderFns:[]};var d=o("VU/8")(c,u,!1,function(e){o("0pbC")},"data-v-e642b2fc",null);t.default=d.exports}});
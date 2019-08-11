<template>
  <div class="edit-main">


    <el-form :model="editForm"
             label-width="7rem"
             style="width: 80%;height: 90%"
             :rules="editFormRules"
             ref="editForm">

      <el-row>
        <el-col :span="24">
          <el-form-item prop="title">
            <el-input v-model="editForm.title" autocomplete="off"
                      placeholder="请输入新闻标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="kind">
            <el-select v-model="editForm.kind" placeholder="请选择新闻分类" style="width: 25rem">
              <el-option

                v-for="item in ugc_meeting_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row>
        <el-form-item prop="content">
          <vue-editor
            useCustomImageHandler
            @imageAdded="handleImageAdd"
            v-model="editForm.content"
            style="height: 350px">
          </vue-editor>
        </el-form-item>
      </el-row>

    </el-form>


    <div style="width:80%;display: flex;justify-content: center;align-items: center">
      <el-button type="primary" @click="saveArticle">发表</el-button>
      <el-button @click="saveAsDrift">暂存</el-button>
      <el-button @click="toReadPage">预览</el-button>
      <el-button type="danger" @click="clearEditForm">清空</el-button>

    </div>

  </div>
</template>

<script>
  import {VueEditor} from 'vue2-editor';
  import {} from "../../api/api";
  import * as util from "../../common/utils/util";
  import {addMeetingAPI} from "../../api/api";
  import {dropListOneGetApi} from "../../api/api";

  export default {
    name: "editBlog",
    components: {VueEditor},
    data() {
      return {
        ugc_meeting_options:[],
        fileList: [],
        uploadUrl: '',
        fullScreenLoading: true,
        editForm: {
          title: '',
          kind: '',
          content: '',
          status: 1
        },
        editFormRules: {
          "title": [{required: true, message: "请输入标题", trigger: 'blur'}],
          "kind": [{required: true, message: "请选择分类", trigger: 'blur'}],
          "content": [{required: true, message: "请输入内容", trigger: 'blur'}]
        }
      }

    },

    methods: {

      clearEditForm:function(){
        this.editForm = {
          title: '',
          kind: '',
          content: '',
          cover: '',
          status: 1
        }
      },

      toReadPage:function(){
        this.$router.push({path: '/readBlogPage', query: {article: JSON.stringify(this.editForm)}})
      },

      saveArticle: function () {

        this.$refs["editForm"].validate((valid) => {
          if (valid) {
            addMeetingAPI(this.editForm).then(res => {
              if (res.code === 200) {
                if (this.editForm.status === 1){
                  this.$message.success("发表成功");
                } else {
                  this.$message.success("暂存成功");
                }
              } else if (res.code === 2) {
                this.$store.commit('signInDialogVisibleTrue');
                this.$router.push({path: '/meetingPage',query: {isError: true}});
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            return false;
          }
        });
      },

      saveAsDrift: function(){
        this.editForm.status = 2;
        this.saveArticle();
      },

      uploadSuccess: function (response, file, fileList) {
        console.log("上传成功")
        if (response.code === 200) {
          console.log("进入方法体")
          this.editForm.cover = response.msg;
        }
      },

      beforeImageUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        let isLt2M = file.size / 1024 / 1024 < 2;
        let isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
          this.$message.error('只能上传jpg/png文件!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },

      /**
       * vue2Editor 内图片上传处理(获取图片服务器地址，并以image插入到光标位置)
       * @param file
       * @param Editor
       * @param cursorLocation
       * return  src
       */
      handleImageAdd(file, Editor, cursorLocation, resetUploader) {
        let temp = {
          'file': file
        }

        let formData = new FormData();
        formData.append('file', file);

        this.$http.post(this.uploadUrl, formData).then(function (response) {
          let url = response.data.msg;
          console.log(response);
          console.log(response.body);
          /*插入路径*/
          Editor.insertEmbed(cursorLocation, 'image', url);
        }, function (response) {
          console.log(response);
        });
      },


      openFullScreen() {
        this.$store.commit('openFullScreenLoading');
        setTimeout(() => {
          this.$store.commit('closeFullScreenLoading');
        }, 200 + Math.random() * 150);
      },

      isEmpty: function (v) {
        switch (typeof v) {
          case 'undefined':
            return true;
          case 'string':
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true;
            break;
          case 'boolean':
            if (!v) return true;
            break;
          case 'number':
            if (0 === v || isNaN(v)) return true;
            break;
          case 'object':
            if (null === v || v.length === 0) return true;
            for (let i in v) {
              return false;
            }
            return true;
        }
        return false;
      },

      contains: function (arr, val) {
        if (this.isEmpty(arr)) {
          console.log("为空")
          return false;
        }
        return arr.indexOf(val) != -1 ? true : false;
      },

    },
    mounted() {
      this.openFullScreen();
      if (!this.isEmpty(this.$route.query.article)){
        let temp = JSON.parse(this.$route.query.article);
        this.editForm = temp;
      }

      this.uploadUrl = process.env.SERVER_URL + '/api/universal/upload';
      dropListOneGetApi("ugc_meeting_options").then(res => {
        if (res.code === 200) {
          this.ugc_meeting_options = res.data;
        } else {
          console.error("博客类型下拉列表获取失败");
        }
      });
    }


  }
</script>

<style scoped>
  .edit-main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 25px;

  }

</style>

<template>
  <div class="edit-main">


    <el-form :model="editForm"
             label-width="7rem"
             style="width: 80%;height: 90%"
             :rules="editFormRules"
             ref="editForm">

      <el-row>
        <el-col :span="24">
          <el-form-item prop="jobName">
            <el-input v-model="editForm.title" autocomplete="off"
                      placeholder="请输入博客标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item  prop="jobType" >
            <el-select v-model="editForm.kind" placeholder="请选择博客分类"     style="width: 25rem">
              <el-option

                v-for="item in job_type_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-upload
            :show-file-list="true"
            accept="image/*"
            :action="uploadUrl"
            :limit="1"
            :before-upload="beforeImageUpload"
            :on-success="uploadSuccess">
            <el-button size="medium " type="primary">点击上传封面</el-button>
            <div style="float: right;margin-left: 25px" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item  prop="jobDetails">
          <vue-editor
            useCustomImageHandler
            @imageAdded="handleImageAdd"
            v-model="editForm.content"
            style="height: 350px" >
          </vue-editor>
        </el-form-item>
      </el-row>

    </el-form>


    <div style="width:80%;display: flex;justify-content: center;align-items: center">
      <el-button type="primary">发表</el-button>
      <el-button >暂存</el-button>
      <el-button type="danger" @click="editForm.content = ''">清空</el-button>

    </div>

  </div>
</template>

<script>
  import {VueEditor} from 'vue2-editor';
  import {uploadFile} from "../api/api";

  export default {
    name: "editBlog",
    components: {VueEditor},
    data() {
      return {
        fileList:[],
        uploadUrl:'',
        fullScreenLoading: true,
        editForm:{
          title:'',
          kind:'',
          content:'',
          cover:''
        },
        editFormRules: {

        },
        job_type_options : [{
          value: 'dsj',
          label: '大数据'
        }, {
          value: 'rgzn',
          label: '人工智能'
        }, {
          value: 'hdkf',
          label: '后端开发'
        }, {
          value: 'qdkf',
          label: '前端开发'
        }, {
          value: 'txsb',
          label: '图像识别'
        }, {
          value: 'jqxx',
          label: '机器学习'
        }],
      }

    },

    methods: {
      uploadSuccess: function(response, file, fileList){
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
        return  isLt2M;
      },

      /**
       * vue2Editor 内图片上传处理(获取图片服务器地址，并以image插入到光标位置)
       * @param file
       * @param Editor
       * @param cursorLocation
       * return  src
       */
      handleImageAdd (file, Editor, cursorLocation, resetUploader) {
        let temp = {
          'file':file
        }

        let formData = new FormData();
        formData.append('file', file);

        this.$http.post( this.uploadUrl, formData).then(function (response){
          let url = response.data.msg;
          console.log(response);
          console.log(response.body);
          /*插入路径*/
          Editor.insertEmbed(cursorLocation, 'image', url);
        },function (response){
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
        console.log("调用比较函数 arr" + JSON.stringify(arr) + "      " + val + "   empty " + this.isEmpty(arr));
        if (this.isEmpty(arr)) {
          console.log("为空")
          return false;
        }
        return arr.indexOf(val) != -1 ? true : false;
      },

    },
    mounted() {
      this.openFullScreen();
      this.uploadUrl = process.env.SERVER_URL +  '/api/universal/upload';
    }


  }
</script>

<style scoped>
  .edit-main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 25px;

  }

</style>

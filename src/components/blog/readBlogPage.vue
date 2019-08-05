<template>


  <div
    style="width: 100%;display: flex;justify-content: center;align-items: flex-start;margin-bottom: 100px">
    <el-button @click="back"
      plain icon="el-icon-back" style="position: fixed;top: 81px;left: 32px">
      返回
    </el-button>

    <div
      style="width: 65%;display: flex;flex-direction: column;justify-content: flex-start;align-items: center">
      <div class="title">
        {{article.title}}
      </div>

      <div class="content" style="width: 100%;height: 100%;margin-bottom: 40px">
        <vue-editor v-model="article.content">
          {{article.content}}
        </vue-editor>
      </div>

      <div style="width: 100%;height: 150px;background-color: red"></div>

    </div>

  </div>
</template>

<script>
  import {VueEditor} from 'vue2-editor';
  import * as util from "../../common/utils/util";

  export default {
    name: "readBlogPage",
    components: {VueEditor},
    data() {
      return {
        id: '',
        article: '',
        type: 'preview'
      }
    },
    methods: {
      back:function () {
        this.$router.go(-1);
      }

    },
    mounted() {
      this.id = this.$route.query.id;
      this.type = "read";
      if (util.isEmpty(this.id)) {
        this.article = JSON.parse(this.$route.query.article);
        this.type = "preview";
      }
    }
  }
</script>

<style scoped>
  .title {
    width: 100%;
    height: 40px;
    font-size: 29px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    margin-bottom: 30px;
  }

  .content {
    width: 100%;
    max-width: 100%;
    height: 400px;
  }

  .content image {
    width: 100%;
    max-width: 100%;
  }


  >>> .ql-toolbar{
    display: none;
  }

  >>> .ql-container.ql-snow{
    border: 0px solid #fff;
  }
</style>

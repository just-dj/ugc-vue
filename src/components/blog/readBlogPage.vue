<template>
    <el-main style="background-color: #fff">

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

          <div class="author-info">
            <div v-if="type==='preview'" style="padding:0px 16px;width:100%;height:100%;display: flex;justify-content: flex-start;align-items: center">

              <img v-show="isEmpty(user.headImg)"
                   src="https://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/default_header_img.png"
                   style="width: 50px;height: 50px"/>
              <img v-show="!isEmpty(user.headImg)" :src="user.headImg"
                   style="width: 50px;height: 50px;border-radius: 50%"/>

              <div class="author-info-right" style="height: 100%;width: 60%">
                <div class="authorInfo-top">
                  <div style="color: black;margin-right: 10px;font-size: 17px">
                    {{this.user.name}}
                  </div>
                  <div class="button-collect">
                <span class="el-icon-plus" style="color:#fff;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center">
                  关注
                </span>
                  </div>
                </div>

                <div class="authorInfo-bottom">
                  <span class="authorInfo-bottom-info">等级</span>
                  <span class="authorInfo-bottom-info">2019.07.15 15:78</span>
                  <span class="authorInfo-bottom-info">字数 1852</span>
                  <span class="authorInfo-bottom-info">阅读 785</span>
                  <span class="authorInfo-bottom-info">评论 8</span>
                  <span class="authorInfo-bottom-info">喜欢 89</span>
                </div>

              </div>
            </div>
          </div>

          <div class="content" style="width: 100%;height: 100%;margin-bottom: 40px">
            <vue-editor v-model="article.content">
              {{article.content}}
            </vue-editor>
          </div>

          <div style="width: 100%;height: 150px;background-color: red"></div>

        </div>

      </div>

    </el-main>

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
        type: 'preview',
        isLogin:false
      }
    },
    computed:{
      user: {
        get: function () {
          return this.$store.state.user;
        },
        set: function () {

        }
      },
    },
    methods: {
      back:function () {
        this.$router.go(-1);
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
      }

    },
    created: function () {
      if (!util.isEmpty(localStorage.getItem("token"))) {
        console.log("已经登录 ");
        this.isLogin = true;
        this.$store.commit('setHeadImg', {name: 'stark', user: JSON.parse(localStorage.getItem("user"))});

      } else {
        console.log("还未登录 ");
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
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 55px;
    margin-bottom:44px;
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

  .author-info{
    width: 100%;
    height: 50px;
    margin-bottom: 35px;
  }

  .author-info .author-info-right{
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 20px;
  }

  .author-info .author-info-right .authorInfo-top{
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .author-info-right .authorInfo-top .button-collect{
    width: 60px;
    height: 20px;
    background-color: rgb(66,192,46);
    border-radius: 10px;
  }

  .author-info-right .authorInfo-top .button-collect:hover{
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transform: translate3d(0, -2px, 0);
  }


  .author-info .author-info-right .authorInfo-bottom{
    height: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .author-info-right .authorInfo-bottom .authorInfo-bottom-info{
    margin-right: 15px;
    color: #bbbbbb;
    height: 100%;
    line-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }


  >>> .ql-toolbar{
    display: none;
  }

  >>> .ql-container.ql-snow{
    border: 0px solid #fff;
  }
</style>

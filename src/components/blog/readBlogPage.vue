<template>
    <el-main style="background-color: #fff">

      <div
        style="width: 100%;display: flex;justify-content: center;align-items: flex-start;margin-bottom: 100px">
        <el-button @click="back"
                   plain icon="el-icon-back" style="position: fixed;top: 81px;left: 32px">
          返回
        </el-button>

        <div style="width: 65%;display: flex;flex-direction: column;
          justify-content: flex-start;align-items: center">
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
            <div v-else style="padding:0px 16px;width:100%;height:100%;display: flex;justify-content: flex-start;align-items: center">

              <img v-show="isEmpty(author.headImg)"
                   src="https://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/default_header_img.png"
                   style="width: 50px;height: 50px"/>
              <img v-show="!isEmpty(author.headImg)" :src="author.headImg"
                   style="width: 50px;height: 50px;border-radius: 50%"/>

              <div class="author-info-right" style="height: 100%;width: 60%">
                <div class="authorInfo-top">
                  <div style="color: black;margin-right: 10px;font-size: 17px">
                    {{this.author.name}}
                  </div>
                  <div @click="likeUser" v-if="!isAuthorLiked" class="button-collect">
                    <span  class="el-icon-plus" style="color:#fff;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center">
                      关注
                    </span>
                  </div>
                  <div v-else class="button-collect">
                    <span style="color:#fff;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center">
                       已关注
                    </span>
                  </div>
                </div>

                <div class="authorInfo-bottom">
                  <span class="authorInfo-bottom-info">等级</span>
                  <span class="authorInfo-bottom-info">{{formatTime(article.presentTime)}}</span>
                  <span class="authorInfo-bottom-info">字数 {{article.length}}</span>
                  <span class="authorInfo-bottom-info">阅读 {{article.readCount}}</span>
                  <span class="authorInfo-bottom-info">评论 {{isEmpty(article.comment) ? 0 : article.comment.length}}</span>
                  <span class="authorInfo-bottom-info">喜欢 {{article.likeCount}}</span>
                </div>

              </div>
            </div>
          </div>

          <div class="content" style="width: 100%;height: 100%;margin-bottom: 10px">
            <vue-editor v-model="article.content">
              {{article.content}}
            </vue-editor>
          </div>

          <div v-if="type==='read'" class="author-detailInfo" style="width: 100%;height: 150px;">


          </div>

          <div  v-if="type==='read'" class="article-like" style="width: 100%;height: 54px;margin: 10px 0">
            <div class="article-like-pane">
              <img @click="like" v-if="!contains(article.likeUser,user.id)" style="width: 30px;height: 30px;margin-right: 15px" src="/static/img/icon/like.png">
              <img @click="like"  v-else style="width: 30px;height: 30px;margin-right: 15px" src="/static/img/icon/liked.png">
                喜欢  |  {{article.likeCount}}
            </div>

          </div>


          <div class="comment" v-if="type==='read'" >
              <div style="width: 100%;height:145px;">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="输入你的评论"
                  v-model="userComment">
                </el-input>
                <div style="margin-top:20px;width:100%;display: flex;justify-content: flex-end;align-items: center">
                  <el-button type="text" style="margin-right: 20px;color: #aaa" @click="userComment = ''">取消</el-button>
                  <el-button type="success" style="border-radius: 20px" @click="sendComment">发送</el-button>
                </div>
              </div>

              <div class="comment-title"> {{article.comment.length }}条评论 </div>

              <div class="comment-item" v-for="(item,index) in article.comment" style="width: 100%;border-top: 1px solid #eee">
                <div class="author-info" style="margin-bottom: 15px">
                  <div style="padding:0px 16px;width:100%;height:100%;display: flex;justify-content: flex-start;align-items: center">

                    <img v-show="isEmpty(item.commentUserHeadURL)"
                         src="https://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/default_header_img.png"
                         style="width: 50px;height: 50px"/>
                    <img v-show="!isEmpty(item.commentUserHeadURL)" :src="item.commentUserHeadURL"
                         style="width: 50px;height: 50px;border-radius: 50%"/>

                    <div class="author-info-right" style="height: 100%;width: 60%">
                      <div class="authorInfo-top">
                        <div style="color: black;margin-right: 10px;font-size: 17px;">
                          {{item.commentUserName}}
                        </div>
                      </div>

                      <div class="authorInfo-bottom">
                        <span class="authorInfo-bottom-info">{{article.comment.length  - index}} 楼</span>
                        <span class="authorInfo-bottom-info">{{formatTime(item.commentTime)}}</span>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="comment-content">
                  <span style="text-align: left">{{item.comment}}</span>
                </div>
                <div class="comment-operating">
                  <img @click="likeComment(item)" class="special-hover" style="width: 16px;height: 16px;margin-right: 10px" src="/static/img/icon/zan.png"/>  {{isEmpty(item.likeUserId)?0:item.likeUserId.length}}赞
                  <img class="special-hover" style="width: 20px;height: 20px;margin-left: 20px;margin-right: 10px" src="/static/img/icon/message.png"/>  回复
                </div>
              </div>

          </div>

        </div>

      </div>

    </el-main>

</template>

<script>
  import {VueEditor} from 'vue2-editor';
  import * as util from "../../common/utils/util";
  import {addCommentApi, blogLikeCount, blogReadCount, getBlogAPI, getUserAPI, likeUserApi} from "../../api/api";
  import {isEmpty} from "../../common/utils/util";
  import {contains} from "../../common/utils/util";

  export default {
    name: "readBlogPage",
    components: {VueEditor},
    data() {
      return {
        id: '',
        article: {},
        type: 'preview',
        isLogin:false,
        author:'',
        isLiked: false,
        userComment:'',
        isAuthorLiked:false
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
      likeUser:function(){
        likeUserApi(this.article.authorId).then(res => {
           if (res.code === 200){
             if (isEmpty(this.user.likeUser)) {
               this.user.likeUserId = [];
             }
             this.isAuthorLiked = true;
             this.user.likeUserId.push(this.article.authorId);
             localStorage.setItem("user",JSON.stringify(res.data));
             this.$store.commit('setHeadImg', {name: 'stark', user: res.data});
           }else if (res.code === 2) {
             this.$store.commit('signInDialogVisibleTrue');
           } else {
             this.$message.error(res.msg)
           }
        })
      },

      likeComment:function(item){

        if (isEmpty(item.likeUserId)){
          item.likeUserId = [];
        }
        if (contains(item.likeUserId,this.user.id)){
          this.$message.info("已经点过赞了");
          return;
        }

        item.likeUserId.push(this.user.id);
        addCommentApi({id:this.article.id,commentList:this.article.comment}).then(res => {
           if (res.code === 200){

           }else if (res.code === 2) {
             this.$store.commit('signInDialogVisibleTrue');
           } else {
             this.$message.error(res.msg)
           }
        })
      },

      sendComment:function(){
        let comment = {
          "comment":this.userComment,
          "commentTime":Date.now(),
          "commentUserId":this.user.id,
          "commentUserName":this.user.name,
          "commentUserHeadURL":this.user.headImg,
          "likeCount":0,
          "child":[],
        };
        let commentList =  JSON.parse(JSON.stringify(this.article.comment));
        if (isEmpty(commentList)){
          commentList = [];
        }
        commentList.unshift(comment);
        util.sort(commentList,"commentTime",'desc');
        addCommentApi({id:this.article.id,commentList:commentList}).then(res =>{
           if (res.code === 200){
             this.$message.success("评论成功");
             this.article.comment = commentList;
             this.userComment = "";
           }else if (res.code === 2) {
             this.$store.commit('signInDialogVisibleTrue');
           } else {
             this.$message.error(res.msg)
           }
        })

      },


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
      },

      like:function(){
        blogLikeCount(this.article.id).then(res => {
          if (res.code === 200){
            this.article = res.data;
          }else if (res.code === 2) {
            this.$store.commit('signInDialogVisibleTrue');
          } else {
            this.$message.error(res.msg)
          }
        });
      },

      contains: function (arr, val) {
        if (this.isEmpty(arr)) {
          return false;
        }
        return arr.indexOf(val) != -1 ? true : false;
      },

      formatTime: function (millisecond) {
        let dateFormat = "";
        let date = new Date();
        date.setTime(millisecond);
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let day = date.getDate();
        if (day < 10) day = "0" + day;
        let hours = date.getHours();
        if (hours < 10) hours = "0" + hours;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        let seconds = date.getSeconds()
        if (seconds < 10) seconds = "0" + seconds;
        dateFormat = date.getFullYear() + "-" +
          month + "-" +
          day + "  " +
          hours + ":" +
          minutes + ":" +
          seconds//yyyy-MM-dd 00:00:00格式日期
        return dateFormat;
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
      this.article = JSON.parse(this.$route.query.article);

      if (util.isEmpty(this.article.id)) {
        this.type = "preview";
      }else {
        this.type = "read";

        getBlogAPI(this.article.id).then(res => {
           if (res.code === 200){
             console.log("正常");
             this.article = res.data;
             util.sort(this.article.comment,"commentTime","desc");
             this.isAuthorLiked = ((this.article.authorId === this.user.id) || contains(this.user.likeUserId,this.article.authorId))
           }else if (res.code === 2) {
             this.$store.commit('signInDialogVisibleTrue');
           } else {
             this.$message.error(res.msg)
           }
        });

        //
        blogReadCount(this.article.id).then();

        getUserAPI(this.article.authorId).then(res => {
           if (res.code === 200){
             if (!util.isEmpty(res.data)){
               this.author = res.data;
             }
           }else if (res.code === 2) {
             this.$store.commit('signInDialogVisibleTrue');
           } else {
             this.$message.error(res.msg)
           }
        });


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

  .article-like-pane{
    width: 200px;
    height: 54px;
    border: 1px solid rgb(236,129,111);
    border-radius: 26px;
    color: rgb(236,129,111);
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 54px;
    text-align: center;
  }

  .comment{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  .comment .comment-title{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 30px;
    line-height: 30px;
    float: left;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .comment-item{
    padding-top: 15px;
  }
  .comment-item .comment-content{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding-left: 20px;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .comment-item .comment-operating{
    padding-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
  }

</style>

<!--个人中心-->
<template>
  <section style="width: 100%;height: 100%;" v-loading.fullscreen.lock="fullScreenLoading">
    <div style="background-color: #fafafa">
      <!--头部背景和用户头像部分-->
      <div class="personal-head"
           style="background-image: url('http://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/background.jpg');">
        <div class="personal-head-bg">
          <div class="personal-head-box wp cl">
            <div class="change-bg r">
              <!--<a href="javascript:;" class="icon icon-changeBg"><span>修改封面</span></a>-->
            </div>
            <div class="user-info">
              <div class="personal-avatar">
                <div class="user-photo">
                  <img src="http://www.dgtle.com/uc_server/avatar.php?uid=960557" alt="">
                </div>
                <!--              <a class="change-photo" href="#">-->
                <!--                <i class="Dgtle-fonts icon-Dgtlex-dgtlexicon-picture"></i>-->
                <!--                <span>更换我的头像</span>-->
                <!--              </a>-->
              </div>
              <div class="personal-detail">
                <span>越人猫</span>
                <!-- <span class="Dgtle-fonts icon-Dgtlex-dgtlexicon-avatar"></span> -->
                <a href="#" class="personal-label"><span>大佬</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--内容主体部分-->
      <div class="personal-content wp cl">
        <div class="personal-info cl">
          <div class="edit-info">
            <el-button class="icon-edit" round>编辑个人资料</el-button>
          </div>
          <ul class="user-attention">
            <li>
              <a href="#">
                <span>关注</span>
                <strong>2</strong>
              </a>
            </li>
            <li>
              <a href="#">
                <span>粉丝</span>
                <strong>0</strong>
              </a>
            </li>
          </ul>
        </div>
        <!--关注列表选项卡部分-->
        <div class="personal-nav cl">
          <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="center" style="text-align: center">
            <el-tab-pane label="论坛" name="community" class="mytab">
              <el-tabs v-model="postsLists">
                <el-tab-pane label="我的贴子" name="postsList">
                  <div class="tablist">
                    这里显示我发表过的文章、帖子、博客的列表
                  </div>
                </el-tab-pane>
                <el-tab-pane label="草稿箱" name="draftList">
                  <div class="tablist">

                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="关注" name="follow" class="mytab">
              <el-tabs v-model="followList">
                <el-tab-pane label="我关注的人 (2)" name="myfollow">
                  <div class="tablist">
                    <ul class="follow cl">
                      <li>
                        <div class="follow-box cl">
                          <a href="#" class="img-link l">
                            <img src="http://www.dgtle.com/uc_server/avatar.php?uid=960557" alt="">
                          </a>
                          <div class="people-info l">
                            <a class="people-name" href="#">王大锤</a>
                            <span class="nameIcon Dgtle-fonts icon-Dgtlex-dgtlexicon-avatar-solid"></span>
                            <p>这条友很懒，什么也没有留下</p>
                            <div class="people-atten">
                              <a href="#">1225</a><span>粉丝</span>
                              <a href="#">309</a><span>帖子</span>
                            </div>
                          </div>
                          <div class="atten-btn">
                            <el-button round size="medium">已关注</el-button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="follow-box cl">
                          <a href="#" class="img-link l">
                            <img src="http://www.dgtle.com/uc_server/avatar.php?uid=960557" alt="">
                          </a>
                          <div class="people-info l">
                            <a class="people-name" href="#">王大锤</a>
                            <span class="nameIcon Dgtle-fonts icon-Dgtlex-dgtlexicon-avatar-solid"></span>
                            <p>这条友很懒，什么也没有留下</p>
                            <div class="people-atten">
                              <a href="#">1225</a><span>粉丝</span>
                              <a href="#">309</a><span>帖子</span>
                            </div>
                          </div>
                          <div class="atten-btn attened">
                            <el-button round size="medium">已关注</el-button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="关注我的人 (0)" name="followme">
                  <div class="tablist">
                    <ul class="follow cl">
                      <li>
                        <div class="follow-box cl">
                          <a href="#" class="img-link l">
                            <img src="http://www.dgtle.com/uc_server/avatar.php?uid=960557" alt="">
                          </a>
                          <div class="people-info l">
                            <a class="people-name" href="#">王大锤</a>
                            <span class="nameIcon Dgtle-fonts icon-Dgtlex-dgtlexicon-avatar-solid"></span>
                            <p>这条友很懒，什么也没有留下</p>
                            <div class="people-atten">
                              <a href="#">1225</a><span>粉丝</span>
                              <a href="#">309</a><span>帖子</span>
                            </div>
                          </div>
                          <div class="atten-btn">
                            <el-button round size="medium">已关注</el-button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="follow-box cl">
                          <a href="#" class="img-link l">
                            <img src="http://www.dgtle.com/uc_server/avatar.php?uid=960557" alt="">
                          </a>
                          <div class="people-info l">
                            <a class="people-name" href="#">王大锤</a>
                            <span class="nameIcon Dgtle-fonts icon-Dgtlex-dgtlexicon-avatar-solid"></span>
                            <p>这条友很懒，什么也没有留下</p>
                            <div class="people-atten">
                              <a href="#">1225</a><span>粉丝</span>
                              <a href="#">309</a><span>帖子</span>
                            </div>
                          </div>
                          <div class="atten-btn attened">
                            <el-button round size="medium">已关注</el-button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="收藏" name="favorite" class="mytab">
              <el-tabs v-model="favoriteList">
                <el-tab-pane label="博客" name="myBlogList">
<!--收藏的博客列表-->
                  <el-row :gutter="20" class="cards regular-cards cl">
                    <el-col :span="6">
                      <div class="list-group-content" style="background: #fff">
                        <div class="img-box">
                          <a href="#"><img src="http://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/background.jpg"></a>
                        </div>
                        <div class="cards-content">
                          <h3><a href="#">这里是文章标题233333</a></h3>
                          <p>我好难啊，毫无头绪，甚至有点想吃黄焖鸡米饭啊啊啊啊嘤嘤嘤</p>
                          <el-row>
                            <div class="media">
                              <div class="media-left">
                                <a href="javascript:;">
                                  <img class="media-object img-rounded"
                                       src="http://www.dgtle.com/uc_server/avatar.php?uid=337464">
                                </a>
                              </div>
                              <div class="media-body">
                                <h5 class="media-heading"><a
                                  href="http://www.dgtle.com/home.php?mod=space&amp;do=thread&amp;uid=337464">与我约人歌</a><span> · </span>2019-6-5
                                  10:21</h5>
                              </div>
                            </div>
                            <el-row class="list-stat paTop-14" :gutter="20" style="line-height: 40px">
                              <el-col :span="8">
                                <span class="like-num"><i class="el-icon-moon"></i>557</span>
                              </el-col>
                              <el-col :span="8">
                                <span class="like-num"><i class="el-icon-s-comment"></i>165</span>
                              </el-col>
                              <el-col :span="8">
                                <el-button type="text" @click="handleDelete" style="color: #8c939d">取消收藏</el-button>
                              </el-col>
                            </el-row>
                          </el-row>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="list-group-content" style="background: #fff">
                        <div class="img-box">
                          <a href="#"><img src="http://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/background.jpg"></a>
                        </div>
                        <div class="cards-content">
                          <h3><a href="#">这里是文章标题233333</a></h3>
                          <p>我好难啊，毫无头绪，甚至有点想吃黄焖鸡米饭啊啊啊啊嘤嘤嘤</p>
                          <el-row>
                            <div class="media">
                              <div class="media-left">
                                <a href="javascript:;">
                                  <img class="media-object img-rounded"
                                       src="http://www.dgtle.com/uc_server/avatar.php?uid=337464">
                                </a>
                              </div>
                              <div class="media-body">
                                <h5 class="media-heading"><a
                                  href="http://www.dgtle.com/home.php?mod=space&amp;do=thread&amp;uid=337464">与我约人歌</a><span> · </span>2019-6-5
                                  10:21</h5>
                              </div>
                            </div>
                            <el-row class="list-stat paTop-14" :gutter="20" style="line-height: 40px">
                              <el-col :span="8">
                                <span class="like-num"><i class="el-icon-moon"></i>557</span>
                              </el-col>
                              <el-col :span="8">
                                <span class="like-num"><i class="el-icon-s-comment"></i>165</span>
                              </el-col>
                              <el-col :span="8">
                                <el-button type="text" @click="handleDelete" style="color: #8c939d">取消收藏</el-button>
                              </el-col>
                            </el-row>
                          </el-row>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                    <div class="list-group-content" style="background: #fff">
                      <div class="img-box">
                        <a href="#"><img src="http://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/background.jpg"></a>
                      </div>
                      <div class="cards-content">
                        <h3><a href="#">这里是文章标题233333</a></h3>
                        <p>我好难啊，毫无头绪，甚至有点想吃黄焖鸡米饭啊啊啊啊嘤嘤嘤</p>
                        <el-row>
                          <div class="media">
                            <div class="media-left">
                              <a href="javascript:;">
                                <img class="media-object img-rounded"
                                     src="http://www.dgtle.com/uc_server/avatar.php?uid=337464">
                              </a>
                            </div>
                            <div class="media-body">
                              <h5 class="media-heading"><a
                                href="http://www.dgtle.com/home.php?mod=space&amp;do=thread&amp;uid=337464">与我约人歌</a><span> · </span>2019-6-5
                                10:21</h5>
                            </div>
                          </div>
                          <el-row class="list-stat paTop-14" :gutter="20" style="line-height: 40px">
                            <el-col :span="8">
                              <span class="like-num"><i class="el-icon-moon"></i>557</span>
                            </el-col>
                            <el-col :span="8">
                              <span class="like-num"><i class="el-icon-s-comment"></i>165</span>
                            </el-col>
                            <el-col :span="8">
                              <el-button type="text" @click="handleDelete" style="color: #8c939d">取消收藏</el-button>
                            </el-col>
                          </el-row>
                        </el-row>
                      </div>
                    </div>
                  </el-col>
                    <el-col :span="6">
                      <div class="list-group-content" style="background: #fff">
                        <div class="img-box">
                          <a href="#"><img src="http://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/background.jpg"></a>
                        </div>
                        <div class="cards-content">
                          <h3><a href="#">这里是文章标题233333</a></h3>
                          <p>我好难啊，毫无头绪，甚至有点想吃黄焖鸡米饭啊啊啊啊嘤嘤嘤</p>
                          <el-row>
                            <div class="media">
                              <div class="media-left">
                                <a href="javascript:;">
                                  <img class="media-object img-rounded"
                                       src="http://www.dgtle.com/uc_server/avatar.php?uid=337464">
                                </a>
                              </div>
                              <div class="media-body">
                                <h5 class="media-heading"><a
                                  href="http://www.dgtle.com/home.php?mod=space&amp;do=thread&amp;uid=337464">与我约人歌</a><span> · </span>2019-6-5
                                  10:21</h5>
                              </div>
                            </div>
                            <el-row class="list-stat paTop-14" :gutter="20" style="line-height: 40px">
                              <el-col :span="8">
                                <span class="like-num"><i class="el-icon-moon"></i>557</span>
                              </el-col>
                              <el-col :span="8">
                                <span class="like-num"><i class="el-icon-s-comment"></i>165</span>
                              </el-col>
                              <el-col :span="8">
                                <el-button type="text" @click="handleDelete" style="color: #8c939d">取消收藏</el-button>
                              </el-col>
                            </el-row>
                          </el-row>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="会议" name="myArticleList">
                  收藏的文章列表
                </el-tab-pane>
                <el-tab-pane label="帖子" name="myPostsList">
                  收藏的帖子列表
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: "personCenter",
        data() {
            return {
                fullScreenLoading: false,
                activeName: 'community',
                followList: 'myfollow',
                favoriteList: 'myBlogList',
                community: 'postsLists',
                postsLists: 'postsList'
            }
        },
        methods: {
            openFullScreen() {
                this.fullScreenLoading = true;
                setTimeout(() => {
                    this.fullScreenLoading = false;
                }, 200 + Math.random() * 150);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            mounted() {
                this.openFullScreen();
            },
            handleDelete() {
                this.$confirm('是否取消收藏该博客?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已取消收藏!'
                    });
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                    console.log("2333");
                });
            },
        }
    }
</script>

<style scoped>

  /*个人中心头部背景*/
  .personal-head {
    width: 100%;
    height: 24rem;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    /*margin-top: 3rem;*/
  }

  .personal-head-bg {
    width: 100%;
    height: 24rem;
    background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.30) 98%);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .personal-head-box {
    position: relative;
    height: 24rem;
  }

  .cl {
    zoom: 1
  }

  .wp {
    width: 75rem;
    margin: 0 auto;
  }

  .user-info {
    position: absolute;
    left: 50%;
    bottom: 0.7rem;
    transform: translate(-50%, 0);
  }

  .personal-avatar {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    box-sizing: border-box;
    border: 4px solid #fff;
    margin: 0 auto 0.7rem;
    background-color: #4CA6E1;
    overflow: hidden;
    position: relative;
    text-align: center;
  }

  .user-photo img {
    max-width: 100%;
    vertical-align: top;
  }

  .personal-detail {
    text-align: center;
    color: #fff;
    font-size: 1.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .personal-detail a.personal-label {
    color: #fff;
    line-height: 1.7rem;
    display: inline-block;
    height: 1.7rem;
    margin-top: -6px;
    margin-left: 6px;
  }

  .personal-detail a.personal-label span {
    padding: 3px 8px;
    background-image: linear-gradient(-180deg, #7CC3F6 1%, #61C1DA 98%);
    border-radius: 100px;
    font-size: 0.6rem;
    line-height: 0.6rem;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    /*margin-top:6px;*/
    color: #fff;
  }

  /*内容主体*/
  .personal-content {
    padding-top: 0.5rem;
    min-height: 60rem;
  }

  .personal-info {
    text-align: center;
    position: relative;
  }

  .personal-info .edit-info {
    position: absolute;
    right: 0;
    top: 0;
  }

  .personal-info .user-attention {
    margin-left: -45px;
    text-align: center;
    display: inline-block;
  }

  .personal-info .user-attention li {
    display: inline-block;
    margin: 0 2rem;
  }

  .personal-info .user-attention li a span {
    color: #666;
    font-size: 0.9rem;
    line-height: 1rem;
  }

  .personal-info .user-attention li a strong {
    color: #333;
    font-size: 1.2rem;
    line-height: 2.2rem;
    font-weight: 500;
  }

  .icon-edit {
    display: block;
    text-align: center;
  }

  /*我的关注选项卡内容*/
  .user-attention {
    margin: 10px auto;
  }

  ul {
    font-family: "PingFangSC-Regular", "PingFang SC", "Microsoft YaHei", Arial, Helvetica, "WenQuanYi Micro Hei", "tohoma,sans-serif";
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .tablist ul li {
    float: left;
    width: 450px;
    padding: 10px;
    position: relative;
    z-index: 1;
  }

  >>> .mytab .el-tabs__nav-wrap:after {
    background: none;
  }

  .tablist ul li .follow-box {
    padding: 20px;
    background: #fff;
    height: 70px;
  }

  .tablist ul li .img-link {
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 50%;
    background: #ccc;
  }

  .tablist ul li .img-link img {
    max-width: 100%;
    vertical-align: top;
  }

  .tablist ul li .people-info {
    width: 18.1rem;
    margin-left: 1rem;
  }

  .l {
    float: left;
  }

  .people-info .people-name {
    font-size: 15px;
    color: #54A9CD;
    letter-spacing: 0;
    line-height: 0.8rem;
  }

  .people-info .nameIcon {
    font-size: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    color: #F08C7B;
    display: none;
  }

  .people-info p {
    font-size: 13px;
    color: #999;
    letter-spacing: 0;
    line-height: 30px;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }

  .people-info .people-atten {
    font-size: 12px;
    color: #666;
    letter-spacing: 0;
    line-height: 12px;
  }

  .people-info .people-atten a:first-child {
    margin-left: 0;
  }

  .people-info .people-atten a {
    color: #666;
    margin-left: 1rem;
    margin-right: 4px;
  }

  .people-info .people-atten span {
    font-size: 10px;
    color: #999;
  }

  /*关注*/
  .atten-btn :hover {
    background-image: linear-gradient(-180deg, #4790E5 0%, #52A5F4 100%);
    border: none;
    color: #fff;
    filter: brightness(1.05) contrast(1.05);
    transform: scale(1.1);
  }

  /*博客收藏*/
  .list-group-content{
    border-radius: 5px;
  }
  .img-box img {
    width: 100%;
    /*height: 130px;*/
  }

  .cards-content {
    padding: 10px;
  }

  .cards-content p {
    overflow: hidden;
    margin-top: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    height: 3.1rem;
    color: #333333;
    text-indent: 2em;
    text-align: left;
  }

  .cards-content a:visited {
    color: #000000;
  }
.media-left{
  vertical-align: top;
  float: left;
}
.media-body{
  vertical-align: top;
  /*float: left;*/
}
  .img-rounded {
    border-radius: 6px;
  }

  .media-left a {
    display: block;
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 50%;
    position: relative;
  }

  .cards h5 {
    font-size: 12px;
    color: #999;
    letter-spacing: 0;
    line-height: 32px;
    margin-bottom: 0;
  }
  .list-stat{
    float: left;
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
    color: #8c939d;
  }
</style>

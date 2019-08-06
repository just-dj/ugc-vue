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
                <a href="http://www.dgtle.com/home.php?mod=spacecp&amp;ac=usergroup"
                   class="personal-label"><span>翘长尾巴</span></a>
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
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="关注" name="follow" class="mytab">
              <el-tabs v-model="followList">
                <el-tab-pane label="我关注的人 (2)" name="myfollow">
                  <div class="tablist fade in">
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
                <el-tab-pane label="关注我的人 (0)" name="followme">关注我的人</el-tab-pane>
              </el-tabs>
            </el-tab-pane>

            <el-tab-pane label="收藏" name="favorite">收藏</el-tab-pane>
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
                activeName: 'follow',
                followList: 'myfollow'
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
            }
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

  >>> .mytab .el-tabs__nav-wrap::after {
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

</style>

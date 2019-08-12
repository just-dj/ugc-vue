<template>

  <el-container
    style="width: 100%;display: flex;justify-content: space-between">
    <el-aside class="main-left" style="width: 21%;margin: 0">

      <div class="left-menu" style="position: fixed;left: 140px;top: 81px;max-height: 770px;height: 593px">
        <!--<div style="width: 100%;height: 100%">-->
        <el-scrollbar>
          <el-button v-for="(item ,index) in ugc_blog_options" @click="getData(item.value)" class="left-menu-item">
            {{item.label}}
          </el-button>
        </el-scrollbar>
        <!--</div>-->
      </div>

    </el-aside>

    <el-main class="main-right" style="height: auto">
      <div class="top-article">

        <el-carousel :interval="3000" type="card" height="200px">
          <el-carousel-item v-for="(item,index) in topArticle" :key="index">
            <div class="infoText" @click="toReadPage(item)">
              <img style="width: 100%;height: 100%" :src="item.cover"/>
              <!--<span class="spanOne" style="position:absolute;top:85%;left:10px;text-align: center"> {{item.title}}</span>-->
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="list-article">
        <div class="list-article-operate">
          <el-radio-group v-model="labelPosition" size="medium" @change="labelChange">
            <el-radio-button label="new">最新发表</el-radio-button>
            <el-radio-button label="hot">最近热门</el-radio-button>
          </el-radio-group>

          <el-input style="width: 218px" v-model="searchInput" @change="getPageData" placeholder="请输入关键字"></el-input>
        </div>

        <div v-if="articleList.length <= 0" style="font-size: 20px" >
          当前板块没有文章!!
        </div>

        <!--文章列表-->
        <div v-else class="list-item" v-for="(item,index) in articleList">
          <div class="list-item-left">
            <div class="item-left-title" @click="toReadPage(item)">
              <span style="font-size: 18px;font-weight: bold;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.title}}</span>
            </div>
            <div class="item-left-introduce">
              <span style="font-size: 16px;color: #cccccc">{{item.subTitle}}</span>
            </div>
            <div class="item-left-other">
              <span v-if="!(item.kind === '0')" style="text-align:right;width:60px;margin-right: 70px;font-weight: bold">{{item.authorName}}</span>
              <span v-else style="text-align:right;width:60px;margin-right: 70px;font-weight: bold">**</span>
              <span style="text-align:right;width:60px;margin-right: 70px">{{item.likeCount}}点赞</span>
              <span style="text-align:right;width:70px;margin-right: 70px">{{item.readCount}}阅读</span>
              <span style="text-align:right;width:100px;margin-right: 70px">{{getDuring(item.presentTime)}}</span>
            </div>
          </div>
          <img style="width: 219px;height: 100%;"
               :src="item.cover"/>
        </div>


        <!--loading标志-->
        <div class="loading"
             v-loading="articleLoading"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0)"
             element-loading-text="拼命加载中"
             style="width: 5%;height: 30px;position: fixed;right: 47.5%;bottom:40px;">

        </div>
      </div>


    </el-main>
  </el-container>

</template>

<script>

  import {} from "../../api/api";
  import * as util from "../../common/utils/util"
  import {dropListOneGetApi} from "../../api/api";
  import {blogSimplePageAPI} from "../../api/api";
  import {getTopBlogApi} from "../../api/api";

  export default {
    "name": "blogPage",
    data() {
      return {
        topArticle: [],
        ugc_blog_options: [],
        pageNum: 0,
        pageSize: 8,
        isLastPage: false,
        // 当前选中模块
        selectNowKind: '0',
        // new or hot
        labelPosition: "new",
        // 搜索关键词
        searchInput: '',
        articleList: [],
        fullScreenLoading: false,
        articleLoading: false,
        swiperData: [],
        forbidScroll: false,
        top: 0,
      }
    },
    computed: {},
    methods: {
      labelChange: function () {
        this.openFullScreen();
        this.getPageData();
      },
      toReadPage: function (item) {
        this.$router.push({path: '/readBlogPage', query: {article: JSON.stringify(item)}})
      },
      orderScroll: function () {
        console.log("滚动")
      },

      scroll: function () {
        const el = document.querySelector('.main-right');
        const offsetHeight = el.offsetHeight;
        el.onscroll = () => {
          const scrollTop = el.scrollTop;
          if (this.forbidScroll) {
            this.top = scrollTop;
            return;
          }
          //向下滚动
          if (scrollTop > this.top) {
            console.log("下")
            const scrollHeight = el.scrollHeight;
            if ((offsetHeight + scrollTop) - scrollHeight >= -100) {
              //防抖动
              this.forbidScroll = true;
              setTimeout(() => {
                this.forbidScroll = false;
              }, 1500);
              //是否为空
              if (this.isLastPage) {
                this.$message.info("没有更多！");
                return;
              }
              //分页请求
              this.articleLoading = true;
              this.pageNum += 1;
              //调用分页函数
              this.getPageData();
            }
          } else {
            console.log("上")
          }
          this.top = scrollTop;
        }
      },

      getData: function (kind) {
        if (this.selectNowKind === kind) {
          return;
        }
        this.selectNowKind = kind;
        this.articleList = [];
        this.pageNum = 0;
        this.openFullScreen();
        this.getPageData();
      },

      getDuring: function (createTime) {
        let temp = Date.now() - createTime;
        if (temp < 60 * 1000) {
          return "刚刚";
        } else if (temp < 60 * 60 * 1000) {
          return parseInt(temp / (60 * 1000)) + "分钟前";
        } else if (temp < 24 * 60 * 60 * 1000) {
          return parseInt(temp / (60 * 60 * 1000)) + "小时前";
        } else {
          return parseInt(temp / (24 * 60 * 60 * 1000)) + "天前";
        }
      },

      getPageData: function () {
        let param = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          kind: this.selectNowKind,
          label: this.labelPosition,
          searchInput: this.searchInput
        };

        blogSimplePageAPI(param).then(res => {
            this.articleLoading = false;
            if (res.code === 200) {
              if (!util.isEmpty(res.data)) {
                this.isLastPage = res.data.last;
                res.data.content.forEach(a => {
                  this.articleList.push(a);
                });
              }
            } else if (res.code === 2) {
              this.$store.commit('signInDialogVisibleTrue');
              this.$router.push({path: '/meetingPage', query: {isError: true}});
            } else {
              this.$message.error(res.msg)
            }
          }
        )
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

      this.scroll();

      dropListOneGetApi("ugc_blog_options").then(res => {
        if (res.code === 200) {
          this.ugc_blog_options = res.data;
          this.selectNowKind = this.ugc_blog_options[0].value;
          this.getPageData();
        } else {
          console.error("博客类型下拉列表获取失败");
        }
      });

      getTopBlogApi('').then(res => {
        if (res.code === 200) {
          if (!util.isEmpty(res.data)) {

            this.topArticle = res.data;
          }
        } else if (res.code === 2) {
          this.$store.commit('signInDialogVisibleTrue');
          this.$router.push({path: '/meetingPage', query: {isError: true}});
        } else {
          this.$message.error(res.msg)
        }
      })

    }
  }

</script>
<style scoped>

  .left-menu {
    background-color: #eeeeee;
    width: 160px;
    padding-top: 25px;
    /*margin: 20% calc((100% - 160px) / 2);*/
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

  }

  .left-menu .left-menu-item {
    margin-bottom: 15px;
    min-width: 125px;
  }

  .left-menu .left-menu-item:hover {
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transform: translate3d(0, -2px, 0);
  }

  .el-button + .el-button {
    margin-left: 0;
  }

  .main-left {
    width: 21%;
  }

  .main-right {
    padding-right: 173px;
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .el-scrollbar {
    height: 100%;
  }

  .el-scrollbar__wrap {
    overflow: scroll;
    overflow-x: auto
  }

  .main-right .top-article {
    width: 69%;
    height: 30%;
    margin-bottom: 45px;
  }

  .top-article .swiper-container {
    width: 100%;
    height: 100%;
  }

  .main-right .list-article {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .main-right .list-article .list-article-operate {
    width: 100%;
    height: 41px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 20px;
  }

  .main-right .list-article .list-item {
    width: 100%;
    height: 120px;
    min-height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    border-bottom: 1px solid #eeeeee;
  }

  .main-right .list-article .list-item:hover {
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transform: translate3d(0, -2px, 0);
  }

  .list-article .list-item .list-item-left {
    height: 100%;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .list-article .list-item .list-item-left .item-left-title {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: flex-start;
  }

  .item-left-title:hover {
    color: rgb(64, 158, 255);
  }

  .list-article .list-item .list-item-left .item-left-introduce {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list-article .list-item .list-item-left .item-left-other {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: flex-start;
    margin-top: 15px;
  }

  >>> .el-scrollbar {
    width: 100%;
    height: 593px;
  }

  >>> .el-scrollbar__view {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

</style>

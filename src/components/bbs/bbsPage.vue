<template>

  <el-container
                style="width: 100%;display: flex;justify-content: space-between">
    <el-aside class="main-left" style="width: 21%;margin: 0">

      <div class="left-menu" style="position: fixed;left: 140px;top: 81px;max-height: 770px;height: 593px">
        <!--<div style="width: 100%;height: 100%">-->
        <el-scrollbar>
          <el-button v-for="(item ,index) in ugc_bbs_options" @click="getData(item.value)" class="left-menu-item">{{item.label}}</el-button>
        </el-scrollbar>
        <!--</div>-->
      </div>
    </el-aside>

    <el-main class="main-right" style="height: auto;padding: 20px 60px 0">
      <div class="top-article">
        <el-carousel :interval="2000" type="card" height="200px">
          <el-carousel-item v-for="(item ,index) in swiperData" :key="index">
            <div class="infoText">
              <img  style="width: 100%;height: 100%" :src="item.headImg"/>
              <!--<span class="spanOne"> {{item.nickname}}</span>-->
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="list-article">
        <div class="list-article-operate">
          <el-radio-group v-model="labelPosition" size="medium"  @change="labelChange">
            <el-radio-button label="new">最新发表</el-radio-button>
            <el-radio-button label="hot">最近热门</el-radio-button>
          </el-radio-group>

          <el-input style="width: 218px" v-model="searchInput" placeholder="请输入关键字"></el-input>
        </div>
        <!--表头-->
        <div class="list-item-title">
          <div class="title center" style="font-size: 18px;font-weight: bold;">
            标题
          </div>
          <div class="author center" style="font-size: 18px;font-weight: bold">
            作者
          </div>
          <div class="readCount center" style="font-size: 18px;font-weight: bold">
            点击量
          </div>
          <div class="presentTime center" style="font-size: 18px;font-weight: bold">
            发表时间
          </div>
        </div>

        <!--文章列表-->
        <div class="list-item" v-for="(item,index) in articleList">
          <div class="title "  @click="toReadPage(item.id)">
            {{item.title}}
          </div>

          <div class="author center">
            {{item.authorName}}
          </div>


          <div class="readCount center">
            {{item.readCount}} 点击
          </div>

          <div class="presentTime center">
            发表时间
          </div>

        </div>

        <!--loading标志-->
        <div class="loading"
             v-loading="articleLoading"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0)"
             element-loading-text="拼命加载中"
             style="width: 100%;height: 300px;position: fixed;right: 0;bottom:-50px;">

        </div>
      </div>


    </el-main>
  </el-container>
</template>

<script>

  import {} from "../../api/api";
  import * as util from "../../common/utils/util"
  import {dropListOneGetApi} from "../../api/api";

  export default {
    "name": "bbsPage",
    data() {
      return {
        ugc_bbs_options:[],
        articleLoading:false,
        pageNum: 1,
        pageSize: 20,
        articleList:[{
          id:'21312',
          articleId:'',
          title:'程序员养发秘籍XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX123514726',
          subTitle:'多吃饭，多运动，然而没有什么用',
          authorId:'',
          authorName:'强仔',
          likeCount:852,
          readCount:8858,
          presentTime:'',
          url:'https://c2liantong.oss-cn-beijing.aliyuncs.com/12797375-239fdb759f575719.png'
        },
          {
            id:'21312',
            articleId:'',
            title:'程序员养发秘籍',
            subTitle:'多吃饭，多运动，然而没有什么用',
            authorId:'',
            authorName:'强强',
            likeCount:852,
            readCount:8858,
            presentTime:'',
            url:'https://c2liantong.oss-cn-beijing.aliyuncs.com/18652432-61146d3b3189d83b.jpg'
          },
          {
            id:'21312',
            articleId:'',
            title:'程序员养发秘籍',
            subTitle:'多吃饭，多运动，然而没有什么用',
            authorId:'',
            authorName:'强东',
            likeCount:852,
            readCount:8858,
            presentTime:'',
            url:'https://c2liantong.oss-cn-beijing.aliyuncs.com/330475-160H1163G490.jpg'
          },
          {
            id:'21312',
            articleId:'',
            title:'程序员养发秘籍',
            subTitle:'多吃饭，多运动，然而没有什么用',
            authorId:'',
            authorName:'强仔',
            likeCount:852,
            readCount:8858,
            presentTime:'',
            url:'http://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/background.jpg'
          },
          {
            id:'21312',
            articleId:'',
            title:'程序员养发秘籍',
            subTitle:'多吃饭，多运动，然而没有什么用',
            authorId:'',
            authorName:'强仔',
            likeCount:852,
            readCount:8858,
            presentTime:'',
            url:'https://c2liantong.oss-cn-beijing.aliyuncs.com/12797375-239fdb759f575719.png'
          }],
        // 当前选中模块
        selectNowKind:'dsj',
        // new or hot
        labelPosition: "new",
        // 搜索关键词
        searchInput: '',
        swiperData:[
          {
            headImg:"https://c2liantong.oss-cn-beijing.aliyuncs.com/18652432-61146d3b3189d83b.jpg",
            nickname:"强仔"
          },
          {
            headImg:"http://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/background.jpg",
            nickname:"强子"
          },
          {
            headImg:"\n" +
            "https://c2liantong.oss-cn-beijing.aliyuncs.com/12797375-239fdb759f575719.png",
            nickname:"强强"
          }
        ]
      }
    },
    computed: {
    },
    methods: {
      toReadPage:function(id){
        this.$router.push({path: '/readBBSPage', query: {id: id}})
      },
      labelChange:function(){
        this.openFullScreen();
      },
      orderScroll: function(){
        console.log("滚动")
      },
      scroll:function() {
        const el = document.querySelector('.main-right');
        const offsetHeight = el.offsetHeight;
        el.onscroll = () => {
          const scrollTop = el.scrollTop;
          const scrollHeight = el.scrollHeight;
          console.log("相减 " + ((offsetHeight + scrollTop) - scrollHeight))
          if ((offsetHeight + scrollTop) - scrollHeight >= -100) {
            if (this.articleLoading === true){
              return;
            }
            this.articleLoading = true;
            this.pageNum += 1;


            let requestPara = {
              "pageNum": this.pageNum,
              "pageSize":this.pageSize,
              "kind": this.selectNowKind,
              "label":this.labelPosition
            };
            setTimeout(() => {
              this.articleLoading = false;
              for (let i = 0; i < 5; i++) {
                this.articleList.push({
                  id:'21312',
                  articleId:'',
                  title:'程序员养发秘籍',
                  subTitle:'多吃饭，多运动，然而没有什么用',
                  authorId:'',
                  authorName:'强仔',
                  likeCount:852,
                  readCount:8858,
                  presentTime:'',
                  url:'https://c2liantong.oss-cn-beijing.aliyuncs.com/12797375-239fdb759f575719.png'
                });
              }
            }, 1000 + Math.random() * 150);
            //调用分页函数

          }
        }
      },

      getData:function(kind){
        if (this.selectNowKind === kind){
          return;
        }
        this.selectNowKind = kind;
        this.labelPosition = 'new';
        this.searchInput;
        this.openFullScreen();
        this.$message.success(this.selectNowKind + "   " + this.labelPosition +  "   " + this.searchInput);
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

    created: function () {
    },

    mounted() {
      this.openFullScreen();
      this.scroll();
      dropListOneGetApi("ugc_bbs_options").then(res => {
        if (res.code === 200) {
          this.ugc_bbs_options = res.data;
        } else {
          console.error("论坛类型下拉列表获取失败");
        }
      });
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
    margin-bottom: 20px;
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
    width: 60%;
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

  .top-article .swiper-container{
    width: 100%;
    height: 100%;
  }

  .main-right .list-article {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 500px;
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
    height: 40px;
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    border-bottom: 1px solid #eeeeee;
  }

  .main-right .list-article .list-item-title{
    width: 100%;
    height: 40px;
    min-height: 40px;
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

  .center{
    display: flex;
    justify-content: center;
    align-items: center;
  }

   .title{
    width: 50%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .author {
    width: 15%;
  }

  .readCount{
    width: 10%;
  }


  .presentTime{
    width: 25%;
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

  .title:hover{
    color: rgb(64,158,255);
  }

  .list-article .list-item .list-item-left .item-left-introduce{
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .list-article .list-item .list-item-left .item-left-other {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: flex-start;
    margin-top: 15px;
  }


  >>> .el-scrollbar{
    width: 100%;
    height: 593px;
  }

  >>> .el-scrollbar__view{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

</style>

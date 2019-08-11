<template>
  <section style="width:100%;height: 100%">
    <div style="display: flex;justify-content: flex-start;align-items: center;height: 100%;width: 100%;">

      <div class="left" style="position: fixed;top: 0;left: 0;width: 180px;height: 100%;background-color: rgb(84,92,100) ">
        <el-menu :default-active="this.$route.path"
                 style="width: 180px;"
                 class="el-menu-demo"
                 mode="vertical"
                 router
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#409EFF">
          <el-menu-item index="/blogPage" key="blogPage">
            <template slot="title">
              <i class="el-icon-arrow-left"></i>
              <span style="color: #ebb563">返回博客</span>
            </template>
          </el-menu-item>
          <el-menu-item v-if="accountManager" index="/accountManager" key="5d429edbbb9fe01c646d1fd7">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>账号管理</span>
            </template>
          </el-menu-item>
          <el-menu-item v-if="roleManager" index="/roleManager" key="5d4450bc910a3fdc04c7b1b6">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>角色管理</span>
            </template>
          </el-menu-item>
          <el-menu-item v-if="moduleManager" index="/moduleManager" key="5d44512d910a3fdc04c7b21d">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>模块管理</span>
            </template>
          </el-menu-item>
          <el-menu-item v-if="bbsManager" index="/bbsManager" key="5d445124910a3fdc04c7b216">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>论坛管理</span>
            </template>
          </el-menu-item>
          <el-menu-item v-if="blogManager" index="/blogManager" key="5d44511b910a3fdc04c7b209">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>博客管理</span>
            </template>
          </el-menu-item>
          <el-menu-item v-if="articleManager" index="/articleManager" key="5d445111910a3fdc04c7b1ff">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>文章管理</span>
            </template>
          </el-menu-item>
          <el-menu-item v-if="announcementManager" index="/announcementManager" key="5d445108910a3fdc04c7b1f7">
            <template slot="title">
              <i class="el-icon-bell"></i>
              <span>登录公告</span>
            </template>
          </el-menu-item>
          <el-menu-item v-if="reportManager" index="/reportManager" key="5d445100910a3fdc04c7b1f0">
            <template slot="title">
              <i class="el-icon-bell"></i>
              <span>举报处理</span>
            </template>
          </el-menu-item>
          <el-submenu index="/">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-if="userCount" index="/userCount" key="5d4450f7910a3fdc04c7b1e8" style="min-width: 180px">用户统计
              </el-menu-item>
              <el-menu-item v-if="blogCount" index="/blogCount" key="5d4450ec910a3fdc04c7b1e0" style="min-width: 180px">博客统计
              </el-menu-item>
              <el-menu-item v-if="articleCount" index="/articleCount" key="5d4450e1910a3fdc04c7b1d1" style="min-width: 180px">发帖统计
              </el-menu-item>
              <el-menu-item v-if="meetingCount" index="/meetingCount" key="5d4450d4910a3fdc04c7b1c7" style="min-width: 180px">会议统计
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </div>

      <div style="max-height:100%;height: 100%;overflow:hidden;width: calc(100% - 180px);margin-left:180px;">
        <transition name="el-zoom-in-top">
          <router-view style="height: 100%"></router-view>
        </transition>
      </div>

    </div>

  </section>
</template>

<script>

  import {
    changePWDAPI,
    checkCodeAPI,
    checkEmailAPI, companySignUpAPI, dropListOneGetApi,
    getCodeAPI, getUnReadNumAPI, personSignUpAPI,
    signInAPI,
    signOutAPI
  } from "../../api/api";
  import * as util from "../../common/utils/util"
  import store from "../../vuex/store"

  export default {
    "name": "managerIndex",
    data() {

      return {};
    },
    computed: {},
    methods: {
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

    beforeCreate: function () {

    },

    created: function () {
      if (!util.isEmpty(localStorage.getItem("token"))) {
        console.log("已经登录 ");
        this.isLogin = true;
        this.accountManager = this.contains(JSON.parse(localStorage.getItem("module")), "5d429edbbb9fe01c646d1fd7");
        this.roleManager = this.contains(JSON.parse(localStorage.getItem("module")), "5d4450bc910a3fdc04c7b1b6");
        this.moduleManager = this.contains(JSON.parse(localStorage.getItem("module")), "5d44512d910a3fdc04c7b21d");
        this.bbsManager = this.contains(JSON.parse(localStorage.getItem("module")), "5d445124910a3fdc04c7b216");
        this.blogManager = this.contains(JSON.parse(localStorage.getItem("module")), "5d44511b910a3fdc04c7b209");
        this.articleManager = this.contains(JSON.parse(localStorage.getItem("module")), "5d445111910a3fdc04c7b1ff");
        this.announcementManager = this.contains(JSON.parse(localStorage.getItem("module")), "5d445108910a3fdc04c7b1f7");
        this.reportManager = this.contains(JSON.parse(localStorage.getItem("module")), "5d445100910a3fdc04c7b1f0");
        this.userCount = this.contains(JSON.parse(localStorage.getItem("module")), "5d4450f7910a3fdc04c7b1e8");
        this.blogCount = this.contains(JSON.parse(localStorage.getItem("module")), "5d4450ec910a3fdc04c7b1e0");
        this.articleCount = this.contains(JSON.parse(localStorage.getItem("module")), "5d4450e1910a3fdc04c7b1d1");
        this.meetingCount = this.contains(JSON.parse(localStorage.getItem("module")), "5d4450d4910a3fdc04c7b1c7");

        this.$store.commit('setHeadImg', {name: 'stark', user: JSON.parse(localStorage.getItem("user"))});

      } else {
        console.log("还未登录 ");
      }
    },


    mounted() {

    }
  }

</script>
<style scoped>
  .el-container {
    width: 100%;
    height: 100%;
    max-width: 180px;
  }

  .page-left {
    /*padding: 0 9rem;*/
  }

  .el-menu-item, .el-submenu__title {
    height: 48px;
    line-height: 48px;
  }

</style>

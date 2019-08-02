<template>
  <section style="width:100%;height: 100%">
    <div style="display: flex;justify-content: flex-start;align-items: center;height: 100%;width: 100%">

      <el-container class="el-container page-left" style="background-color: rgb(238,238,238)">
        <el-menu :default-active="this.$route.path"
                 style="width: 180px"
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
          <el-menu-item index="/accountManager" key="accountManager">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>账号管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/roleManager" key="roleManager">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>角色管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/moduleManager" key="moduleManager">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>模块管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/bbsManager" key="bbsManager">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>论坛管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/blogManager" key="blogManager">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>博客管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/articleManager" key="articleManager">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>文章管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/announcementManager" key="announcementManager">
            <template slot="title">
              <i class="el-icon-bell"></i>
              <span>登录公告</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/reportManager" key="reportManager">
            <template slot="title">
              <i class="el-icon-bell"></i>
              <span>举报处理</span>
            </template>
          </el-menu-item>
          <el-submenu index="/" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group >
              <el-menu-item index="/userCount" key="userCount" style="min-width: 180px">用户统计</el-menu-item>
              <el-menu-item index="/blogCount" key="blogCount" style="min-width: 180px">博客统计</el-menu-item>
              <el-menu-item index="/articleCount" key="articleCount" style="min-width: 180px">发帖统计</el-menu-item>
              <el-menu-item index="/meetingCount" key="meetingCount" style="min-width: 180px">会议统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>


      </el-container>

      <div style="height: 100%;width: calc(100% - 180px)">
        <router-view  style="height: 100%"></router-view>
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
  } from "../api/api";
  import * as util from "../common/utils/util"
  import store from "../vuex/store"

  export default {
    "name":"managerIndex",
    data() {

      return {

      };
    },
    computed: {

    },
    methods: {


    },

    beforeCreate:function(){

    },

    created:function(){

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


</style>

<template>
  <section style="height: 100%" v-loading.fullscreen.lock="fullscreenLoading">
    <el-container class="el-container main-page" style="background-color: rgb(238,238,238)">
      博客

    </el-container>
  </section>
</template>

<script>

  import {
    changePWDAPI,
    checkCodeAPI,
    checkEmailAPI,
    getCodeAPI, getUnReadNumAPI,
    signInAPI,
    signOutAPI
  } from "../api/api";
  import * as util from "../common/utils/util"

  export default {
    "name":"blogPage",
    data() {
      return{
        fullscreenLoading:false
      }
    },
    computed: {


    },
    methods: {
      openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
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

      contains: function(arr, val) {
        console.log("调用比较函数 arr" + JSON.stringify(arr) + "      " + val + "   empty " + this.isEmpty(arr));
        if (this.isEmpty(arr)) {
          console.log("为空")
          return false;
        }
        return arr.indexOf(val) != -1 ? true : false;
      },

    },

    created:function(){

    },

    mounted() {
      this.openFullScreen();
    }
  }

</script>
<style scoped>
  .el-container {
    width: 100%;
    height: 100%;
    min-width: 1024px;
  }

  .main-page {
    /*padding: 0 9rem;*/
  }
</style>

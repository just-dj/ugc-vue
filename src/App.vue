<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>


<style>

  html, body {
    height: 100%;
    width: 100%;
    font-size: 16px;
  }

  #app {
    width: 100%;
    height: 100%;
    /*color: #2c3e50;*/
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 100%;
  }

  .el-dialog{
    border-radius: 8px;
  }


  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }

  .global_toolbar{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }


  /*表头类*/
  #app .global_table_th{
    color: #333333;
    font-size: 1rem;
    font-weight: unset;
  }

  #app .global_table_tr{
    height: 3.125rem;
    line-height: 3.125rem;
  }

  #app .global_table_normal{
    font-size: 0.875rem;
    color: #666666;
    width: 6.25rem;
    padding: 0;
  }

  /*行颜色 以及高度等*/
  #app .el-table th{
    background-color: #eeeeee;
    height: 3.125rem;
    line-height: 3.125rem;
    padding: 0;
  }

  /*条纹颜色*/
  #app .el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: #eeeeee;
  }

  #app .el-scrollbar__wrap {
    max-height: 43rem;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-right: 0px;
  }


</style>

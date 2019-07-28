<template>
  <section style="height: 100%">
    <div style="width: 100%;height: 100%;display: flex;justify-content: flex-start">
      <div class="job-type-left" style="width: 40%;height: 100%;">

        <el-tree
          :data="dataList"
          node-key="id"
          accordion
          @node-click="handleNodeClick">
        </el-tree>

      </div>
      <div class="job-type-right" style="width: 60%;height: 100%">

        <el-input v-model="selectNode.label" style=""></el-input>

        <div style="margin-top: 100px">
          <el-button @click="addItem">新增</el-button>
          <el-button @click="updateItem">修改</el-button>
          <el-button @click="deleteItem" type="danger">删除</el-button>
        </div>
      </div>

    </div>
  </section>
</template>

<script>

  import * as util from "../common/utils/util"
  import store from "../vuex/store"
  import {VueEditor} from 'vue2-editor'
  import {addJobTypeAPI, deleteJobTypeAPI, getJobTypeAPI, updateJobAPI, updateJobTypeAPI} from "../api/job";

    export default {
      name: "jobTypeManagerPage",
      data() {
          return {
            dataList:[],
            checkedList:[],
            selectNode:{
              "label":'',
              "value":'',
            },
            node:{

            }
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
        handleNodeClick(data) {
          this.node = data;
          this.selectNode = JSON.parse(JSON.stringify(data));
        },
        deleteItem:function () {
          if (!util.isEmpty(this.selectNode.value)){
            deleteJobTypeAPI(this.selectNode.value).then(res =>{
               if (res.code === 200){
                 this.$message.success("删除成功");
                 this.getData();
                 this.selectNode = {};
               }else if (res.code === 2) {
                 this.$store.commit('signInDialogVisibleTrue');
               } else {
                 this.$message.error(res.msg)
               }
            })
          }
        },

        addItem: function(){
          if (!util.isEmpty(this.selectNode.value)){
            let temp = {
              id:'',
              name:''
            };
            temp.id = this.selectNode.value;
            temp.name = this.selectNode.label;
            addJobTypeAPI(temp).then(res =>{
              if (res.code === 200){
                this.$message.success("新增成功");
                this.node.label = this.selectNode.label;
                this.getData();
                this.selectNode = {};
              }else if (res.code === 2) {
                this.$store.commit('signInDialogVisibleTrue');
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        },

        updateItem: function () {
          console.log(123)
          if (!util.isEmpty(this.selectNode.value)){
            let temp = {
              id:'',
              name:''
            };
            temp.id = this.selectNode.value;
            temp.name = this.selectNode.label;
            updateJobTypeAPI(temp).then(res =>{
              if (res.code === 200){
                this.$message.success("修改成功");
                this.node.label = this.selectNode.label;
                  // this.selectNode = {};
              }else if (res.code === 2) {
                this.$store.commit('signInDialogVisibleTrue');
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        },
        getData: function () {
          getJobTypeAPI("").then(res => {
            if (res.code === 200){
              if (!util.isEmpty(res.data)){
                this.dataList = res.data;
              }
            }else if (res.code === 2) {
              this.$store.commit('signInDialogVisibleTrue');
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      },
      mounted(){

        this.getData();

      }


    }
</script>

<style scoped>

</style>

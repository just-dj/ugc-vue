<template>
  <section style="width: 100%;height: 100%;">
    <!--搜索条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;background-color: #fff">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="根据用户名查找" v-model="filter.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="根据邮箱查找" v-model="filter.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select  v-model="filter.userRoleId" placeholder="根据用户角色查询" style="width: 25rem">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" icon="el-icon-plus" title="新增" @click="addAccount"></el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button @click="clearFilter" type="success">重置</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button @click="this.query" type="primary" icon="el-icon-search" title="查询"></el-button>
        </el-form-item>
      </el-form>

    </el-col>

    <el-table
      :data="userList"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sex === "0"? "男":"女" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        wideth="150">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="身份标签"
        wideth="200">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.label" style="margin-right: 10px">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="经验值"
        wideth="50">
      </el-table-column>
      <el-table-column
        prop="lastLoginTime"
        label="上次登录时间"
        sortable
        wideth="50">
        <template slot-scope="scope">
          {{formatTime(scope.row.lastLoginTime)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="rootControl"
        label="当前角色"
        wideth="50">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.roleId">{{getRoleName(item)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="userStaus"
        label="启用/停用"
        wideth="35">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.userStatus"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block" align="center">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="filter.pageNum"
        :page-size="filter.pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog title="编辑用户" :visible.sync="dialogVisible"
               center
               width="31%"
               :close-on-click-modal="false">
      <el-form :model="formData"
               label-width="6.25rem"
               label-position="left">
        <el-form-item label="标签" prop="email">
          <el-select
            style="width: 100%"
            v-model="selectNow.label"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入标签">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="password" v-if="update">
          <el-select style="width: 100%"
            v-model="selectNow.roleId" multiple placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" center="true">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import {getAllRoleApi, getUserPageAPI, updateUserAPI} from "../../api/api";
  import * as util from "../../common/utils/util";

  export default {
    components: {ElFormItem},
    name: "accountManager",
    data() {
      return {
        isLogin:false,
        selectNow:{},
        options:[],
        dialogVisible:false,
        userList: [],
        roleList: [],
        stateValue: true,
        filter: {
          pageSize: 8,
          pageNum: 1,
          name: '',
          email: '',
          userRoleId: ''
        },
        total: 0,
        formData:{},
        update:false
      }

    },

    methods: {

      handleEdit:function(index,row){
        this.dialogVisible = true;
        this.selectNow = JSON.parse(JSON.stringify(row));
      },

      saveUser:function(){

        updateUserAPI(this.selectNow).then(res => {
           if (res.code === 200){
             this.$message.success("修改成功");
             this.selectNow = {};
             this.dialogVisible = false;
             this.getPageData();
           }else if (res.code === 2) {
             this.$store.commit('signInDialogVisibleTrue');
           } else {
             this.$message.error(res.msg)
           }
        })
      },

      getLabel:function(list){
        return list.toString();
      },

      getRoleName:function(id){
        let temp = "";
        this.roleList.forEach(a => {
          if (a.id === id){
            temp = a.name;
          }
        });
        return temp;
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
      },

      query: function () {
        this.getPageData();
      },

      getPageData: function () {

        let temp = JSON.parse(JSON.stringify(this.filter));
        temp.pageNum -= 1;
        getUserPageAPI(temp).then(res => {
          if (res.code === 200) {
            if (!util.isEmpty(res.data)) {
              this.userList = res.data.content;
              this.total = res.data.totalElements;
            }
          } else if (res.code === 2) {
            this.$store.commit('signInDialogVisibleTrue');
            this.$router.push({path: '/blogPage',query: {isError: true}});
          } else {
            this.$message.error(res.msg)
          }
        })


      },

      clearFilter: function () {
        this.filter = {
          pageSize: 8,
          pageNum: 1,
          name: '',
          email: '',
          userRoleId: ''

        };
        this.getPageData();
      },

      handleCurrentChange: function (index) {
        console.log(index)
        this.getPageData();
      },


      getAllRole: function () {
        getAllRoleApi("").then(res => {
          if (res.code === 200) {
            if (!util.isEmpty(res.data)) {
              this.roleList = res.data;
            }
          } else if (res.code === 2) {
            this.$store.commit('signInDialogVisibleTrue');
          } else {
            this.$message.error(res.msg)
          }
        });
      },

      addAccount() {

      },
      contains: function (arr, val) {
        if (this.isEmpty(arr)) {
          console.log("为空")
          return false;
        }
        return arr.indexOf(val) != -1 ? true : false;
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
      }
    },
    created(){
      if (!this.isEmpty(localStorage.getItem("token"))) {
        console.log("已经登录 ");
        this.isLogin = true;
        this.update = this.contains(JSON.parse(localStorage.getItem("permission")), "5d429edbbb9fe01c646d1fd7_4");
      } else {
        console.log("还未登录 ");
      }
    },

    mounted() {
      this.getAllRole();
      this.getPageData();
    }
    ,

  }
</script>

<style scoped>
  .block {
    position: absolute;
    top: 700px;
    right: 20px;
  }

  .toolbar {
    background: #708090;
    padding: 20px;
    margin: 5px 0;
  }

  .overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }

  /*>>> .demo-form-inline   div .el-form-itemlabel{*/
  /*align-items: right;*/
  /*}*/
</style>

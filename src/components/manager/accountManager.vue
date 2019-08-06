<template>
    <section style="width: 100%;height: 100%;">
      <!--搜索条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input placeholder="请输入工号" v-model="searchByUserID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入电话号码" v-model="searchByTel"></el-input>
          </el-form-item>
          <el-form-item style="float: right;">
            <el-button type="primary" icon="el-icon-plus" title="新增" @click="addAccount"></el-button>
          </el-form-item>
          <el-form-item style="float: right;">
            <el-button type="primary" icon="el-icon-search" title="查询"></el-button>
          </el-form-item>
        </el-form>

      </el-col>

      <el-table
        :data="accountData"
        border
        style="width: 100%">
        <el-table-column
          prop="userID"
          label="工号"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="100">
        </el-table-column>
        <el-table-column
          prop="Tel"
          label="联系电话"
          wideth="150">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="身份标签"
          wideth="200">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.tag}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="expValue"
          label="经验值"
          wideth="50">
        </el-table-column>
        <el-table-column
          prop="lastLoginTime"
          label="上次登录时间"
          sortable
          wideth="50">
        </el-table-column>
        <el-table-column
          prop="infoUpdate"
          label="信息修改"
          wideth="50">
        </el-table-column>
        <el-table-column
          prop="rootControl"
          label="权限控制"
          wideth="50">
        </el-table-column>
        <el-table-column
          prop="accountState"
          label="启用/停用"
          wideth="50">
          <template slot-scope="scope">
            <el-switch
              v-model="stateValue"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>

      </el-table>

      <!--分页-->
      <div class="block" align="center" >
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </section>
</template>

<script>
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
    export default {
      components: {ElFormItem},
      data(){
        return{
          stateValue: true,
          currentPage3: "",
          handleSizeChange: "",
          handleCurrentChange: "",
          searchByUserID: "",
          searchByTel: "",

          accountData: [{
            userID: "000001",
            sex: "男",
            Tel: "18205234545",
            tag: "技术大牛",
            expValue: "2000000",
            lastLoginTime: "2015-05-30 17:30"
          }]
        }

      },

      methods:{
        addAccount(){

        }
      },
      name: "accountManager"
    }
</script>

<style scoped>
  .block{
    position: absolute;
    top: 700px;
    right: 20px;
  }

  .toolbar {
    background: #708090;
    padding: 20px;
    margin: 5px 0;
  }

  .overflow{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }


  /*>>> .demo-form-inline   div .el-form-itemlabel{*/
        /*align-items: right;*/
  /*}*/
</style>

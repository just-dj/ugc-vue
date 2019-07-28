<template>
  <section>
    <!--<div v-if="sele">-->
    <div style="width: 100%;height: 100%;position: relative;">
      <!--工具条-->
      <div style="width: 100%;" class="global_toolbar">
        <el-form :inline="true"  ref="filter" :model="this.filter">

          <el-form-item>
            <el-button v-if="add" type="primary" icon="el-icon-plus"
                       @click="add('other')">
              <span class="toolbar_device_add">新增</span>
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-input v-model="filter.name" placeholder="用户名" style="width: 14rem">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="filter.email" placeholder="邮箱" style="width: 14rem">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-select v-model="filter.userType" placeholder="用户类型" style="width: 14rem">
              <el-option
                v-for="item in userTypeList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="filter.userStatus" placeholder="用户状态" style="width: 14rem">
              <el-option
                v-for="item in userStatusList"
                :label="item.label"
                :value="parseInt(item.value)">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-search" @click.native="query" >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click.native="resetFilters">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--table-->
      <div style="position: relative">
        <!--列表-->
        <el-table :data="userList"
                  stripe
                  highlight-current-row
                  v-loading="listLoading"
                  :header-row-class-name="'global_table_th'"
                  :row-class-name="'global_table_tr'"
                  :cell-class-name="'global_table_normal'"
                  style="width: 100%;position: absolute;top: 0;left: 0">
          <el-table-column prop="name" label="用户名" min-width="30" align="center">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="sex" label="性别" min-width="60" :formatter="formatUserSex" align="center">
          </el-table-column>
          <el-table-column prop="creditRating" label="信誉分" min-width="60" align="center">
          </el-table-column>
          <el-table-column prop="type" label="用户类型" min-width="80" :formatter="formatUserType" align="center">
          </el-table-column>
          <el-table-column prop="userStatus" label="用户状态" min-width="80" align="center">
            <template scope="scope">
              <el-tag v-if="scope.row.userStatus === 0" type="warning">账号停用</el-tag>
              <el-tag v-if="scope.row.userStatus === 2" type="success">帐号正常</el-tag>
              <el-tag v-if="scope.row.userStatus === 4" type="danger">未认证账户</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140" align="center">
            <template scope="scope">
              <el-tooltip  class="item" effect="dark" content="修改用户状态" placement="top">
                <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip  class="item" effect="dark" content="删除" placement="top">
                <el-button size="mini" type="text" icon="el-icon-delete"  @click="handleDel(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip  class="item" effect="dark" content="聊一聊" placement="top">
                <el-button size="mini" type="text" icon="el-icon-message"  @click="toChatPage(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip  class="item" effect="dark" content="查看公司信息" placement="top" v-if="scope.row.type === 1">
                <el-button size="mini" type="text" icon="el-icon-view"  @click="getCompanyInfo(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <!--<el-tooltip  class="item" effect="dark" content="查看浏览分类" placement="top">-->
                <!--<el-button size="mini" type="text" icon="el-icon-view"  @click="handleDel(scope.$index, scope.row)"></el-button>-->
              <!--</el-tooltip>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div :span="24" class="toolbar" style="position: absolute;right: 0;bottom: 10px">
        <el-pagination style="float:right;"
          @current-change="handleCurrentChange"
          :current-page="filter.currentPage"
          :page-size="filter.pageSize"
          layout="total,  prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <!--公司信息弹出框-->
    <el-dialog
      title="用户公司信息"
      width="70%"
      center
      :close-on-press-escape="true"
      :visible.sync="companyEditFormVisible"
      :close-on-click-modal="false">

      <el-form :model="companyEditForm"
               label-width="7rem"
               disabled
               ref="companyEditForm">

        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="companyName">
              <el-input v-model="companyEditForm.companyName" autocomplete="off" style="width: 25rem"
                        placeholder="请输入公司名称"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司类型" prop="companyType">
              <el-select v-model="companyEditForm.companyType"
                         placeholder="请选择公司类型" style="width: 25rem">
                <el-option
                  v-for="item in companyTypeOptions"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

          <el-col :span="12">
            <el-form-item label="成立日期" prop="companyCreateTime">
              <el-date-picker
                style="width: 25rem"
                v-model="companyEditForm.companyCreateTime"
                type="date"
                placeholder="请选择成立日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册资本" prop="registeredCapital">
              <el-input-number v-model="companyEditForm.registeredCapital" :precision="0" :min="1" :max="1000000" :step="1"
                               label="请输入招聘人数" style="width: 25rem"></el-input-number>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="经营范围" prop="businessScope">
              <el-input v-model="companyEditForm.businessScope" autocomplete="off" style="width: 25rem"
                        placeholder="请输入经营范围"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="companyEditForm.contact" autocomplete="off" style="width: 25rem"
                        placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>



        <el-row>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="contactPhone">
              <el-input v-model="companyEditForm.contactPhone" autocomplete="off" style="width: 25rem"
                        placeholder="请输入联系方式"></el-input>

            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item label="公司地址" prop="address">
              <el-input v-model="companyEditForm.address" autocomplete="off" style="width: 64.125rem"
                        placeholder="请输入公司地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="公司介绍" prop="companyIntroduce">
            <el-card shadow="hover" style="width: 60.625rem;margin-left: 1.875rem">
              <div class="online-resume-detail" v-html="companyEditForm.companyIntroduce">

              </div>
            </el-card>
          </el-form-item>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="companyEditFormVisible = false">确定</el-button>
      </div>
    </el-dialog>

    <!--修改用户状态-->
    <el-dialog
      title="编辑用户状态"
      width="50%"
      center
      :close-on-press-escape="true"
      :visible.sync="editFormVisible"
      :close-on-click-modal="false">

      <el-form :model="selectUser"
               label-width="7rem"
               ref="selectUser">

        <el-row>
          <el-col :span="12">
            <el-form-item label="账户状态" prop="companyType">
              <el-select v-model="selectUser.userStatus"
                         placeholder="请选择账户状态" style="width: 25rem">
                <el-option
                  v-for="item in userStatusList"
                  :label="item.label"
                  :value="parseInt(item.value)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editUserStatus">提交</el-button>
      </div>
    </el-dialog>
    <!--</div>-->
    <!--<div v-else>-->
    <!--<center><h2>亲爱的用户,您暂时没有权限查看哦.</h2></center>-->
    <!--</div>-->
  </section>
</template>

<script>
  import {deleteUserAPI, dropListOneGetApi, getCompanyAPI, updateUserAPI, userPageFindAPI} from "../api/job";
  import store from "../vuex/store"
  import * as util from "../common/utils/util"

  export default {
    name: "usermanagerpage",
    data() {

      return {
        selectUser:{},
        companyTypeOptions:[],
        companyEditForm: {
          companyType: '',
          companyName: '',
          companyCreateTime: '',
          registeredCapital: 0,
          businessScope:'',
          contact:'',
          contactPhone:'',
          address:'',
          companyIntroduce:'',
          responseRate:'',
          processingSpeed:''
        },
        companyEditFormVisible: false,
        filter: {
          name: "",
          email: "",
          userType: "",
          userStatus: "",
          pageNum:0,
          pageSize:10
        },
        userList: [],
        total:0,
        userTypeList:[],
        userStatusList:[],

        editForm: {
          id: '',
          userId: '',
          time: '',
          content: ''
        },
        editFormRules: {
          userId: [{required: true, message: '请选择执行维护人', trigger: 'blur'}],
          time: [{required: true, message: '请选择执行维护时间', trigger: 'blur'}],
          content: [{required: true, message: '请填写维护内容', trigger: 'blur'}],
        },
        editFormVisible: false,

        loading: false,
        editFormLoading: false,
        listLoading: false,

        maintenance: [],
        total: 0,
        page: 1,
        device_options: [],
        users_options: [],
        editForm_users_options: [],
        lunarData: [],
      }

    },
    methods: {
      editUserStatus:function(){

        if (!util.isEmpty(this.selectUser)){
          updateUserAPI(this.selectUser).then(res =>{
             if (res.code === 200){
               this.editFormVisible = false;
               this.$message.success("修改成功");
                this.query();
             }else if (res.code === 2) {
               this.$store.commit('signInDialogVisibleTrue');
             } else {
               this.$message.error(res.msg)
             }
          })
        }

      },


      getCompanyInfo: function(index,row){
        this.companyEditFormVisible = true;
        console.log("获取公司信息" + JSON.stringify(row));
        getCompanyAPI(row.companyId).then(res => {
          if (res.code === 200){
            if (!util.isEmpty(res.data)) {
              this.companyEditForm = res.data;
            }
          } else {
            console.log("获取公司信息失败");
          }
        });
      },
      toChatPage:function(index,row){
        this.$router.push({path: '/messagePage/', query: {id: row.id}});
      },
      resetFilters: function(){
        this.filter = {
          name: "",
          email: "",
          userType: "",
          userStatus: "",
          pageNum:0,
          pageSize:10
        };
        this.query();
      },
      add: function () {

      },
      //处理页面跳转事件
      handleCurrentChange: function (val) {
        this.filter.pageNum = val - 1;
        this.query();
      },
      query: function () {
        console.log("分页请求");
        userPageFindAPI(this.filter).then(res => {
          if (res.code === 200){
            this.userList = res.data.content;
            this.total = res.data.totalElements;
          } else {
            if (res.code === 2){
              this.$store.commit('signInDialogVisibleTrue');
            }
            this.$message.error(res.msg);
          }
        }).catch(e => {
          console.log("出错了" + e);
        });

      },
      //todo 编辑
      handleEdit: function (index,row) {
          this.selectUser = JSON.parse(JSON.stringify(row));
          this.editFormVisible = true;
      },

      handleDel: function (scop,row) {

        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUserAPI(row.id).then(res => {
            if (res.code === 200){
              this.query();
              this.$message.success("删除成功");
            } else {
              if (res.code === 2){
                this.$store.commit('signInDialogVisibleTrue');
              }
              this.$message.error(res.msg);
            }
          })
        }).catch(() => {
        });

      },

      formatUserType: function (row, column) {
        if (row.type === 0){
          return "普通用户";
        } else if (row.type === 1) {
          return "企业用户";
        }else {
          return "";
        }
      },

      formatUserSex: function (row, column) {
        if (row.sex === "0"){
          return "男";
        } else if (row.sex === "1") {
          return "女";
        }else {
          return "";
        }
      }
    },
    mounted(){

      dropListOneGetApi("user_type").then(res => {
        if (res.code === 200){
          this.userTypeList = res.data;
        } else {
          this.$message.error("用户类型下拉列表获取失败");
        }
      });

      dropListOneGetApi("user_status").then(res => {
        if (res.code === 200){
          this.userStatusList = res.data;
        } else {
          this.$message.error("用户类型下拉列表获取失败");
        }
      });

      dropListOneGetApi("company_type").then((res) => {
        if (res.code === 200) {
          this.companyTypeOptions = res.data;
        } else {
          this.$message.err("获取公司类型下拉列表失败" + res.msg);
        }
      });


      this.query();
    }
  }
</script>

<style scoped>
  >>> .online-resume-detail p{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
  }
</style>

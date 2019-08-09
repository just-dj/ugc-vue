<!--角色管理-->
<template>
  <section style="width: 100%;height: 100%">
    <div class="role-main">

      <div class="role-left">
        <el-row class="tac" style="width: 100%;height: 100%">
          <el-col :span="24">
            <el-menu
              default-active="1">
              <el-menu-item @click="menuClick(item)"  :disabled="! item.editAble" v-for="(item,index) in roleList" :index="index + ''">
                <i class="el-icon-menu"></i>`
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
              <!--<el-menu-item index="2" disabled>-->
              <!--<i class="el-icon-document"></i>-->
              <!--<span slot="title">超级管理员</span>-->
              <!--</el-menu-item>-->
            </el-menu>
          </el-col>
        </el-row>
      </div>

      <div class="role-right" style="">
        <el-form style="width: 70%;"
                 :model="formData"
                 label-width="6.25rem"
                 label-position="left">
          <el-form-item label="角色名" prop="name">
            <el-input v-model="formData.name" autocomplete="off" placeholder="请输入角色名"></el-input>
          </el-form-item>
          <el-form-item label="角色编码" prop="code">
            <el-input v-model="formData.code" autocomplete="off" placeholder="请输入角色编码"></el-input>
          </el-form-item>
          <el-form-item label="角色备注" prop="desc">
            <el-input type="textarea"
                      :rows="2"
                      v-model="formData.desc" autocomplete="off" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="dialogVisible = true">修改权限</el-button>
        <el-button @click="edit" type="primary">修改</el-button>
        <el-button type="danger">删除</el-button>
        <el-button @click="addRole" type="success">新增</el-button>
      </div>


      <el-dialog title="修改角色权限" :visible.sync="dialogVisible"
                 center
                 @opened="setCheckedKey"
                 width="31%"
                 :close-on-click-modal="false">
        <el-tree
          @check-change="checkChange"
          ref="tree"

          :data="data"
          show-checkbox
          node-key="id"
          :default-checked-keys="[5]"
          :props="defaultProps">
        </el-tree>

        <div slot="footer" class="dialog-footer" center="true">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="savePermission">确 定</el-button>
        </div>
      </el-dialog>


    </div>
  </section>
</template>

<script>
  import {addRoleApi, editRoleApi, getAllRoleApi, getModuleTreeApi} from "../../api/api";
  import * as util from "../../common/utils/util";
  import {isEmpty} from "../../common/utils/util";

  export default {
    name: "roleManager",
    data() {
      return {
        dialogVisible: false,
        formData: {
          name: '',
          code: '',
          desc: '',
          moduleIdList: [],
          modulePermission: [],
          editAble: true
        },
        selectNowMenu:{},
        roleList: [],
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          value: 'id'
        },
        checkedKeys:[],
        middleModule:[],
        middlePermission:[]
      }
    },
    methods: {

      /**
       * 树选中状态改变
       */
      checkChange:function(){
        this.middlePermission = JSON.parse(JSON.stringify(this.$refs.tree.getCheckedKeys()));
        let set = new Set();
        if (!isEmpty(this.middlePermission)){
          this.middlePermission.forEach(a => {
            set.add(a.toString().substring(0,24));
          })
        }
        this.middleModule = [];
        this.middleModule = [...set];
        if (this.middleModule.length > 3){
          this.middleModule.push("5d429e79bb9fe01c646d1fd6");
        }
      },

      edit: function(){
        editRoleApi(this.formData).then(res => {
          if (res.code === 200){
            this.$message.success("修改成功");
            this.formData =  {
              name: '',
              code: '',
              desc: '',
              moduleIdList: [],
              modulePermission: [],
              editAble: true
            };
            this.getAllRole();
          }else if (res.code === 2) {
            this.$store.commit('signInDialogVisibleTrue');
          } else {
            this.$message.error(res.msg)
          }
        })
      },

      addRole:function(){
        addRoleApi(this.formData).then(res => {
           if (res.code === 200){
             this.$message.success("新增成功");
             this.formData =  {
               name: '',
               code: '',
               desc: '',
               moduleIdList: [],
               modulePermission: [],
               editAble: true
             };
             this.getAllRole();
           }else if (res.code === 2) {
             this.$store.commit('signInDialogVisibleTrue');
           } else {
             this.$message.error(res.msg)
           }
        })
      },

      /**
       * 默认选中节点
       */
      setCheckedKey() {
        if (!isEmpty(this.selectNowMenu)){
          this.$refs.tree.setCheckedKeys(this.checkedKeys);
        }
      },

      menuClick: function (item) {
        this.formData = JSON.parse(JSON.stringify(item));
        this.selectNowMenu = this.formData; //没什么用
        this.checkedKeys = [...this.formData.modulePermission]; //当前选中的节点
      },

      savePermission: function () {
        this.formData.moduleIdList = this.middleModule;
        this.formData.modulePermission = this.middlePermission;
        this.dialogVisible = false;
      },
      getAllRole:function () {
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
      }

    },
    mounted() {

      this.getAllRole();

      getModuleTreeApi("").then(res => {
        if (res.code === 200) {
          if (!util.isEmpty(res.data)) {
            this.data = res.data;
          }
        } else if (res.code === 2) {
          this.$store.commit('signInDialogVisibleTrue');
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
</script>

<style scoped>

  .role-main {
    padding-top: 25px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .role-main .role-left {
    width: 15%;
    height: 100%;
  }

  .role-main .role-right {
    width: 85%;
    height: 100%;
    padding-left: 25px;
  }

</style>

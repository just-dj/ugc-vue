<!--角色管理-->
<template>
  <section style="width: 100%;height: 100%">
    <!--    <el-row :gutter="20">-->
    <!--      <el-col :span="4" :offset="4">-->
    <!--        <el-menu-->
    <!--          default-active="2"-->
    <!--          class="el-menu-vertical-demo"-->
    <!--          @open="handleOpen"-->
    <!--          @close="handleClose">-->
    <!--          <el-menu-item index="1">-->
    <!--            <i class="el-icon-menu"></i>-->
    <!--            <span slot="title">内容管理员</span>-->
    <!--          </el-menu-item>-->
    <!--          <el-menu-item index="2">-->
    <!--            <i class="el-icon-menu"></i>-->
    <!--            <span slot="title">数据管理员</span>-->
    <!--          </el-menu-item>-->
    <!--          <el-menu-item index="3">-->
    <!--            <i class="el-icon-menu"></i>-->
    <!--            <span slot="title">2333管理员</span>-->
    <!--          </el-menu-item>-->
    <!--          <el-menu-item index="4">-->
    <!--            <i class="el-icon-menu"></i>-->
    <!--            <span slot="title">阿斯弗i哦i哦的</span>-->
    <!--          </el-menu-item>-->
    <!--        </el-menu>-->
    <!--      </el-col>-->
    <!--      <el-col :span="10">-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <el-row>
      <el-col>
        <el-tabs :tab-position="tabPosition" style="height: 200px;">

          <el-tab-pane label="新增角色">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="角色名" required>
                <el-input v-model="form.roleName"></el-input>
              </el-form-item>
              <el-form-item label="角色编码" required>
                <el-input v-model="form.roleCode"></el-input>
              </el-form-item>
              <el-form-item label="角色备注" required>
                <el-input type="textarea" v-model="form.roleDesc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="仓库管理员">
            仓库管理员
          </el-tab-pane>
          <el-tab-pane label="233管理员">
            233管理员
          </el-tab-pane>
          <el-tab-pane label="萨的方法简介">
            萨的方法简介
          </el-tab-pane>
          <el-tab-pane label="内容管理员">
            萨的方法简介
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </section>
</template>

<script>
    export default {
        name: "roleManager",
        data() {
            return {
                tabPosition: 'left',
                form: {
                    roleName: '',//角色名
                    roleCode: '',//角色编码
                    roleDesc: '',//角色备注
                }
            }
        },
    }
</script>

<style scoped>

</style>

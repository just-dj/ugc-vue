<template>
  <section style="height: 100%">
    <el-container class="el-container main-page" style="background-color: rgb(238,238,238)">
      <el-header style="position: relative;background-color: #545c64;padding: 0 9rem;">
        <div class="home-log" style="background-color: #545c64;color: #fff;box-sizing: border-box;">
          UGC
          <!--<span style="font-size: 1rem;margin-left: 10px;color: #ffffff" @click="cityDialogVisible = true">-->
          <!--<i class="el-icon-location-outline"></i>-->
          <!--北京-->
          <!--</span>-->
        </div>
        <el-menu :default-active="this.$route.path"
                 class="el-menu-demo"
                 mode="horizontal"
                 router
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#409EFF"
                 @select="handleSelect">
          <el-menu-item index="/blogPage" key="1">博客</el-menu-item>
          <el-menu-item index="/bbsPage" key="2">论坛</el-menu-item>
          <el-menu-item index="/meetingPage" key="3">会议纪要</el-menu-item>
          <el-menu-item index="/accountManager" key="4" v-if="managerIndex">系统管理</el-menu-item>
        </el-menu>

        <div class="main-signIn">
          <el-button type="text" style="color: #fff" @click="signInDialogVisible = true" v-show="!isLogin">登录</el-button>

          <el-dropdown v-show="isLogin">
            <div style="display: flex;justify-content: flex-end;align-items: center">
                <span style="color: #fff;margin-right: 10px">
                  {{this.user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              <img v-show="isEmpty(user.headImg)"
                   src="https://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/default_header_img.png"
                   style="width: 45px;height: 45px"/>
              <img v-show="!isEmpty(user.headImg)" :src="user.headImg"
                   style="width: 45px;height: 45px;border-radius: 50%"/>
            </div>

            <el-dropdown-menu slot="dropdown">
              <router-link to="/personCenter">
                <el-dropdown-item style="text-align: center">个人中心</el-dropdown-item>
              </router-link>
              <!--<el-dropdown-item>修改资料</el-dropdown-item>-->
              <el-dropdown-item @click.native="updatePasswordVisible = true">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="signOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main style="margin: 15px 8.1rem 15px 8.1rem;padding: 10px 0.9rem 10px 0.9rem;background-color: #cccccc">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" style="height: 100%"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" style="height: 100%"></router-view>
      </el-main>

      <!--修改密码弹窗-->
      <el-dialog title="修改密码" :visible.sync="updatePasswordVisible"
                 center
                 width="31%"
                 :close-on-click-modal="false">
        <el-form :model="changePwdForm" :rules="changePwdFormRules"
                 label-width="6.25rem"
                 label-position="left">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input type="password" v-model="changePwdForm.oldPassword" autocomplete="off"
                      placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="changePwdForm.newPassword" autocomplete="off"
                      placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="repeatPassword">
            <el-input type="password" v-model="changePwdForm.repeatPassword" autocomplete="off"
                      placeholder="请重复密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center="true">
          <el-button @click="updatePasswordVisible = false">取 消</el-button>
          <el-button type="primary" @click="changePWD">确 定</el-button>
        </div>
      </el-dialog>

      <!--登录弹窗-->
      <el-dialog title="登录" :visible.sync="signInDialogVisible"
                 center
                 width="31%"
                 :close-on-click-modal="false"
                 @open="signInDialogOpen">
        <el-form :model="signInForm" :rules="signInRules"
                 label-width="6.25rem"
                 label-position="left">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="signInForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="signInForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" center="true">
          <el-button @click="signInDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="signIn">确 定</el-button>
        </div>
      </el-dialog>

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
    data() {

      const validateEmail = (rule, value, callback) => {
        let checkEmail = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        let email = value;
        if (util.isEmpty(email)) {
          callback(new Error('请输入邮箱'));
        } else {
          if (util.checkStr(email, "email")) {

            checkEmailAPI(email).then((res) => {
              if (res.data === true) { //被占用
                //添加成功
                callback(new Error('邮箱已被占用'));
              } else {
                callback();
              }
            });
          } else {
            callback(new Error('邮箱格式不正确'));
          }
        }
      };

      const validateCode = (rule, value, callback) => {
        if (util.isEmpty(value)) {
          callback(new Error('请输入验证码'));
        } else {
          let email = "";
          if (this.labelPosition === "person") {
            email = this.signUpFormPerson.email;
          } else {
            email = this.signUpFormCompany.email;
          }
          checkCodeAPI({"email": email, "code": value}).then(res => {
            if (res.code === 200) {
              if (res.data === true) {
                callback();
              } else {
                callback(new Error('验证码错误'));
              }
            } else {
              callback(new Error('验证码错误'));
              this.$message.error(res.msg)
            }
          })

        }
      };

      const validatePassword = (rule, value, callback) => {
        if (util.isEmpty(value)) {
          callback(new Error('请输入密码'));
        } else {
          if (value.length >= 6 && value.length <= 18) {
            if (this.signUpDialogVisible !== true){
              if (this.changePwdForm.newPassword === this.changePwdForm.oldPassword) {
                callback(new Error('新旧密码不能相同'));
              }
            }
            callback();
          } else {
            callback(new Error('密码为6-18位字符串'));
          }
        }
      };

      const validateRepPassword = (rule, value, callback) => {
        let temp = "";
        if (this.labelPosition === "person") {
          temp = this.signUpFormPerson.password;
        } else {
          temp = this.signUpFormCompany.password;
        }
        if (temp === value) {
          callback();
        } else {
          callback(new Error('两次输入的密码不相同'));
        }
      };

      const validateRepPwd = (rule, value, callback) => {
        let temp = this.changePwdForm.newPassword;
        if (temp === value) {
          callback();
        } else {
          callback(new Error('两次输入的密码不相同'));
        }
      };

      return {
        updatePasswordVisible: false,
        companyTypeOptions: [],
        signInForm: {
          "email": "",
          "password": ""
        },
        changePwdForm: {
          oldPassword: '',
          newPassword: '',
          repeatPassword: ''
        },
        changePwdFormRules: {
          "oldPassword": [{required: true, validator: validatePassword, trigger: 'blur'}],
          "newPassword": [{required: true, validator: validatePassword, trigger: 'blur'}],
          "repeatPassword": [{required: true, validator: validateRepPwd, trigger: 'blur'}],
        },
        signInRules: {
          "email": [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
          ],
          "password": [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 16, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ]
        },

        cityDialogVisible: false,
        activeIndex: '1',
        activeIndex2: '1',
        isLogin: false,
        managerIndex:false
      };
    },
    computed: {
      signInDialogVisible: {
        get: function () {
          return this.$store.state.signInDialogVisible;
        },
        set: function (val) {
          if (val === true) {
            this.$store.commit('signInDialogVisibleTrue');
          } else {
            this.$store.commit('signInDialogVisibleFalse');
          }

        },

      },

      user: {
        get: function () {
          return this.$store.state.user;
        },
        set: function () {

        }
      },
      unReadNum: {
        get: function () {
          return this.$store.state.unReadNum;
        },
        set: function () {

        }
      }
    },
    methods: {
      getUnReadMessage: function () {
        getUnReadNumAPI().then(res => {
          if (res.code === 200) {
            this.$store.commit('setUnReadNum', {name: 'stark', num: res.data});
          }
        })
      },

      changePWD: function () {
        changePWDAPI(this.changePwdForm).then(res => {
          if (res.code === 200) {
            this.$message.success("密码修改成功,请重新登录");
            this.signOut();
          } else {
            this.$message.error(res.msg);
          }
        })
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

      // 登录弹窗打开
      signInDialogOpen: function () {
      },


      sendCode: function () {
        let email = "";
        if (this.labelPosition === "person") {
          email = this.signUpFormPerson.email;
        } else {
          email = this.signUpFormCompany.email;
        }
        console.log("发送邮件 " + email);
        if (util.isEmpty(email)) {
          return;
        } else {
          if (util.checkStr(email, "email")) {
            checkEmailAPI(email).then((res) => {
              if (res.data === true) { //被占用
                //添加成功
                return;
              } else {
                getCodeAPI(email).then((res) => {
                  if (res.code === 200) {
                    this.$message.success("验证码已发送,请查收！");
                    //todo 倒计时
                  } else {
                    this.$message.error(res.msg);
                  }
                })
              }
            });
          } else {
            return;
          }
        }


      },

      handleSelect: function (a, b) {
        console.log("当前路径" + this.$route.path);
      },

      //登录
      signIn: function () {
        var loginParams = {email: this.signInForm.email, password: this.signInForm.password};
        signInAPI(loginParams).then((res) => {
          if (res.code === 200) {
            this.loginSucceed(res);
          } else {
            this.$message.error({message: res.msg});
            this.isLogin = false;
          }
        }).catch((err) => {
          console.log(err);
          this.$message.error('登录失败，网络异常,请重试');
        });
      },

      //退出登录
      signOut: function () {
        console.log("调用退出登录");
        var loginParams = {phone: this.signInForm.phone, password: this.signInForm.password};

        signOutAPI().then((res) => {
          this.isLogin = false;
          if (res.code === 200) {
            this.$message.success("退出登录成功");
            sessionStorage.clear();
            localStorage.clear();
            this.managerIndex = false;
            this.$router.push({path: '/blogPage'})
          } else {
            this.$message.error({message: res.msg});
            this.isLogin = false;
          }
        }).catch((err) => {
          console.log(err);
          this.$message.error('登录失败，网络异常,请重试');
        });
      },

      loginSucceed: function (res) {
        this.$store.commit('setHeadImg', {name: 'stark', user: res.data.u});
        sessionStorage.setItem('token', res.data.t);
        sessionStorage.setItem('user', JSON.stringify(res.data.u));
        localStorage.setItem('token', res.data.t);
        localStorage.setItem('user', JSON.stringify(res.data.u));
        localStorage.setItem("module",JSON.stringify(res.data.m));
        localStorage.setItem("permission",JSON.stringify(res.data.p));
        //this.getUnReadMessage();
        console.log("比较结果 " + this.contains(JSON.parse(localStorage.getItem("module")),"5d429e79bb9fe01c646d1fd6"))
        this.managerIndex = this.contains(JSON.parse(localStorage.getItem("module")),"5d429e79bb9fe01c646d1fd6");
        this.signInDialogVisible = false;
        this.isLogin = true;
      }
    },

    created:function(){
      if (!util.isEmpty(localStorage.getItem("token"))) {
        console.log("已经登录 ");
        this.isLogin = true;
        this.managerIndex = this.contains(JSON.parse(localStorage.getItem("module")),"5d429e79bb9fe01c646d1fd6");
        this.$store.commit('setHeadImg', {name: 'stark', user: JSON.parse(localStorage.getItem("user"))});

      }else {
        console.log("还未登录 ");
      }
    },

    mounted() {
      if (!this.isEmpty(this.user)) {
        //用户已经登录
        this.getUnReadMessage();
      }
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

  /*.signInDialog{*/
  /*width: 80%;*/
  /*}*/

  .el-header {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .home-log {
    width: 160px;
    height: 100%;
    background-color: #eee;
    margin-right: 15px;
    font-size: 1.4rem;
    display: flex;
    justify-content: left;
    padding-bottom: 4px;
  }

  .main-signIn {
    position: absolute;
    top: 0;
    right: 9rem;
    height: 100%;
    width: 120px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: calc(100% - 60px);
  }


</style>

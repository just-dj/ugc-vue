<template>
  <section style="height: 100%">
    <el-container class="el-container main-page" style="background-color: rgb(238,238,238)">
      <el-header style="position: relative;background-color: #545c64;padding: 0 9rem;">
        <div class="home-log" style="background-color: #545c64;color: #fff;box-sizing: border-box">
          校园兼职
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
          <el-menu-item index="/indexPage" key="">首页</el-menu-item>
          <el-menu-item index="/jobPage">兼职查询</el-menu-item>
          <el-menu-item  index="/userManagerPage">用户管理</el-menu-item>
          <el-menu-item  index="/jobTypeManagerPage">类别管理</el-menu-item>
          <el-menu-item  index="/companyJobManagerPage">兼职管理</el-menu-item>
          <!--<el-menu-item v-show="isLogin" index="/adminJobManagerPage">兼职管理</el-menu-item>-->
          <el-menu-item   index="/appealInfoManagerPage">申诉处理</el-menu-item>
          <el-menu-item  index="/dataAnalysePage">数据分析</el-menu-item>
          <el-menu-item index="/appliedJobPage">申请/收藏</el-menu-item>
          <el-menu-item  index="/messagePage" style="position: relative">
            <el-badge :value="unReadNum" class="item" :hidden="unReadNum <= 0" style="position: absolute;top: -10px;left: 50px">
            </el-badge>
            <span>消息</span>
          </el-menu-item>

        </el-menu>

        <div class="main-signIn">
          <el-button type="text" style="color: #fff" @click="signInDialogVisible = true" v-show="!isLogin">登录
          </el-button>
          <el-button type="text" style="color: #fff" @click="signUpDialogVisible = true" v-show="!isLogin">注册
          </el-button>

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
      <el-main style="margin: 15px 8.1rem 15px 8.1rem;padding: 10px 0.9rem 10px 0.9rem;background-color: #fff">
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
                 @open="signInDialogOpen"
      >
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

      <!--注册弹窗-->
      <el-dialog title="注册"
                 :visible.sync="signUpDialogVisible"
                 center
                 @close="clearAll"
                 :close-on-click-modal="false">
        <div style="width: 100%;display: flex;justify-content: center;margin-bottom: 10px">
          <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="person">普通用户</el-radio-button>
            <el-radio-button label="company">企业用户</el-radio-button>
          </el-radio-group>
        </div>
        <el-form :model="signUpFormPerson"
                 ref="signUpFormPerson"
                 v-show="labelPosition === 'person'"
                 label-position="left"
                 :rules="signUpPersonRules"
                 label-width="5rem">

          <el-row>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="signUpFormPerson.email" autocomplete="off" style="width: 18.75rem"
                          placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" label="">
              <el-button style="margin-left: 4.375rem" @click="sendCode">发送验证码</el-button>
              <el-form-item label="" style="float: right" prop="code">
                <el-input v-model="signUpFormPerson.code" autocomplete="off" style="width: 6.75rem"
                          placeholder="验证码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="signUpFormPerson.name" autocomplete="off" style="width: 18.75rem"
                          placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" style="float: right" prop="sex">
                <el-radio-group v-model="signUpFormPerson.sex" size="normal" style="width: 18.75rem">
                  <el-radio-button label="0">男</el-radio-button>
                  <el-radio-button label="1">女</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="signUpFormPerson.password" autocomplete="off" style="width: 18.75rem"
                          placeholder="请输入密码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="重复" style="float: right" prop="repeatPassword">
                <el-input type="password"  v-model="signUpFormPerson.repeatPassword" autocomplete="off" style="width: 18.75rem"
                          placeholder="请重复密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>

        <el-form :model="signUpFormCompany"
                 ref="signUpFormCompany"
                 v-show="labelPosition === 'company'"
                 label-position="left"
                 :rules="signUpCompanyRules"
                 label-width="5.6rem">

          <el-row>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="signUpFormCompany.email" autocomplete="off" style="width: 18.75rem"
                          placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" label="">
              <el-button style="margin-left: 3.5rem" @click="sendCode">发送验证码</el-button>
              <el-form-item label="" style="float: right" prop="code">
                <el-input v-model="signUpFormCompany.code" autocomplete="off" style="width: 7.75rem"
                          placeholder="验证码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人" prop="contract">
                <el-input v-model="signUpFormCompany.contract" autocomplete="off" style="width: 18.75rem"
                          placeholder="请输入联系人名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机" style="float: right" prop="phone">
                <el-input v-model="signUpFormCompany.phone" autocomplete="off" style="width: 18.75rem"
                          placeholder="请输入联系人手机号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="12">
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="signUpFormCompany.password" autocomplete="off" style="width: 18.75rem"
                          placeholder="请输入密码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="重复" style="float: right" prop="repeatPassword">
                <el-input type="password" v-model="signUpFormCompany.repeatPassword" autocomplete="off" style="width: 18.75rem"
                          placeholder="请重复密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="公司名" prop="companyName">
                <el-input v-model="signUpFormCompany.companyName" autocomplete="off" style="width: 18.75rem"
                          placeholder="请输入公司名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类型" style="float: right" prop="companyType">
                <el-select v-model="signUpFormCompany.companyType" placeholder="请选择公司类型" style="width: 18.75rem">
                  <el-option
                    v-for="item in companyTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="signUpDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="signUp">确 定</el-button>
        </div>
      </el-dialog>


      <el-dialog title="选择城市" :visible.sync="cityDialogVisible"
                 center
                 width="31%"
                 :close-on-click-modal="false"
      >
        <!--<el-form :model="signInForm" :rules="signInRules"-->
        <!--label-width="6.25rem"-->
        <!--label-position="left">-->
        <!--<el-form-item label="邮箱" prop="email">-->
        <!--<el-input v-model="signInForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="密码" prop="password">-->
        <!--<el-input type="password" v-model="signInForm.password" autocomplete="off" placeholder="请输入密码"></el-input>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <div slot="footer" class="dialog-footer" center="true">
          <el-button @click="cityDialogVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>

    </el-container>
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
  } from "../api/job";
  import * as util from "../common/utils/util"
  import store from "../vuex/store"

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
        labelPosition: "person",
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
        signUpFormPerson: {
          "email": "",
          "code": "",
          "name": "",
          "sex": "",
          "password": "",
          "repeatPassword": ""
        },
        signUpPersonRules: {
          "email": [{required: true, validator: validateEmail, trigger: 'blur'}],
          "code": [{required: true, validator: validateCode, trigger: 'blur'}],
          "name": [{required: true, message: "请输入姓名", trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}],
          "sex": [{required: true, message: "请选择性别", trigger: 'blur'}],
          "password": [{required: true, validator: validatePassword, trigger: 'blur'}],
          "repeatPassword": [{required: true, validator: validateRepPassword, trigger: 'blur'}],
        },
        signUpFormCompany: {
          "email": "",
          "code": "",
          "contract": "",
          "phone": "",
          "companyName": "",
          "companyType": "",
          "password": "",
          "repeatPassword": ""
        },
        "signUpCompanyRules": {
          "email": [{required: true, validator: validateEmail, trigger: 'blur'}],
          "code": [{required: true, validator: validateCode, trigger: 'blur'}],
          "contract": [{required: true, message: "请输入姓名", trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}],
          "phone": [{required: true, message: "请输入手机号", trigger: 'blur'}],
          "password": [{required: true, validator: validatePassword, trigger: 'blur'}],
          "repeatPassword": [{required: true, validator: validateRepPassword, trigger: 'blur'}],
        },
        signUpDialogVisible: false,
        cityDialogVisible: false,
        activeIndex: '1',
        activeIndex2: '1',
        isLogin: false,
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

        }
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

      signInDialogOpen: function () {
        this.$router.push({path: '/indexPage'});
      },
      clearAll: function () {
        this.$refs["signUpFormPerson"].resetFields();
        this.$refs["signUpFormCompany"].resetFields();
        this.labelPosition = "person";
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
            // this.$message.success("登录成功");
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
            this.$router.push({path: '/indexPage'})
          } else {
            this.$message.error({message: res.msg});
            this.isLogin = false;
          }
        }).catch((err) => {
          console.log(err);
          this.$message.error('登录失败，网络异常,请重试');
        });
      },

      //注册
      signUp: function () {
        if (this.labelPosition === "person") {
          this.$refs["signUpFormPerson"].validate((valid) => {
            if (valid) {
              personSignUpAPI(this.signUpFormPerson).then(res => {
                if (res.code === 200) {
                  this.$message.success("注册成功");
                  this.signUpDialogVisible = false;
                  this.loginSucceed(res);
                } else {
                  this.$message.error(res.msg)
                }
              })
            } else {
              return false;
            }
          });
        } else if (this.labelPosition === "company") {
          this.$refs["signUpFormCompany"].validate((valid) => {
            if (valid) {
              companySignUpAPI(this.signUpFormCompany).then(res => {
                if (res.code === 200) {
                  this.$message.success("注册成功！");
                  this.signUpDialogVisible = false;
                  this.loginSucceed(res);
                } else {
                  this.$message.error(res.msg)
                }
              })
            } else {
              return false;
            }
          });
        }

      },

      loginSucceed: function (res) {
        this.$store.commit('setHeadImg', {name: 'stark', user: res.data.u});
        sessionStorage.setItem('token', res.data.t);
        localStorage.setItem('token', res.data.t);
        sessionStorage.setItem('user', JSON.stringify(res.data.u));
        localStorage.setItem('user', JSON.stringify(res.data.u));
        this.getUnReadMessage();
        this.signInDialogVisible = false;
        this.isLogin = true;
      }
    },
    beforeCreate:function(){
      if (!util.isEmpty(localStorage.getItem("token"))) {
        console.log("已经登录 ");
        this.isLogin = true;
        this.$store.commit('setHeadImg', {name: 'stark', user: JSON.parse(localStorage.getItem("user"))});

      }else {
        console.log("还未登录 ");
      }
    },
    created:function(){
      if (!util.isEmpty(localStorage.getItem("token"))) {
        console.log("已经登录 ");
        this.isLogin = true;
        this.$store.commit('setHeadImg', {name: 'stark', user: JSON.parse(localStorage.getItem("user"))});

      }else {
        console.log("还未登录 ");
      }
    },
    mounted() {
      if (!this.isEmpty(this.user)) {
        this.getUnReadMessage();
      }


      dropListOneGetApi("company_type").then((res) => {
        if (res.code === 200) {
          this.companyTypeOptions = res.data;
        } else {
          this.$message.err("获取公司类型下拉列表失败" + res.msg);
        }
      })
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

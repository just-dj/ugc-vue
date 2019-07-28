<template>
  <section>

    <div style="width: 100%;height: 100%;display: flex;justify-content: flex-start;align-items: center">

      <div
        style="width: 15%;height: 100%;display: flex;flex-direction: column;justify-content: flex-start;align-items: center">
        <div style="display: flex;justify-content: flex-start;width: 100%">
          <el-button icon="el-icon-arrow-left" @click="goUp" style="margin: 0">
          </el-button>
        </div>
        <span style="font-size: 18px;font-weight: bold;margin-bottom: 15px;margin-top: 10px">最近联系列表</span>
        <div v-for="item in userList"
             @click="selectUser(item)"
             class="user_item" style="width: 100%;height: 40px;margin-bottom: 15px;">
          <el-badge :value="item.num" class="item" :hidden="(item.num <= 0 || item.id === toUserId)" style="width: 100%">
            <el-card shadow="hover"
                     style="width: 100%;height: 40px;display: flex;justify-content: center;align-items: center;"
                     v-bind:class="{ 'user_item_select': toUserId === item.id,}">
              <span style="margin-right: 10px;font-size: 16px;font-weight: bold">{{item.name}}</span>
              <span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{item.password}}</span>
            </el-card>
          </el-badge>
        </div>
      </div>

      <div class="chat-body"
           v-show="!isEmpty(toUserId)"
           style="width: 85%;height: 100%;max-height:100%;box-sizing: border-box;overflow: hidden;display: flex;flex-direction: column;justify-content: flex-start;align-items: left">

        <!--<div style="width: 100%;height: 60%;max-height:60%;background-color: #a4da89">-->

        <div style="width: 85%;height: 58%;max-height:58%;margin-bottom: 1.5%">

          <el-scrollbar ref="myScrollbar">
            <div v-for="item in messageList">
              <el-row style="width: 100%">
                <el-col v-if="item.from !== user.id && item.from !== 'system'" :span="18" :offset="0"
                        style="margin-bottom: 10px;display: flex;justify-content: flex-start;align-items: center">
                  <span style="font-size: 16px;font-weight: bold">{{item.fromUserName}}  : </span>
                  <el-card shadow="hover">
                  <span v-html="item.data">
                  </span>
                  </el-card>
                </el-col>
                <el-col v-if="item.from === user.id" :span="18" :offset="6"
                        style="margin-bottom: 10px;display: flex;justify-content: flex-end;align-items: center">
                  <el-card shadow="hover">
                  <span v-html="item.data">
                  </span>
                  </el-card>
                  <span style="font-size: 16px;font-weight: bold"> : {{user.name}} </span>
                </el-col>
                <el-col v-if="item.from === 'system'" :span="24"
                        style="display: flex;justify-content: center;align-items: center;margin-bottom: 10px">
                  <el-card shadow="hover">
                    <span style="color: #e6a23c">系统消息: {{item.data}}</span>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-scrollbar>
        </div>

        <div class="tool-pane"
             style="height:40%;max-height:40%;width:100%;display: flex;justify-content: flex-start;align-items: left">
          <vue-editor v-model="inputData" style="width: 85%;height: 80%;min-height: 0"></vue-editor>

          <div class="pane-button"
               style="width: 15%;height: 100%;display: flex;flex-direction: column;justify-content: flex-start;">

            <div style="margin-bottom: 15px;margin-top: 15px">
              <el-button @click="sendToUserMessage(inputData,toUserId)">发送消息
              </el-button>
            </div>

            <div style="margin-bottom: 15px">
              <el-button @click="inputData = ''">清空输入</el-button>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
  import store from "../vuex/store"
  import * as util from "../common/utils/util"
  import {VueEditor} from 'vue2-editor'
  import {getGroupUserAPI, getRecentUserList, getToFromMessage, getUnReadNumAPI, getUserAPI} from "../api/job";

  export default {
    name: "messagePage",
    components: {
      VueEditor
    },
    data() {
      return {
        myScrollbar: {},
        token: "",
        websocket: null,
        content: '',
        inputData: '',
        message: {
          toUserType: 0,
          messageType: 0,
          from: '',
          to: '',
          fromUserName: '',
          toUserName: '',
          data: ''
        },
        toUserId: '',
        messageList: [],
        userList: []
      }
    },
    computed: {
      user: {
        get:function () {
          return this.$store.state.user;
        },
        set:function () {

        }
      },

    },
    methods: {
      conta:function(arr, val) {
        return arr.indexOf(val) != -1 ? true : false;
      },
      isEmpty:function(v) {
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
      //选中了某个用户
      selectUser: function (item) {
        let id = item.id;
        item.num = 0;
        if (id !== this.toUserId) {
          this.toUserId = id;
          this.getMessage(id);
        } else {
          console.log("当前用户已被选中");
        }
      },

      //获取与当前用户的聊天记录
      getMessage: function (id) {
        //todo 去获取对应的聊天记录
        getToFromMessage(id).then(res => {
          if (res.code === 200) {
            this.messageList = res.data;
            this.getUnReadMessage();
          } else {
            this.$message.error("获取聊天记录失败");
          }
        })
      },

      getUnReadMessage: function () {
        console.log("消息更新home未读消息总数")
        getUnReadNumAPI().then(res => {
          if (res.code === 200) {
            this.$store.commit('setUnReadNum', {name: 'stark', num: res.data});
          }
        })
      },

      //todo 这个部分可以处理一下  判断信息类型
      //将消息显示在网页上
      handleContent: function (message) {
        //是否是当前正在聊天的用户
        if (message.from === this.user.id || message.from === this.toUserId) {
          this.messageList.push(JSON.parse(JSON.stringify(message)));
        }
        if (message.from === "system") {
          //系统消息
          this.messageList.push(JSON.parse(JSON.stringify(message)));
        } else {
          //用户消息 toUserId不能随便更改 检查是谁发过来的在不在最近列表里
          if (message.from !== this.toUserId){
            this.getRecentUserAndNumList();
          }else {
            this.getMessage(this.toUserId);
          }
        }
      },

      //删除当前用户以及聊天记录
      removeUser:function(){



        this.toUserId = '';
      },

      //把用户加入左侧列表
      addUserToRecentList: function (id) {
        console.log("单个用户加入聊天");
        let that = this;
        let isExist = false;
        this.userList.forEach(a => {
          if (a.id === id) {
            isExist = true;
          }
        });
        if (isExist === true) {
          return;
        } else {
          getUserAPI(id).then(res => {
            if (res.code === 200) {
              console.log("单个用户加入列表");
              that.userList.push(res.data);
              //直接去获取最近联系人列表
              this.getRecentUserAndNumList();
              //再去请求历史联系人
            } else {
              console.log("获取用户信息失败");
            }
          })
        }
      },

      //把用户组加入左侧列表
      addGroupUserToRecentList: function (dbSearchResult) {
        let that = this;
        let isExist = false;
        let list = [], existId = "";
        dbSearchResult.forEach(a => list.push(a.id));
        list.forEach(userId => {
          this.userList.forEach(a => {
            if (a.id === userId) {
              isExist = true;
              existId = a.id;
            }
          });
        });

        if (util.isEmpty(existId)) {
          console.log("当前用户不在历史聊天用户中");
        } else {
          console.log("当前用户有过聊天记录，清除用户列表");
          this.userList = [];
        };

        getGroupUserAPI(list).then(res => {
          if (res.code === 200) {
            if (!util.isEmpty(res.data)) {
              res.data.forEach(a => {
                let num = 0;
                dbSearchResult.forEach(b => {
                  if (b.id === a.id) {
                    a.num = b.num;
                  }
                })
              });
              this.userList = res.data.concat(this.userList);
            }
          } else {
            console.log("获取最近联系人详细信息失败");
          }
        });

      },

      //关闭连接
      closeWebSocket: function () {
        this.websocket.close();
      },

      //发送消息
      send: function (message) {
        this.messageList.push(JSON.parse(JSON.stringify(message)));
        this.websocket.send(JSON.stringify(message));
      },

      sizeof: function (str, charset) {

        let total = 0, charCode, i, len;
        charset = charset ? charset.toLowerCase() : '';
        if (charset === 'utf-16'
          || charset === 'utf16') {
          for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0xffff) {
              total += 2;
            } else {
              total += 4;
            }
          }
        } else {
          for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f) {
              total += 1;
            } else if (charCode <= 0x07ff) {
              total += 2;
            } else if (charCode <= 0xffff) {
              total += 3;
            } else {
              total += 4;
            }
          }
        }
        return total;
      },

      scrollDown: function () {
        this.$refs['myScrollbar'].wrap.scrollTop = this.$refs['myScrollbar'].wrap.scrollHeight
      },

      goUp: function () {
        this.$router.go(-1)
      },

      sendToUserMessage: function (msg, to) {
        let that = this;
        if (util.isEmpty(this.inputData)) {
          that.$message.info("信息不能为空");
          return;
        }
        console.log("数据长度 " + this.sizeof(this.inputData, "UTF-8"));
        if (this.sizeof(this.inputData, "UTF-8") > 200 * 1024) {
          that.$message.info("数据太大");
          return;
        }
        this.message.from = this.user.id;
        this.message.to = to;
        this.message.data = this.inputData + "";
        this.message.toUserType = 0;
        this.message.messageType = 1;
        this.message.fromUserName = this.user.name;
        this.send(this.message);
        this.inputData = "";
      },

      sendToAllUserMessage: function (msg, to) {
        let that = this;
        if (util.isEmpty(this.inputData)) {
          that.$message.info("信息不能为空");
          return;
        }
        if (this.sizeof(this.inputData, "UTF-8") > 200 * 1024) {
          that.$message.info("数据太大");
          return;
        }
        this.message.from = this.user.id;
        this.message.to = to;
        this.message.data = this.inputData.concat("");
        this.message.toUserType = 0;
        this.message.messageType = 1;
        this.message.fromUserName = this.user.name;
        this.send(message);
        this.inputData = "";
      },

      getRecentUserAndNumList: function () {
        getRecentUserList({}).then(res => {
          console.log("获取最近联系人接口调用");
          if (res.code === 200) {
            //添加用户组
            this.addGroupUserToRecentList(res.data);
            //更新未读消息总数
            this.getUnReadMessage();
          } else {
            console.log("获取最近联系人失败");
          }
        });
      }
    },
    beforeDestroy:function(){
      console.log("页面销毁");
      this.websocket.close();
    },
    updated: function () {
      this.scrollDown();
    },

    mounted() {
      let that = this;
      this.token = localStorage.getItem("token");
      if (util.isEmpty(this.token)) {
        console.log("token 为空");
        //弹出登录框
        this.$store.commit('signInDialogVisibleTrue');
      }

      this.toUserId = this.$route.query.id;
      //先去查询组 再去查询当前用户
      if (util.isEmpty(this.toUserId)) {
        //todo 没有选中用户 直接打开聊天界面
        console.log("todo 没有选中用户 直接打开聊天界面")
        //直接去获取最近联系人列表
        this.getRecentUserAndNumList();
      } else {
        console.log("插入最近联系人列表")
        //插入最近联系人列表
        that.addUserToRecentList(this.toUserId)
        //todo 应该弹出聊天框
        that.getMessage(this.toUserId);
      }



      //判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
        let url = "ws://" + process.env.COLLECTION_URL.toString().replace('http://', '') + "/api/webSocket/";
        // let url = "ws://47.102.199.98:9003/api/webSocket/";
        console.log("地址 " + url);
        this.websocket = new WebSocket(url + this.token);
      }
      else {
        alert('Not support websocket')
      }

      //连接发生错误的回调方法e
      this.websocket.onerror = function (e) {
        that.$message.error("webSocket 连接错误" + e.code);
      };

      //连接成功建立的回调方法
      this.websocket.onopen = function (event) {
        // that.$message.success("消息服务 连接成功");
      };

      //接收到消息的回调方法
      this.websocket.onmessage = function (event) {
        let data = JSON.parse(event.data);
        console.log("收到的消息 " + JSON.stringify(data));
        if (data.messageType === -1) {
          console.log("连接信息 不予显示");
        } else {
          that.handleContent(data);
        }
      };

      //连接关闭的回调方法
      this.websocket.onclose = function () {
        console.log("消息服务 连接已关闭");
        // that.$message.info("消息服务 连接已关闭");
      };

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function () {
        that.websocket.close();
      }

    }
  }
</script>

<style scoped>
  >>> .el-card__body {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  >>> .el-scrollbar {
    height: 100%;
    max-height: 100%;
  }

  >>> #app .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .user_item_select {
    border-color: #aaa;
    background-color: #eeeeee;
  }
</style>

<template>
  <section style="height: 100%">
    <el-row>
      <el-col :span="24" style="display: flex;justify-content: flex-start;display: flex;justify-content: flex-start;align-items: center">
        <el-button icon="el-icon-arrow-left"  @click="goUp" style="margin: 0">
        </el-button>

        <span v-show="job.enableStatus !== '2'" style="color: #ebb563;font-weight: bold;font-size: 16px;margin-left: 20px"> 职位处于非正常状态 </span>
      </el-col>
    </el-row>
   <div style="width: 100%;height: calc(100% - 40px);display: flex;justify-content: flex-start;align-items: flex-start">
     <div style="width: 40%;display: flex;flex-direction:column;justify-content: flex-start;align-items: flex-start;margin-top: 10px">
       <el-transfer
         @left-check-change="leftChange"
         @right-check-change="rightChange"
         style="text-align: left; display: inline-block"
         :titles="['已报名用户','筛选通过用户']"
         v-model="selectUser"
         @change="listChange"
         :data="signUpUser">
         <span slot-scope="{ option }"> {{ option.label }}</span>
       </el-transfer>

       <el-button  @click="toChatPage" style="margin-top: 20px" v-show="!isEmpty(selectNow)">
         和 {{this.selectNow.name}} 聊一聊?
       </el-button>
     </div>
     <div style="height: 100%;width: 60%;" v-if="!isEmpty(selectNow)">
       <div v-if="!isEmpty(onlineResume)" style="margin-top: 10px">
         <el-scrollbar>
           <el-form :model="onlineResume"
                    disabled
                    label-width="7rem">

             <el-row>

               <el-col :span="12">
                 <el-form-item label="姓名" >
                   <el-input v-model="selectNow.name" style="width: 18rem"> </el-input>
                 </el-form-item>
               </el-col>

               <el-col :span="12">
                 <el-form-item label="邮箱" >
                   <el-input v-model="selectNow.email" style="width: 18rem"> </el-input>
                 </el-form-item>
               </el-col>
             </el-row>


             <el-row>
               <el-col :span="12">
                 <el-form-item label="手机" >
                   <el-input v-model="onlineResume.phone" style="width: 18rem"> </el-input>
                 </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="学历" >
                   <el-select v-model="onlineResume.academic"
                              placeholder="请选择学历要求" style="width: 18rem">
                     <el-option
                       v-for="item in job_academic_requirements_options"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
                   </el-select>
                 </el-form-item>
               </el-col>
             </el-row>


             <el-row >
               <el-col :span="24">
                 <el-form-item label="空闲时间" >
                   <el-input v-model="onlineResume.idleTime" autocomplete="off" style="width: 48.43rem"
                             placeholder="请输入空闲时间"></el-input>
                 </el-form-item>

               </el-col>
             </el-row>

             <el-row>
               <el-col :span="24">
                 <el-form-item label="个人描述" >
                   <el-card shadow="hover" style="width: 48.43rem;margin-left: 2.875rem">
                     <div class="online-resume-detail" v-html="onlineResume.selfDesc">

                     </div>
                   </el-card>
                 </el-form-item>
               </el-col>
             </el-row>

           </el-form>
         </el-scrollbar>
       </div>

       <pdf
         v-if="!isEmpty(pdfUrl)"
         :src="pdfUrl"
         :page="currentPage"
         @num-pages="pageCount=$event"
         @page-loaded="currentPage=$event"
         @loaded="loadPdfHandler">
       </pdf>

        <div v-if="isEmpty(pdfUrl) && isEmpty(onlineResume)">
          <el-scrollbar>
            <el-form :model="onlineResume"
                     disabled
                     label-width="7rem">

              <el-row>

                <el-col :span="12">
                  <el-form-item label="姓名" >
                    <el-input v-model="selectNow.name" style="width: 18rem"> </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="邮箱" >
                    <el-input v-model="selectNow.email" style="width: 18rem"> </el-input>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="12">
                  <el-form-item label="手机" >
                    <el-input v-model="onlineResume.phone" style="width: 18rem"> </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学历" >
                    <el-select v-model="onlineResume.academic"
                               placeholder="请选择学历要求" style="width: 18rem">
                      <el-option
                        v-for="item in job_academic_requirements_options"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row >
                <el-col :span="24">
                  <el-form-item label="空闲时间" >
                    <el-input v-model="onlineResume.idleTime" autocomplete="off" style="width: 48.43rem"
                              placeholder="请输入空闲时间"></el-input>
                  </el-form-item>

                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item label="个人描述" >
                    <el-card shadow="hover" style="width: 48.43rem;margin-left: 2.875rem">
                      <div class="online-resume-detail" v-html="onlineResume.selfDesc">

                      </div>
                    </el-card>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
          </el-scrollbar>
        </div>
     </div>

     <div v-else style="display: flex;justify-content: center;align-items: center;margin-top: 10px">
       <div style="font-size: 18px;font-weight: bold;">点击用户可查看简历或者发起聊天</div>
     </div>
   </div>

  </section>
</template>

<script>
  import store from "../vuex/store"
  import * as util from "../common/utils/util"
  import {VueEditor} from 'vue2-editor'
  import {getPositionOption} from "../common/js/position";
  import {dropListOneGetApi, getGroupUserAPI} from "../api/job";
  import {selectUserAPI} from "../api/job";
  import {getUserAPI} from "../api/job";
  import {getOnlineResumeAPI} from "../api/job";
  import {getOnlineResumeByUserIdAPI} from "../api/job";
  import pdf from 'vue-pdf'

    export default {
        name: "jobSignUpPage",
        components: {
          pdf
        },
        data:function () {
          return {
            currentPage: 0, // pdf文件页码
            pageCount: 0, // pdf文件总页数
            job:{},
            selectUser:[],
            signUpUser:[],
            selectNow:{},
            pdfUrl:'',
            onlineResume: {},
            job_academic_requirements_options:[]
          }
        },
      computed:{
        user:{
          get: function () {
            return this.$store.state.user;
          },
          set: function () {

          }
        }
      },
      methods: {
        addEvaluation:function(){

        },
        toChatPage:function(){
          this.$router.push({path: '/messagePage/', query: {id: this.selectNow.id}});
        },
        loadPdfHandler (e) {
          this.currentPage = 1 // 加载的时候先加载第一页
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
        leftChange: function(selectedList,changeList){
          this.pdfUrl = '';
          this.onlineResume ={};
          if (!util.isEmpty(changeList) && changeList.length === 1){
            getUserAPI(changeList[0]).then(res=>{
              if (res.code === 200){
                this.selectNow = res.data;
                if (!util.isEmpty(this.selectNow.resumeUrl)){
                  //加载pdf简历
                  this.pdfUrl = this.selectNow.resumeUrl;

                }else {
                  //获取在线简历
                  getOnlineResumeByUserIdAPI(changeList[0]).then(res=>{
                    if (res.code === 200){
                      this.onlineResume = res.data;
                    } else {
                      console.log("用户在线简历获取失败");
                    }
                  })

                }

              }else {
                console.log("获取用户失败");
              }
            })
          }
        },
        //选中状态变化
        rightChange: function(selectedList,changeList){
          if (!util.isEmpty(changeList) && changeList.length === 1){
            // this.$message.success("成功");
          }
        },
        //右侧数据发生变化
        listChange:function(){
          //到右边之后就不能再编辑
          this.signUpUser.forEach(a=>{
            this.selectUser.forEach(b=>{
              if (b === a.id){
                a.disabled = true;
              }
            })
          });
          let temp = {
            jobId:'',
            userIdList:[]
          };
          temp.jobId = this.job.id;
          temp.userIdList = this.selectUser;
          selectUserAPI(temp).then(res=>{
            if (res.code === 200){

            }else if (res.code === 2) {
              this.$store.commit('signInDialogVisibleTrue');
            } else {
              this.$message.error(res.msg)
            }
          });
          console.log("穿梭变化");
          this.selectUser;
        },
        goUp: function () {
          this.$router.go(-1)
        },
      },
      mounted:function () {
        this.job = JSON.parse(this.$route.query.job);
        if (!util.isEmpty(this.job.selectedUserId)) {
          this.selectUser = this.job.selectedUserId;
        }

        dropListOneGetApi("job_academic_options").then(res => {
          if (res.code === 200) {
            this.job_academic_requirements_options = res.data;
          } else {
            console.error("学历要求下拉列表获取失败");
          }
        });

        getGroupUserAPI(this.job.appliedUserId).then(res=>{
          if (res.code === 200){
            if (!util.isEmpty(res.data)) {
              res.data.forEach(a=>{
                a.key = a.id;
                a.label = a.name;
                if (this.job.enableStatus !== '2'){
                  a.disabled =  true;
                } else {
                  a.disabled = !(a.userStatus === 2);
                }
              });
              this.signUpUser =  res.data;
            }
          } else {
            this.$message.error(res.msg);
          }
        })
      }
    }
</script>

<style scoped>
  >>> .el-transfer-panel__item.el-checkbox .el-checkbox__label{
  }

  >>> .online-resume-detail p{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
  }
</style>

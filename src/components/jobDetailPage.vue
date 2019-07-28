<template>
  <section>
    <el-row>
      <el-col :span="24" style="display: flex;justify-content: flex-start">
        <el-button icon="el-icon-arrow-left"  @click="goUp" style="margin: 0">
        </el-button>
      </el-col>
    </el-row>

    <div class="job-main-info" style="width:70%;display: flex;justify-content: center;align-items: center;margin: auto">
      <div class="job-detail-head-left" style="width: 50%;">
        <el-row style="margin-bottom: 15px">
          <span style="font-size: 22px;font-weight: bold">{{job.jobName}}</span>
        </el-row>
        <el-row style="font-size: 16px;margin-bottom: 10px;font-weight: bold">
          薪资 <span
          style="color: rgb(255,129,45);font-size: 18px;font-weight: bold;margin-right: 35px">{{job.salary}}</span>
          <span> {{formatPayMethod(job)}}  |  {{ formatJobType(job.jobType )}}  |  需要{{job.requireNum}}人 | {{formatGender()}}</span>
        </el-row>
        <el-row v-show="!isAuth">
          <el-button  @click="jobSignUp" v-if="isJobSignUp()">
            报名参加
          </el-button>
          <el-button  @click="jobSignUp" v-else disabled>
            已报名
          </el-button>
          <el-button  @click="toChatPage">
            聊一聊
          </el-button>
          <el-button v-if="isCollection()" @click="collection">
            收藏
          </el-button>
          <el-button v-else @click="unCollection">
            取消收藏
          </el-button>
        </el-row>
      </div>
      <el-card shadow="hover" style="width: 50%;height: 160px;" @Click="toCompanyDetailPage">
        <div style="width:100%;height:100%;display: flex;flex-direction: column;justify-content: flex-start;align-items: center">
          <span style="font-size: 16px;font-weight: bold;margin-top: 10px"> {{companyInfo.companyName}} </span>
          <div style="width: 100%;display: flex;flex-direction: column;justify-content: flex-start;align-items: flex-start;padding-left: 20px">
            <span style="font-size: 16px;margin-top: 6px">成立日期 : {{ formatDate(companyInfo.companyCreateTime)}} </span>
            <span style="font-size: 16px;margin-top: 6px">注册资本 : {{companyInfo.registeredCapital}} ￥</span>
            <span style="font-size: 16px;margin-top: 6px">联系人 : {{companyInfo.contact}} </span>
          </div>
        </div>
      </el-card>
    </div>

    <!--<div class="cell_dashed"></div>-->

    <div class="job-detail"
         style="width: 70%;margin: auto;display: flex;flex-direction: column;margin-top: 25px;
         justify-content: flex-start;align-items: center">

      <el-card v-show="!this.isEmpty(formatJobSalaryTreatment())"
        shadow="hover" style="width: 100%;height: 60px;margin-bottom: 20px;display: flex;justify-content: flex-start">
         <span style="margin-bottom: 10px;font-size: 16px;font-weight: bold">福利 :
           <el-tag v-for="item in formatJobSalaryTreatment()" style="margin-right: 10px">{{item}}</el-tag>
        </span>
      </el-card>

      <el-card shadow="hover" style="width: 100%;height: 60px;margin-bottom: 20px;display: flex;justify-content: flex-start">
        <span v-show="job.type === 0"
              style="margin-bottom: 10px;font-size: 16px;font-weight: bold">详细地址 :
        </span>
        <span  style="font-size: 16px">  {{job.workLocation}}</span>
      </el-card>

      <el-card shadow="hover" style="width: 100%;;">
        <span style="font-size: 18px;margin-bottom: 15px;font-weight: bold">兼职详情</span>
        <div class="detail" v-html="job.jobDetails" ></div>
      </el-card>


    </div>
  </section>
</template>

<script>
  import {collectionJobAPI, dropListOneGetApi, getCompanyAPI, getJobAPI, getJobTypeAPI, jobSignUpAPI} from "../api/job";
  import store from "../vuex/store"
  import * as util from "../common/utils/util"

  export default {
    name: "jobDetailPage",
    data() {
      return {
        editForm_gender_options: [{
          value: -1,
          label: '无性别要求'
        }, {
          value: 0,
          label: '仅限男生'
        }, {
          value: 1,
          label: '仅限女生'
        }],
        job: {},
        job_type_options: [],
        job_type_child: [],
        jobTYPE:[],
        job_salary_treatment_options:[],
        //是否是公司里的人创建的
        isAuth:false,
        companyInfo:{}
      }
    },
    computed: {
      user: {
        get: function () {
          return this.$store.state.user;
        },
        set: function () {

        }
      },
    },
    methods: {
      toCompanyDetailPage:function(){
        // todo 公司详情界面

      },

      isJobSignUp:function(){
        if (this.isEmpty(this.job.appliedUserId)){
          return true;
        }
        if ( this.job.appliedUserId.indexOf(this.user.id) < 0) {
          return true;
        }
      },
      //兼职报名
      jobSignUp: function(){
        jobSignUpAPI(this.job.id).then(res=>{
          if (res.code === 200){
            this.$message.success("报名成功");
            if (this.isEmpty(this.job.appliedUserId)) {
              this.job.appliedUserId = [];
            }
            this.job.appliedUserId.push(this.user.id);
          }else if (res.code === 2) {
            this.$store.commit('signInDialogVisibleTrue');
          } else {
            this.$message.error(res.msg);
          }
        })
      },

      isCollection:function(){
        console.log("1231313213213212131321")
        if(this.isEmpty(this.user.jobId)){
          console.log("没有收藏过");
          return true;
        }
        if(this.user.jobId.indexOf(this.job.id) < 0){
          console.log("没有收藏这个兼职");
          return true;
        }
      },

      collection: function(){
        if(this.isEmpty(this.user.jobId)){
          this.user.jobId = [];
        }
        collectionJobAPI(this.job.id).then(res=>{
          if (res.code === 200){
            this.$message.success("收藏成功");
            this.user.jobId.push(this.job.id);
            this.$store.commit('setHeadImg',{name:'stark',user:this.user});
          }
          else if (res.code === 2) {
            this.$store.commit('signInDialogVisibleTrue');
          } else {
            this.$message.error("收藏失败");
          }
        })

      },

      unCollection: function(){
        let temp = this.user.jobId;
        collectionJobAPI(this.job.id).then(res=>{
          if (res.code === 200){
            this.$message.success("取消收藏成功");
            let index = temp.indexOf(this.job.id);
            if (index > -1) {
              temp.splice(index, 1);
            }
            this.user.jobId = temp;
            this.$store.commit('setHeadImg',{name:'stark',user:this.user});
          } else if (res.code === 2) {
            this.$store.commit('signInDialogVisibleTrue');
          } else {
            this.$message.error("取消收藏失败");
          }
        })

      },

      toChatPage:function(){
        this.$router.push({path: '/messagePage/', query: {id: this.job.createUserId}});
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

      goUp: function () {
        this.$router.go(-1)
      },

      formatGender: function(){
        let result = "";
        this.editForm_gender_options.forEach(a => {
          if (a.value == this.job.gender+"") {
            result = a.label;
          }
        })
        return result;
      },

      formatJobType:function(jobType) {
        let temp = this.jobTYPE.concat();
        let lastItem = temp.pop();
        let result = "";
        this.job_type_child.forEach(a => {
          if (lastItem == a.value) {
            result = a.label;
          }
        });
        return result;
      },


      formatDate:function(date){

        if (this.isEmpty(date)){
          return "";
        } else {
          return new Date(date).toLocaleDateString();
        }
      },

      formatJobSalaryTreatment:function(){
        let temp = this.job.salaryTreatment;
        let result = [];
        this.job_salary_treatment_options.forEach(a => {
          if (util.contains(temp,a.value)){
            result.push(a.label);
          }
        });
        return result;
      },

      //format函数--------------------------------------
      formatPayMethod: function (row) {
        switch (row.payMethod) {
          case "0" :
            return "不限";
          case "1" :
            return "日结";
          case "2" :
            return "周结";
          case "3" :
            return "月结";
          case "4" :
            return "完工结";
          case "5" :
            return "按件结";
          default:
            return "";
        }

      },
    },
    mounted() {

      getJobTypeAPI().then(res => {
        if (res.code === 200) {
          this.job_type_options = res.data;
          console.log("123 " + res.data)
          if (!util.isEmpty(res.data)) {
            this.job_type_options.forEach(a => {
              let child = a.children;
              this.job_type_child = this.job_type_child.concat(child);
            })
          }
        } else {
          console.error("工作类型下拉列表获取失败");
        }

      });

      this.job = JSON.parse(this.$route.query.job);
      if (util.isEmpty(this.$route.query.isAuth)){
        this.isAuth = false;
      } else if (this.$route.query.isAuth === true) {
        this.isAuth = true;
      }

      getCompanyAPI(this.job.companyId).then(res=>{
        if (res.code === 200){
          this.companyInfo = res.data;
        }else {
          console.log("获取公司信息失败 " + res.msg);
        }
      });


      this.jobTYPE = this.job.jobType.concat();

      dropListOneGetApi("job_salary_treatment").then(res => {
        if (res.code === 200) {
          this.job_salary_treatment_options = res.data;
        } else {
          console.error("福利下拉列表获取失败");
        }
      });

    }
  }
</script>

<style scoped>
  .cell_dashed {

    border-bottom: 1px dashed #999999;
    height: 1rem;
    width: 70%;
    margin: auto;
    margin-top: 15px;
    margin-bottom: 20px;
  }

  >>> .detail > p{
    display: flex ;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
  }
</style>

<template>
  <section style="height: 100%">
    <div style="margin-bottom: 10px;display: flex;justify-content: flex-start;align-items: center">
      <el-radio-group v-model="labelPosition" style="margin-right: 20px">
        <el-radio-button label="collection">我的收藏</el-radio-button>
        <el-radio-button label="delivery">我的投递</el-radio-button>
      </el-radio-group>
      <div v-show="labelPosition == 'delivery'">
        <el-radio-group  v-model="deliveryJobType" size="small" >
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="unHandle">未处理</el-radio-button>
          <el-radio-button label="pass">通过</el-radio-button>
          <el-radio-button label="fail">未通过</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div v-if="labelPosition === 'collection'" style="width: 100%;height: calc(100% - 45px);">
      <el-scrollbar ref="myScrollbar">
        <div v-for="item in collectionJobList" class="job-item" v-bind:key="item.id" style="">
          <!--background-color:#fcfaf2-->
          <div class="body-left" >
            <div class="job-title">
              {{item.jobName}}
              <el-tag v-show="item.enableStatus === '4'" type="danger" style="margin-left: 15px">已关闭</el-tag>
            </div>
            <div class="job-detail">
              <div class="detail-row">
              <span class="detail-item"  >
                工作类型: {{ formatJobType(item.jobType )}}
              </span>
                <span style="color: #006284;font-size: 16px">
                招聘人数: {{item.requireNum}}
              </span>
              </div>
              <div class="detail-row">
              <span class="detail-item"  >
                工作地点: {{formatRegion(item.region)  }}
              </span>
                <span style="color: #006284;font-size: 16px">
                学历要求: {{ formatAcademicRequirements(item.academicRequirements) }}
              </span>
              </div>
            </div>
          </div>
          <div class="body-right" style="padding-right: 20px">
            <span style="font-size: 16px;color: #006284;margin-right: 25px">
              薪资 <span  class="salary-value">{{item.salary }}</span>
            </span>
            <span style="font-size: 16px;color: #006284;margin-right: 25px">{{formatPayMethod(item,'')}}</span>
            <el-button type="primary" @click="toDetailPage(item)">查看详情</el-button>
          </div>
          <!--<div class="cell_dashed"></div>-->
        </div>
      </el-scrollbar>
    </div>
    <div v-else style="width: 100%;height: calc(100% - 45px);">

      <div style="width: 100%;height: 100%;margin-top: 10px">
        <el-scrollbar ref="myScrollbar">
          <div v-show="deliveryJobType === 'all'" v-for="item in allSignUpJob" class="job-item" v-bind:key="item.id + 'all'" >
            <!--background-color:#fcfaf2-->
            <div class="body-left" >
              <div class="job-title">
                {{item.jobName}}
                <el-tag v-show="unHandleList.indexOf(item) > -1" style="margin-left: 15px">未处理</el-tag>
                <el-tag v-show="passList.indexOf(item) > -1" type="success" style="margin-left: 15px">通过</el-tag>
                <el-tag v-show="unPassList.indexOf(item) > -1" type="info" style="margin-left: 15px">未通过</el-tag>
              </div>
              <div class="job-detail">
                <div class="detail-row">
              <span class="detail-item"  >
                工作类型: {{ formatJobType(item.jobType )}}
              </span>
                  <span style="color: #006284;font-size: 16px">
                招聘人数: {{item.requireNum}}
              </span>
                </div>
                <div class="detail-row">
              <span class="detail-item"  >
                工作地点: {{formatRegion(item.region)  }}
              </span>
                  <span style="color: #006284;font-size: 16px">
                学历要求: {{ formatAcademicRequirements(item.academicRequirements) }}
              </span>
                </div>
              </div>
            </div>
            <div class="body-right" style="padding-right: 20px">
            <span style="font-size: 16px;color: #006284;margin-right: 25px">
              薪资 <span  class="salary-value">{{item.salary }}</span>
            </span>
              <span style="font-size: 16px;color: #006284;margin-right: 25px">{{formatPayMethod(item,'')}}</span>
              <el-button type="primary" @click="toDetailPage(item)">查看详情</el-button>
            </div>
            <!--<div class="cell_dashed"></div>-->
          </div>
          <div v-show="deliveryJobType === 'unHandle'"v-for="item in unHandleList" class="job-item" v-bind:key="item.id + 'unHandle'" >
            <!--background-color:#fcfaf2-->
            <div class="body-left" >
              <div class="job-title">
                {{item.jobName}}
              </div>
              <div class="job-detail">
                <div class="detail-row">
              <span class="detail-item"  >
                工作类型: {{ formatJobType(item.jobType )}}
              </span>
                  <span style="color: #006284;font-size: 16px">
                招聘人数: {{item.requireNum}}
              </span>
                </div>
                <div class="detail-row">
              <span class="detail-item"  >
                工作地点: {{formatRegion(item.region)  }}
              </span>
                  <span style="color: #006284;font-size: 16px">
                学历要求: {{ formatAcademicRequirements(item.academicRequirements) }}
              </span>
                </div>
              </div>
            </div>
            <div class="body-right" style="padding-right: 20px">
            <span style="font-size: 16px;color: #006284;margin-right: 25px">
              薪资 <span  class="salary-value">{{item.salary }}</span>
            </span>
              <span style="font-size: 16px;color: #006284;margin-right: 25px">{{formatPayMethod(item,'')}}</span>
              <el-button type="primary" @click="toDetailPage(item)">查看详情</el-button>
            </div>
            <!--<div class="cell_dashed"></div>-->
          </div>
          <div v-show="deliveryJobType === 'pass'"v-for="item in passList" class="job-item" v-bind:key="item.id + 'pass'" >
            <!--background-color:#fcfaf2-->
            <div class="body-left" >
              <div class="job-title">
                {{item.jobName}}
                <el-tag v-show="item.enableStatus === '4'" type="danger" style="margin-left: 15px">已关闭</el-tag>
              </div>
              <div class="job-detail">
                <div class="detail-row">
              <span class="detail-item"  >
                工作类型: {{ formatJobType(item.jobType )}}
              </span>
                  <span style="color: #006284;font-size: 16px">
                招聘人数: {{item.requireNum}}
              </span>
                </div>
                <div class="detail-row">
              <span class="detail-item"  >
                工作地点: {{formatRegion(item.region)  }}
              </span>
                  <span style="color: #006284;font-size: 16px">
                学历要求: {{ formatAcademicRequirements(item.academicRequirements) }}
              </span>
                </div>
              </div>
            </div>
            <div class="body-right" style="padding-right: 20px">
            <span style="font-size: 16px;color: #006284;margin-right: 25px">
              薪资 <span  class="salary-value">{{item.salary }}</span>
            </span>
              <span style="font-size: 16px;color: #006284;margin-right: 25px">{{formatPayMethod(item,'')}}</span>
              <el-button type="primary" @click="toDetailPage(item)">查看详情</el-button>
              <el-button type="primary" @click="openEvaluationDialog(item)">评价</el-button>
              <el-button type="primary" @click="openAppealDialog(item)">申诉</el-button>
            </div>
            <!--<div class="cell_dashed"></div>-->
          </div>
          <div v-show="deliveryJobType === 'fail'"v-for="item in unPassList" class="job-item" v-bind:key="item.id + 'fail'" >
            <!--background-color:#fcfaf2-->
            <div class="body-left" >
              <div class="job-title">
                {{item.jobName}}
              </div>
              <div class="job-detail">
                <div class="detail-row">
              <span class="detail-item"  >
                工作类型: {{ formatJobType(item.jobType )}}
              </span>
                  <span style="color: #006284;font-size: 16px">
                招聘人数: {{item.requireNum}}
              </span>
                </div>
                <div class="detail-row">
              <span class="detail-item"  >
                工作地点: {{formatRegion(item.region)  }}
              </span>
                  <span style="color: #006284;font-size: 16px">
                学历要求: {{ formatAcademicRequirements(item.academicRequirements) }}
              </span>
                </div>
              </div>
            </div>
            <div class="body-right" style="padding-right: 20px">
            <span style="font-size: 16px;color: #006284;margin-right: 25px">
              薪资 <span  class="salary-value">{{item.salary }}</span>
            </span>
              <span style="font-size: 16px;color: #006284;margin-right: 25px">{{formatPayMethod(item,'')}}</span>
              <el-button type="primary" @click="toDetailPage(item)">查看详情</el-button>
            </div>
            <!--<div class="cell_dashed"></div>-->
          </div>
        </el-scrollbar>
      </div>
    </div>

    <!--评价弹出框-->
    <el-dialog
      title="编辑评价"
      width="70%"
      center
      :close-on-press-escape="true"
      :visible.sync="evaluationFormVisible"
      :close-on-click-modal="false">

      <el-form
          :model="evaluationForm"
          label-width="7rem"
          :rules="evaluationFormRules"
          ref="evaluationForm">

        <el-row>
          <el-col :span="24" style="display: flex;justify-content: flex-start;align-items: center">
            <el-form-item label="评分" prop="score" style="display: flex;align-items: center">
              <el-rate
                v-model="evaluationForm.score"
                show-score
                allow-half
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="评价详情" prop="desc">
            <vue-editor v-model="evaluationForm.desc"></vue-editor>
          </el-form-item>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="evaluationFormVisible = false">取消</el-button>
        <el-button :disabled="!evaluationDisabled" type="primary" @click.native="addEvaluation">提交</el-button>
      </div>
    </el-dialog>

    <!--申诉弹出框-->
    <el-dialog
      title="编辑申诉"
      width="70%"
      center
      :close-on-press-escape="true"
      :visible.sync="appealFormVisible"
      :close-on-click-modal="false">

      <el-form
        :model="appealForm"
        label-width="7rem"
        :rules="appealFormRules"
        ref="appealForm">

        <el-row>
          <el-form-item label="申诉详情" prop="desc">
            <vue-editor v-model="appealForm.desc"></vue-editor>
          </el-form-item>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="appealFormVisible = false">取消</el-button>
        <el-button :disabled="!appealDisabled" type="primary" @click.native="addAppeal">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>



<script>
  import * as util from "../common/utils/util"
  import store from "../vuex/store"
  import {addAppealAPI, getAllCollectionJobAPI, tGetAppealAPI} from "../api/job";
  import {getPositionOption} from "../common/js/position";
  import {getJobTypeAPI} from "../api/job";
  import {getAllSignUpJobAPI} from "../api/job";
  import {addEvaluationAPI} from "../api/job";
  import {tGetEvaluationAPI} from "../api/job";
  import {VueEditor} from 'vue2-editor'

  export default {
      name: "appliedJob",
    components: {
      VueEditor
    },
      data(){
        return {
          labelPosition:'collection',
          deliveryJobType:'all',
          collectionJobList:[],
          job_type_options: [],
          job_type_child: [],
          addressArray: [],
          region_options:[],
          allSignUpJob:[],
          passList:[],
          unPassList:[],
          unHandleList:[],
          selectJob:{},
          evaluationFormVisible:false,
          evaluationForm:{
            userId:'',
            jobId:'',
            score:0,
            desc:'',
            companyId:''
          },
          evaluationFormRules:{
            score: [{required: true, message: '请打分', trigger: 'blur'}],
            desc: [{required: true, message: '请输入评价详情', trigger: 'blur'}],
          },
          appealFormVisible:false,
          appealForm:{
            userId:'',
            jobId:'',
            desc:'',
            companyId:''
          },
          appealFormRules:{
            desc: [{required: true, message: '请输入申诉详情', trigger: 'blur'}],
          },
          evaluationDisabled:true,
          appealDisabled:true
        }
      },
      computed:{
        user: {
          get: function () {
            return this.$store.state.user;
          },
          set: function () {

          }
        },
      },
      methods:{
        openEvaluationDialog:function(job){
          this.selectJob = job;
          this.evaluationFormVisible = true;
          this.evaluationForm.jobId = job.id;
          this.evaluationForm.userId = this.user.id;
          this.evaluationForm.companyId = job.companyId;
          tGetEvaluationAPI(job.id).then(res=>{
            if (res.code === 200){
              if (!util.isEmpty(res.data)){
                this.evaluationDisabled = false;
                this.evaluationForm = res.data;
              }
            }else if (res.code === 2) {
              this.$store.commit('signInDialogVisibleTrue');
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        addEvaluation:function(){
          this.$refs["evaluationForm"].validate((valid) => {
            if (valid) {
              addEvaluationAPI(this.evaluationForm).then(res=>{
                if (res.code === 200){
                  this.$message.success("评论成功");
                  this.evaluationFormVisible = false;
                }else if (res.code === 2) {
                  this.$store.commit('signInDialogVisibleTrue');
                } else {
                  this.$message.error(res.msg)
                }
              })
            } else {
              return false;
            }
          });
        },

        openAppealDialog:function(job){
          this.selectJob = job;
          this.appealFormVisible = true;
          this.appealForm.jobId = job.id;
          this.appealForm.userId = this.user.id;
          this.appealForm.companyId = job.companyId;
          tGetAppealAPI(job.id).then(res=>{
            if (res.code === 200){
              if (!util.isEmpty(res.data)){
                this.appealDisabled = false;
                this.appealForm = res.data;
              }
            }else if (res.code === 2) {
              this.$store.commit('signInDialogVisibleTrue');
            } else {
              this.$message.error(res.msg)
            }
          })
        },
        addAppeal:function(){
          this.$refs["appealForm"].validate((valid) => {
            if (valid) {
              addAppealAPI(this.appealForm).then(res=>{
                if (res.code === 200){
                  this.$message.success("申诉已提交");
                  this.appealFormVisible = false;
                }else if (res.code === 2) {
                  this.$store.commit('signInDialogVisibleTrue');
                } else {
                  this.$message.error(res.msg)
                }
              })
            } else {
              return false;
            }
          });
        },


        deepTraversal: function (node) {
          if (!util.isEmpty(node)) {
            node.forEach(a => {
              let temp = JSON.parse(JSON.stringify(a));
              this.deepTraversal(temp.children);
              temp.children = "";
              this.addressArray.push(temp);
            });
          }
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

        formatJobType: function (jobType) {
          let temp = JSON.parse(JSON.stringify(jobType));
          let lastItem = temp.pop();
          let result = "";
          this.job_type_child.forEach(a => {
            if (lastItem == a.value) {
              result = a.label;
            }
          });
          return result;
        },
        formatRegion: function (address) {
          let result = "";
          if (util.isEmpty(address)) {
            return result;
          } else {
            let temp = JSON.parse(JSON.stringify(address));
            let last = temp.pop();
            this.addressArray.forEach(a => {
              if (a.value === last) {
                result = a.label;
              }
            });
            return result;
          }
        },
        formatAcademicRequirements: function (index) {
          switch (index) {
            case "0":
              return "不限";
            case "1":
              return "专科";
            case "2":
              return "本科";
            case "3":
              return "研究生";
            case "4":
              return "硕士";
            default:
              break;
          }
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
        toDetailPage:function(row){
          this.$router.push({path: '/jobDetail/', query: {job: JSON.stringify(row)}});
        },
        handleSignUpJob:function (list) {
          list.forEach(a=>{
            if (util.isEmpty(a.selectedUserId)){
              if (a.enableStatus === '4' ){
                //直接关闭 没有选择
                this.unPassList.push(a);
              } else {
                //没有关闭 还没处理
                this.unHandleList.push(a);
              }

            }else {
              if(a.selectedUserId.indexOf(this.user.id) > -1){
                // 有选择 并且在里面
                this.passList.push(a);
              }else {
                if (a.enableStatus === '4' ){
                  //关闭 没有选中
                  this.unPassList.push(a);
                } else {
                  this.unHandleList.push(a);
                }
              }
            }

          })
        }
      },
      mounted(){

        this.region_options = getPositionOption();
        this.deepTraversal(this.region_options);
        //获取所有收藏的兼职
        getAllCollectionJobAPI({}).then(res=>{
          if (res.code === 200){
            this.collectionJobList = res.data;
          } else {
            if (res.code === 2) {
              this.$store.commit('signInDialogVisibleTrue');
            }
            this.$message.error(res.msg);
          }
        });

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


        getAllSignUpJobAPI({}).then(res=>{
          if (res.code === 200){
            if (!util.isEmpty(res.data)){
              this.allSignUpJob = res.data;
              this.handleSignUpJob(this.allSignUpJob);
            }
          } else {
            if (res.code === 2) {
              this.$store.commit('signInDialogVisibleTrue');
            }
            this.$message.error(res.msg);
          }
        })

      }
  }
</script>

<style scoped>
  .job-item {
    width: 100%;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*border: 1px solid rgb(238, 238, 238);*/
    margin-bottom: 18px;
  }

  .body-left{
    height:100%;
    width:60%;
    padding-left: 20px
  }

  .salary-value{
    color: rgb(255,129,45);
    font-size: 1.4rem;
    font-weight: bold;
  }

  .job-item .body-right {
    height: 100%;
    width: 40%;
    display: flex;
    justify-content: flex-end;
    align-items: center
  }

  .job-item .job-title {
    height: 40%;
    width: 100%;
    font-size: 18px;
    display: flex;
    justify-content: flex-start;
    align-items: center
  }

  .job-item .job-detail {
    height: 60%;
    width: 100%;
  }

  .job-item .job-detail .detail-row {
    height: 50%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .detail-row .detail-item {
    color: #006284;
    font-size: 16px;
    margin-right: 150px
  }

  .cell_dashed {

    border-bottom: 1px dashed #999999;
    height: 1rem;
    /*width: 70%;*/
    margin: auto;
    margin-top: 15px;
    margin-bottom: 20px;
  }


  >>> .el-scrollbar {
    height: 100%;
    max-height: 100%;
  }
</style>

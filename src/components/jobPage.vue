<template>
  <section>
    <!--<div v-if="sele">-->
    <div style="width: 100%;height: 100%;position: relative;;">
      <!--工具条-->
      <div style="width: 100%;" class="global_toolbar">
        <el-form :inline="true" ref="filter" :model="this.filter">

          <el-row>
            <el-col :span="24" style="display: flex;justify-content: flex-start">
              <el-form-item>
                <el-input @blur="this.query" v-model="filter.jobName" placeholder="兼职名" style="width: 14rem">
                </el-input>
              </el-form-item>

              <el-form-item>
                <el-cascader
                  @change="this.query"
                  style="width: 14rem"
                  :options="job_type_options"
                  placeholder="职位"
                  v-model="filter.jobType">
                </el-cascader>
              </el-form-item>

              <el-form-item>
                <el-select @change="this.query" v-model="filter.payMethod" placeholder="结算方式" style="width: 14rem">
                  <el-option
                    v-for="item in job_pay_method_options"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>


              <el-form-item>
                <el-select @change="this.query" v-model="filter.gender" placeholder="性别要求" style="width: 14rem">
                  <el-option
                    v-for="item in editForm_gender_options"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-select @change="this.query" v-model="filter.academicRequirements" placeholder="学历要求"
                           style="width: 14rem">
                  <el-option
                    v-for="item in job_academic_requirements_options"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-cascader
                  @change="this.query"
                  placeholder="地区"
                  style="width: 14rem"
                  :options="region_options"
                  v-model="filter.region">
                </el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="24" style="display: flex;justify-content: flex-end;">
              <el-form-item>
                <el-radio-group v-model="filter.sort" size="normal" @change="this.query">
                  <el-radio-button label="default">推荐排序</el-radio-button>
                  <el-radio-button label="new">最新发布</el-radio-button>
                  <el-radio-button label="salary">工资最高</el-radio-button>
                </el-radio-group>
              </el-form-item>

              <el-form-item style="margin-right: 0px">
                <el-button type="primary" @click.native="resetFilters">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>


      <div v-loading="loading"
           style="width: 100%;height: auto;position: absolute;top: 120px;left: 0;height:calc(100% - 165px);overflow-y:scroll;overflow-x:hidden;">
        <div v-for="item in dataList" class="job-item" v-bind:key="item.id" style="">
          <!--background-color:#fcfaf2-->
          <div class="body-left" style="height:100%;width:60%;padding-left: 20px">
            <div class="job-title">
              {{item.jobName}}
            </div>
            <div class="job-detail">
              <div class="detail-row">
              <span class="detail-item" style="width: 400px;display: flex;justify-content: flex-start">
                工作类型: {{ formatJobType(item.jobType )}}
              </span>
                <span style="color: #006284;font-size: 16px">
                招聘人数: {{item.requireNum}}
              </span>
              </div>
              <div class="detail-row">
              <span class="detail-item" style="width: 400px;display: flex;justify-content: flex-start">
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
              薪资 <span style="color: rgb(255,129,45);font-size: 1.4rem;font-weight: bold">{{item.salary }}</span>
            </span>
            <span style="font-size: 16px;color: #006284;margin-right: 25px">{{formatPayMethod(item,'')}}</span>
            <el-button type="primary" @click="toDetailPage(item)">查看详情</el-button>
          </div>
          <!--<div class="cell_dashed"></div>-->
        </div>
      </div>

      <!--分页-->
      <div :span="24" class="toolbar" style="position: absolute;right: 0;bottom: 10px">
        <el-pagination style="float:right;"
                       :disabled="userState"
                       @current-change="handleCurrentChange"
                       :current-page="filter.currentPage"
                       :page-size="filter.pageSize"
                       layout="total,  prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>

    <!--</div>-->
    <!--<div v-else>-->
    <!--<center><h2>亲爱的用户,您暂时没有权限查看哦.</h2></center>-->
    <!--</div>-->
  </section>
</template>

<script>

  import {
    addJobAPI, deleteJobAPI,
    dropListOneGetApi, getCompanyListAPI,
    getJobTypeAPI, personJobPageAPI, sendToMQ
  } from "../api/job";
  import store from "../vuex/store"
  import * as util from "../common/utils/util"
  import {VueEditor} from 'vue2-editor'
  import {getPositionOption} from "../common/js/position";

  export default {
    name: "jobpage",
    components: {
      VueEditor
    },
    data() {

      return {
        loading: false,
        mainName: "兼职",
        //options --------------------------
        editForm_gender_options: [{
          value: -1,
          label: '性别不限'
        }, {
          value: 0,
          label: '仅限男生'
        }, {
          value: 1,
          label: '仅限女生'
        }],
        editForm_type_options: [{
          value: 0,
          label: '线下'
        }, {
          value: 1,
          label: '线上'
        }],
        job_salary_treatment_options: [],
        job_pay_method_options: [],
        job_type_options: [],
        region_options: [],
        addressArray: [],
        editForm_enableStatus_options: [],
        userTypeList: [],
        userStatusList: [],
        companyList: [],
        job_academic_requirements_options: [],
        job_type_child: [],
        //稍微修改--------
        filter: {
          jobName: "",
          jobType: [],
          payMethod: "",
          gender: -1,
          academicRequirements: '',
          region: [],
          sort: 'default',
          pageNum: 0,
          pageSize: 10
        },
        //不用改----------
        dataList: [],
        total: 0,
        editFormVisible: false,
        total: 0,
        title: "",
      }

    },
    computed: {
      userState: {
        get: function () {
          let str = localStorage.getItem("user");
          if (util.isEmpty(str)) {
            console.log("user 为空")
            return true;
          } else {
            let user = JSON.parse(str);
            if (user.userStatus === 4) {
              console.log("用户状态异常");
              return true;
            } else {
              console.log("用户状态异常");
              return false;
            }
          }
        },
        set: function () {

        }
      },
      user: {
        get: function () {
          let str = localStorage.getItem("user");
          if (util.isEmpty(str)) {
            console.log("user 为空")
            return "";
          } else {
            let temp = JSON.parse(str);
            console.log("生气  " + this.contain(temp.roleId, 3));
            return temp;
          }
        },
        set: function () {

        }
      }
    },
    methods: {
      toDetailPage: function (row) {
        let history = {
          userId:'',
          jobId:''
        };
        history.jobId = row.id;
        history.userId = this.user.id;
        sendToMQ(JSON.stringify(history)).then();

        row.userId = this.user.id;
        let temp = JSON.parse(JSON.stringify(row));
        // todo 数据推送到消息队列

        this.$router.push({path: '/jobDetail/', query: {job: JSON.stringify(row)}});
        // this.$router.push({path: '/jobDetail/' + row.id})
      },

      //需要修改的函数------------------------------
      resetFilters: function () {
        this.filter = {
          jobName: "",
          jobType: [],
          payMethod: "",
          gender: -1,
          academicRequirements: '',
          region: [],
          sort: 'default',
          pageNum: 0,
          pageSize: 10
        };
        this.query();
      },

      //基本不需要修改的函数-----------------------
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

      contain: function (arr, val) {
        return arr.indexOf(val) != -1 ? true : false;
      },

      handleEdit: function (index, row) {
        this.editForm = JSON.parse(JSON.stringify(row));
        this.editFormVisible = true;
        this.title = "编辑" + this.mainName;
      },

      editDialogClose: function () {
        this.resetEditForm();
      },

      //处理页面跳转事件
      handleCurrentChange: function (val) {
        this.filter.pageNum = val - 1;
        this.query();
      },

      //新增或编辑提交  修改接口
      add: function () {
        this.$refs["editForm"].validate((valid) => {
          if (valid) {
            addJobAPI(this.editForm).then(res => {
              if (res.code === 200) {
                if (this.title === "编辑" + this.mainName) {
                  this.$message.success("编辑" + this
                    .mainName + "成功");
                } else {
                  this.$message.success("新增" + this.mainName + "成功");
                }
                this.editFormVisible = false;
                this.query();
              } else if (res.code === 2) {
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

      query: function () {
        this.loading = true;
        console.log("分页请求");
        personJobPageAPI(this.filter).then(res => {
          this.loading = false;
          if (res.code === 200) {
              this.dataList = res.data.content;
              this.total = res.data.totalElements;

          } else if (res.code === 2) {
            this.$store.commit('signInDialogVisibleTrue');
          } else {
            this.$message.error(res.msg)
          }
        }).catch(e => {
          console.log("出错了" + e);
        });

      },

      //点击新增按钮
      addButtonClick: function () {
        this.editFormVisible = true;
        this.title = '新增' + this.mainName;
      },
      //点击删除按钮
      handleDel: function (scop, row) {

        this.$confirm('此操作将永久删除该' + this.mainName + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteJobAPI(row.id).then(res => {
            if (res.code === 200) {
              this.query();
              this.$message.success("删除成功");
            } else {
              if (res.code === 2) {
                this.$store.commit('signInDialogVisibleTrue');
              }
              this.$message.error(res.msg);
            }
          })
        }).catch(() => {
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
      formatPayMethod: function (row, column) {
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
      }
      ,

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

      formatNeedResume: function (row, column) {
        if (row.needResume === true) {
          return "需要";
        } else if (row.needResume === false) {
          return "不需要";
        } else {
          return "";
        }
      },

      formatUserSex: function (row, column) {
        if (row.gender === 0) {
          return "限男生";
        } else if (row.sex === 1) {
          return "限女生";
        } else {
          return "无限制";
        }
      }
    },
    mounted() {

      dropListOneGetApi("job_academic_requirements_options").then(res => {
        if (res.code === 200) {
          this.job_academic_requirements_options = res.data;
        } else {
          console.error("学历要求下拉列表获取失败");
        }
      });


      dropListOneGetApi("job_pay_method").then(res => {
        if (res.code === 200) {
          this.job_pay_method_options = res.data;
        } else {
          console.error("结算方式下拉列表获取失败");
        }
      });


      getJobTypeAPI().then(res => {
        if (res.code === 200) {
          this.job_type_options = res.data;
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

      getCompanyListAPI().then(res => {
        if (res.code === 200) {
          this.companyList = res.data;
        } else {
          console.error("工作类型下拉列表获取失败");
        }

      });

      this.region_options = getPositionOption();
      this.deepTraversal(this.region_options);
      this.query();
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
</style>

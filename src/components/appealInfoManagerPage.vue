<template>
  <section>
    <!--<div v-if="sele">-->
    <div style="width: 100%;height: 100%;position: relative;">
      <!--table-->
      <div style="position: relative">
        <!--列表-->
        <el-table :data="list"
                  stripe
                  highlight-current-row
                  v-loading="listLoading"
                  :header-row-class-name="'global_table_th'"
                  :row-class-name="'global_table_tr'"
                  :cell-class-name="'global_table_normal'"
                  style="width: 100%;position: absolute;top: 0;left: 0">
          <el-table-column prop="userInfo.name" label="申诉人" min-width="30" align="center">
          </el-table-column>
          <el-table-column prop="userInfo.phone" label="申诉人手机" min-width="30" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="申诉日期" min-width="40" align="center" :formatter="getNowFormatDate">
          </el-table-column>
          <el-table-column prop="companyInfo.companyName" label="公司名称" min-width="40" align="center">
          </el-table-column>
          <el-table-column prop="companyInfo.contactPhone" label="公司联系方式" min-width="40" align="center">
          </el-table-column>
          <el-table-column prop="jobInfo.jobName" label="职位名称" min-width="80" align="center">
          </el-table-column>
          <el-table-column label="操作" width="140" align="center">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" content="申诉详情" placement="top">
                <el-button size="mini" type="text" icon="el-icon-view"
                           @click="handleView(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="有关职位" placement="top">
                <el-button size="mini" type="text" icon="el-icon-view"
                           @click="toDetailPage(scope.row.jobInfo)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div :span="24" class="toolbar" style="position: absolute;right: 0;bottom: 10px">
        <el-pagination style="float:right;"
                       @current-change="handleCurrentChange"
                       :current-page="filter.pageNum"
                       :page-size="filter.pageSize"
                       layout="total,  prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <!--申诉弹出框-->
    <el-dialog
      title="申诉详情"
      width="50%"
      center
      :close-on-press-escape="true"
      :visible.sync="appealFormVisible"
      :close-on-click-modal="false">

      <div class="appealInfo-detail" v-html="this.selectRow.desc">

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="appealFormVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import * as util from "../common/utils/util"
  import store from "../vuex/store"
  import {VueEditor} from 'vue2-editor'
  import {pageFindAppealAPI} from "../api/job";

  export default {
    name: "appealInfoManagerPage",
    data() {
      return {
        appealFormVisible: false,
        list: [],
        listLoading: false,
        filter: {
          pageNum: 0,
          pageSize: 10
        },
        total: 0,
        selectRow: {}
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
      getNowFormatDate: function (row) {
        var day = new Date(row.createTime);
        var Year = 0;
        var Month = 0;
        var Day = 0;
        var Hour = 0;
        var Minute = 0;
        var Second = 0;
        var CurrentDate = "";
        Year = day.getFullYear();//支持IE和火狐浏览器.
        Month = day.getMonth() + 1;
        Day = day.getDate();
        Hour = day.getHours();
        Minute = day.getMinutes();
        Second = day.getSeconds();
        CurrentDate += Year + '/';
        if (Month >= 10) {
          CurrentDate += Month + '/';
        }
        else {
          CurrentDate += "0" + Month + '/';
        }
        if (Day >= 10) {
          CurrentDate += Day + ' ';
        }
        else {
          CurrentDate += "0" + Day + ' ';
        }
        if (Hour >= 10) {
          CurrentDate += Hour + ':';
        } else {
          CurrentDate += '0' + Hour + ':';
        }
        if (Minute >= 10) {
          CurrentDate += Minute + ':';
        } else {
          CurrentDate += '0' + Minute + ':';
        }
        if (Second >= 10) {
          CurrentDate += Second;
        } else {
          CurrentDate += '0' + Second;
        }
        return CurrentDate;
      },
      toDetailPage: function (row) {
        this.$router.push({path: '/jobDetail/', query: {job: JSON.stringify(row)}});
        // this.$router.push({path: '/jobDetail/' + row.id})
      },
      handleCurrentChange: function (val) {
        this.filter.pageNum = val - 1;
        this.query();
      },
      handleView: function (index, row) {
        this.selectRow = row;
        this.appealFormVisible = true;
      },
      query: function () {
        pageFindAppealAPI(this.filter).then(res => {

          if (res.code === 200) {
            if (!util.isEmpty(res.data)) {
              this.total = res.data.totalElements;
              this.list = res.data.content;
            }
          } else if (res.code === 2) {
            this.$store.commit('signInDialogVisibleTrue');
          } else {
            this.$message.error(res.msg)
          }

        })
      }
    },
    mounted: function () {
      this.query();
    }
  }
</script>

<style scoped>
  >>> .appealInfo-detail p {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
  }
</style>

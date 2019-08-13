<!--博客管理-->
<template>
  <section style="width: 100%;height: 100%">
    <div class="body-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="query.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="query.kind" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者名称">
            <el-col :span="18">
              <el-form-item prop="createTime">
                <el-input v-model="query.authorName" placeholder="作者名" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="getPageData" type="primary" icon="el-icon-search" title="查询"></el-button>
            <el-button @click="resetQuery" >重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="55">
        </el-table-column>

        <el-table-column
          prop="title"
          label="标题"
          width="300">
          <template slot-scope="scope">
            <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.title}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="authorName"
          label="作者"
          width="80">
        </el-table-column>

        <el-table-column
          prop="categories"
          label="分类"
          :formatter="kindFormatter"
          width="140">
        </el-table-column>

        <el-table-column
          center
          prop="date"
          label="发布日期"
          sortable
          width="170">
          <template slot-scope="scope">
            {{formatTime( scope.row.presentTime) }}
          </template>
        </el-table-column>

        <el-table-column
          prop="readCount"
          label="浏览量"
          sortable
          width="90"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="likeCount"
          label="收藏量"
          sortable
          width="90"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          label="评论数"
          width="90"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{isEmpty(scope.row.comment) ? 0: scope.row.comment.length }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="status"
          label="状态"
          width="80"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch
              :active-value= '1'
              :inactive-value= '0'
              active-color="#13ce66"
              inactive-color="#ff4949"
              v-model="scope.row.status"
              @change=switchChange(scope.row)>
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column
          prop="topNotice"
          align="center"
          label="置顶"
          width="50">
          <template slot-scope="scope">
            <el-switch
              active-color="#13ce66"
              inactive-color="#ff4949"
              v-model="scope.row.isTop"
              @change=isTopChange(scope.$index,scope.row)>
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleViewDetails(scope.row)" type="text">查看</el-button>
            <!--            <el-button type="text" @click="handleDelete">隐藏</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="query.pageNum"
          :page-size="query.pageSize"
          background
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
  import {blogManagerPageAPI, changeBlogStatusApi, changeBlogTopApi, dropListOneGetApi} from "../../api/api";
  import * as util from "../../common/utils/util";

  export default {
    name: "blogManager",
    data() {
      return {
        selectRow: [],
        tableData: [],
        dialogArticleVisible: false,
        options: [],
        categoryValue: '', //分类查询
        handleSizeChange: '',
        query:{
          pageNum: 1,
          pageSize: 8,
          title:'',
          kind:'',
          authorName:''
        },
        total:0
      }
    },
    methods: {
      switchChange:function(row){
        changeBlogStatusApi(row).then();
      },
      isTopChange:function(status,row){
        changeBlogTopApi(row).then();
      },
      handleCurrentChange: function(now){
        this.query.pageNum = now;
        this.getPageData();
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
      kindFormatter:function(row, column, cellValue, index){
        let temp = "";
        for (let a of this.options){
          if (a.value === row.kind){
            temp = a.label;
          }
        }
        return temp;
      },


      formatTime: function (millisecond) {
        let dateFormat = "";
        let date = new Date();
        date.setTime(millisecond);
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let day = date.getDate();
        if (day < 10) day = "0" + day;
        let hours = date.getHours();
        if (hours < 10) hours = "0" + hours;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        let seconds = date.getSeconds()
        if (seconds < 10) seconds = "0" + seconds;
        dateFormat = date.getFullYear() + "-" +
          month + "-" +
          day + "  " +
          hours + ":" +
          minutes + ":" +
          seconds//yyyy-MM-dd 00:00:00格式日期
        return dateFormat;
      },

      handleDelete() {
        this.$confirm('此操作将隐藏该文, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '隐藏成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消隐藏'
          });
        });
      },
      //查看博客详情
      handleViewDetails(row) {
        this.$router.push({path: '/readBlogPage', query: {article: JSON.stringify(row)}})
        this.selectRow = row;
      },
      resetQuery:function(){
        this.query.title = '';
        this.query.kind = '';
        this.query.authorName = '';
        this.getPageData();
      },
      getPageData: function () {
        let temp = JSON.parse(JSON.stringify(this.query));
        temp.pageNum -= 1;
        blogManagerPageAPI(temp).then(res => {
           if (res.code === 200){
             if (!util.isEmpty(res.data)){
               this.tableData = res.data.content;
               this.total = res.data.totalElements;
             }
           }else if (res.code === 2) {
             this.$store.commit('signInDialogVisibleTrue');
             this.$router.push({path: '/meetingPage',query: {isError: true}});
           } else {
             this.$message.error(res.msg)
           }
        })
      }
    },
    mounted() {
      dropListOneGetApi("ugc_blog_options").then(res => {
        if (res.code === 200) {
          this.options = res.data;
          this.getPageData();
        } else {
          console.error("博客类型下拉列表获取失败");
        }
      });

      this.getPageData();
    }
  }
</script>

<style scoped>
  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0;

  }

  .body-main {
    /*padding: 20px;*/
    margin: 10px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
    float: right;
  }
</style>

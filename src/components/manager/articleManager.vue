<template>
  <section style="width: 100%;height: 100%">
    <div class="body-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="categoryValue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-col :span="18">
              <el-form-item prop="createTime">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查询"></el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="index"
          label="编号"
          width="55">
        </el-table-column>

        <el-table-column
          prop="title"
          label="标题"
          width="280">
        </el-table-column>

        <el-table-column
          prop="author"
          label="作者"
          width="80">
        </el-table-column>

        <el-table-column
          prop="categories"
          label="分类"
          width="120">
        </el-table-column>

        <el-table-column
          prop="content"
          label="简介"
          width="300"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="date"
          label="发布日期"
          sortable
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
          width="80"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="topNotice"
          label="置顶"
          width="50">
          <template slot-scope="scope">
            <el-switch
              active-color="#13ce66"
              inactive-color="#ff4949"
              v-model="scope.row.topNotice"
              on-text="是"
              off-text="否"
              @change=change(scope.$index,scope.row)>
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleViewDetails(scope.row)" type="text">查看</el-button>
            <el-button type="text" @click="handleDelete">隐藏</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          background
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div></div>
    <!--会议文章详情弹窗-->
    <el-dialog
      :visible.sync="dialogArticleVisible">
      <el-row>
        <el-col :span="24" style="text-align:center"><h3>{{selectRow.title}}</h3></el-col>
      </el-row>
      <el-row :gutter="20" style="color: #8c939d">
        <el-col :span="8"><p>作者：<span style="font-weight: bold">{{selectRow.author}}</span></p></el-col>
        <el-col :span="8"><p>发布时间：<span style="font-weight: bold">{{selectRow.date}}</span></p></el-col>
        <el-col :span="8"><p>分类：<span style="font-weight: bold">{{selectRow.categories}}</span></p></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div style="text-indent: 2em">
            {{selectRow.content}}
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogArticleVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogArticleVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>


<script>
    export default {
        name: "articleManager",
        data() {
            return {
                selectRow: {},
                tableData: [{
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: '好听的会议',
                    content: '5G流量统统不要钱走过路过不要错过15926',
                    topNotice: true,
                    status:'正常'
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: '好听的会议',
                    content: '5G流量统统不要钱走过路过不要错过15926',
                    topNotice: true,
                    status:'隐藏',
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: '好听的会议',
                    content: '5G流量统统不要钱走过路过不要错过15926',
                    topNotice: true,
                    status:'正常',
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: '好听的会议',
                    content: '5G流量统统不要钱走过路过不要错过15926',
                    topNotice: true,
                    status:'正常',
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: '好听的会议',
                    content: '5G流量统统不要钱走过路过不要错过15926',
                    topNotice: false,
                    status:'正常'
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: '好听的会议',
                    content: '5G流量统统不要钱走过路过不要错过15926',
                    topNotice: false,
                    status:'隐藏',
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: '好听的会议',
                    content: '5G流量统统不要钱走过路过不要错过15926',
                    topNotice: false,
                    status:'正常',
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: '好听的会议',
                    content: '5G流量统统不要钱走过路过不要错过15926',
                    topNotice: false,
                    status:'隐藏',
                }],
                dialogArticleVisible: false,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                categoryValue: '', //分类查询
                handleSizeChange: '',
                currentPage3: '',
                handleSelectionChange: '',
                handleCurrentChange: '',
            }
        },
        methods: {
            handleDelete() {
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //查看详情
            handleViewDetails(row) {
                this.selectRow = row;
                this.dialogArticleVisible = true;
            }

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

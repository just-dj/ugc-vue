<!--博客管理-->
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
          width="300">
        </el-table-column>

        <el-table-column
          prop="author"
          label="作者"
          width="80">
        </el-table-column>

        <el-table-column
          prop="categories"
          label="分类"
          width="150">
        </el-table-column>

        <el-table-column
          prop="date"
          label="发布日期"
          sortable
          width="150">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>

        <el-table-column
          prop="cntView"
          label="浏览量"
          sortable
          width="90"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="cntCollect"
          label="收藏量"
          sortable
          width="90"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="cntStar"
          label="点赞数"
          sortable
          width="90"
          show-overflow-tooltip>
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
  </section>
</template>

<script>
    export default {
        name: "blogManager",
        data() {
            return {
                selectRow: {},
                tableData: [{
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: 'Python',
                    cntStar:'100',
                    cntCollect:'120',
                    cntView:'400',
                    topNotice: true,
                    status:'正常'
                }, {
                    date: '2019-08-04',
                    author: '单小车',
                    title: '区块链钱包开发过程（一）',
                    categories: '区块链',
                    cntStar:'100',
                    cntCollect:'120',
                    cntView:'200',
                    topNotice: true,
                    status:'隐藏',
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: '基于Vue+elementUI的博客开发',
                    categories: '前端开发',
                    cntStar:'100',
                    cntCollect:'120',
                    cntView:'312',
                    topNotice: true,
                    status:'正常',
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: 'MongoDB学习心得',
                    categories: '数据库',
                    cntStar:'0',
                    cntCollect:'0',
                    cntView:'0',
                    topNotice: true,
                    status:'正常',
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: '物联网',
                    cntStar:'0',
                    cntCollect:'0',
                    cntView:'400',
                    topNotice: false,
                    status:'正常'
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: '大数据',
                    cntStar:'100',
                    cntCollect:'120',
                    cntView:'400',
                    topNotice: false,
                    status:'隐藏',
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: '网络安全',
                    cntStar:'100',
                    cntCollect:'120',
                    cntView:'400',
                    topNotice: false,
                    status:'正常',
                }, {
                    date: '2019-08-04',
                    author: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    categories: '运营维护',
                    cntStar:'100',
                    cntCollect:'120',
                    cntView:'400',
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
                this.selectRow = row;
               this.$router.push('bbsPage');
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

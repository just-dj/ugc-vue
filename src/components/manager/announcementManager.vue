<!--登录公告页-->
<template>
  <section style="width: 100%;height: 100%;">
    <div class="body-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;text-align: left">
        <el-dropdown placement="bottom-start">
          <el-button type="primary" icon="el-icon-search" title="查询"><i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-form :inline="true" class="demo-form-inline" style="padding: 10px">
              <el-form-item label="标题">
                <el-input placeholder="标题" v-model="searchTitle"></el-input>
              </el-form-item>
              <el-form-item label="发布时间">
                <el-col :span="18">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"
                                    v-model="createTime"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-form>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" icon="el-icon-plus" title="新增" @click="addAnnouncement"></el-button>
      </el-col>

      <el-table
        ref="multipleTable"
        :data="tableData.filter(data=>!searchTitle||!createTime)"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="index"
          label="编号"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布日期"
          sortable
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="公告标题"
          width="380">
        </el-table-column>

        <el-table-column
          prop="content"
          label="公告内容"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="istop"
          label="置顶"
          width="80"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch
              active-color="#13ce66"
              inactive-color="#ff4949"
              v-model="scope.row.topNotice"
              @change=change(scope.$index,scope.row)>
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleDetails(scope.row)" type="text">查看</el-button>
            <el-button type="text" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block pagination" style="float: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          background
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
    <!-- 弹窗-->
    <el-dialog
      :title="dialogStatus"
      :visible.sync="dialogFormVisible"
      center>
      <el-form :model="form">
        <el-form-item label="公告标题" :label-width="formLabelWidth" :required="true">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布人" :label-width="formLabelWidth">
          <el-input v-model="form.announcer" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" :label-width="formLabelWidth" :required="true">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm('form')">确 定</el-button>
      </div>
    </el-dialog>

    <!--公告详情弹窗-->
    <el-dialog
      title="公告详情"
      :visible.sync="dialogDetailVisible">
      <el-row>
        <el-col :span="24" style="text-align:center"><h3>{{selectRow.title}}</h3></el-col>
      </el-row>
      <el-row :gutter="20" style="color: #8c939d">
        <el-col :span="8"><p>作者：<span style="font-weight: bold">{{selectRow.announcer}}</span></p></el-col>
        <el-col :span="16"><p>发布时间：<span style="font-weight: bold">{{selectRow.date}}</span></p></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div style="text-indent: 2em">
            {{selectRow.content}}
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogDetailVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </section>

</template>

<script>
    export default {
        name: "announcementManager",
        data() {
            return {
                selectRow: {},
                searchTitle: "",
                createTime: "",
                tableData: [{
                    date: '2019-08-04',
                    announcer: '单总',
                    title: '关于5G资费套餐调整的公告标题1',
                    content: '5G流量统统不要钱走过路过不要错过15926',
                    topNotice: true
                }, {
                    date: '2019-08-04',
                    announcer: '强哥',
                    title: '关于5G资费套餐调整的公告标题2',
                    content: '5G流量统统不要钱走过路过不要错过15926',
                    topNotice: true
                }, {
                    date: '2019-08-04',
                    announcer: '王大锤',
                    title: '关于5G资费套餐调整的公告标题3',
                    content: '5G流量统统不要钱走过路过不要错过15926',
                    topNotice: false
                }, {
                    date: '2019-08-04',
                    announcer: '毛老板',
                    title: '关于5G资费套餐调整的公告标题4',
                    content: '5G流量统统不要钱走过路过不要错过15926'
                }, {
                    date: '2019-08-04',
                    announcer: '亮仔',
                    title: '关于5G资费套餐调整的公告标题1',
                    content: '5G流量统统不要钱走过路过不要错过15926'
                }],
                dialogFormVisible: false,
                dialogDetailVisible: false,
                form: {
                    title: '', //公告标题
                    announcer: '强哥',//发布者
                    content: '',//公告内容

                },
                formLabelWidth: '120px',
                //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
                dialogStatus: '',
                handleSizeChange: '',
                currentPage3: '',
                handleSelectionChange: '',
                handleCurrentChange: '',

            }
        },
        methods: {
            //初始化弹窗表单
            dialogOpen: function (type, row) {
                this.dialogFormVisible = true;
                console.log(type);
                if (type === 'add') {
                    //新增弹框标题
                    this.dialogStatus = "新增公告 ";
                    this.form = {
                        announcer: '强哥',
                        content: '',
                        title: '',
                    };
                } else if (type === "edit") {
                    //编辑弹框标题
                    this.dialogStatus = "编辑公告";
                    //表单回填
                    this.form = JSON.parse(JSON.stringify(row));
                }
            },
            //新增
            addAnnouncement() {
                this.dialogOpen("add", '');
            },
            //编辑
            handleEdit(index, row) {
                this.dialogOpen("edit", row);
            },
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
            handleDetails(row) {
                this.selectRow = row;
                this.dialogDetailVisible = true;

                //this.dialogStatus=row.title;
            },

            //确认新增公告提交表单
            addConfirm: function (form) {
                console.log(this.form.title);
            }
        }
    }


</script>

<style scoped>
  .body-main {
    /*padding: 20px;*/
    margin: 10px;
  }

  .toolbar {
    margin-bottom: 10px;
  }

  .pagination {
    margin-top: 20px;
    /*text-align: center;*/
  }


</style>

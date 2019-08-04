<template>
  <section style="width: 100%;height: 100%;">
    <div class="body-main">
      <div class="breadcrumb-container">
        <strong class="title">公告管理</strong>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="float:right">
          <el-breadcrumb-item :to="{ path: '/' }">公告管理</el-breadcrumb-item>
          <el-breadcrumb-item>公告列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-col :span="18">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" title="查询"></el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" title="新增" @click="addAnnouncement"></el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      </div>
    </div>
    <!-- 弹窗-->
    <el-dialog
      :title="titleMap[dialogStatus]"
      :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="公告标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布人" :label-width="formLabelWidth">
          <el-input v-model="form.name" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--新增公告界面-->
    <el-dialog title="新增公告" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="公告标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布人" :label-width="formLabelWidth">
          <el-input v-model="form.name" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </section>

</template>

<script>
    export default {
        name: "announcementManager",
        data() {
            return {
                tableData: [{
                    date: '2019-08-04',
                    title: '关于5G资费套餐调整的公告标题1',
                    content: '5G流量统统不要钱走过路过不要错过15926'
                }, {
                    date: '2019-08-04',
                    title: '关于5G资费套餐调整的公告标题1',
                    content: '5G流量统统不要钱走过路过不要错过15926'
                }, {
                    date: '2019-08-04',
                    title: '关于5G资费套餐调整的公告标题1',
                    content: '5G流量统统不要钱走过路过不要错过15926'
                }, {
                    date: '2019-08-04',
                    title: '关于5G资费套餐调整的公告标题1',
                    content: '5G流量统统不要钱走过路过不要错过15926'
                }, {
                    date: '2019-08-04',
                    title: '关于5G资费套餐调整的公告标题1',
                    content: '5G流量统统不要钱走过路过不要错过15926'
                }],
                dialogFormVisible: false,
                form: {
                    title: '', //公告标题
                    name: '强哥',//发布者
                    desc: '',//公告内容

                },
                formLabelWidth: '120px',
                //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
                titleMap: {
                    addEquipment: '新增公告',
                    editEquipment: "编辑公告"
                },
                //新增和编辑弹框标题
                dialogStatus: "",

            }
        },
        methods: {
            //新增
            addEquipment() {
                //显示弹框
                this.dialogFormVisible = true;
                //新增弹框标题
                this.dialogStatus = "添加公告";
            },
            //编辑
            handelEdit() {
                //显示弹框
                this.dialogFormVisible = true;
                //编辑弹框标题
                this.dialogStatus = "编辑公告"
            },
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

  }

  .breadcrumb-container {

  }

  .breadcrumb-container .title {
    width: 200px;
    float: left;
    color: #475669;
  }

</style>

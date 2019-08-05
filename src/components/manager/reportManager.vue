<template>
  <section style="width: 100%;height: 100%">
    <div style="background-color: #708090;height: 75px;line-height: 75px;font-size: 20px;color: #fff">未处理消息:<span style="font-size: 30px;color: #FFD640"> 32 </span>条</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="date"
        label="提交日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="举报人昵称"
        width="140">
      </el-table-column>
      <el-table-column
        prop="articleName"
        label="被举报文章"
        wideth="200">
        <template slot-scope="scope">
          <span class="overflow">{{scope.row.articleName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="reason"
        label="举报原因"
        wideth="200">
        <template slot-scope="scope">
          <span class="overflow">{{scope.row.reason}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="check"
        label="审核"
        wideth="50">
        <template slot-scope="scope">
          <el-button type="text" @click="dialogVisible = true"><i style="font-size: large" class="el-icon-view"></i>文章预览</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="处理"
        width="180">
        <template slot-scope="scope">
          <el-button @click="deleteArticle()" type="text"><i style="font-size: large" class="el-icon-delete"></i></el-button>
          <el-button @click="ignoreItem()" type="text">忽略</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--查看文章弹窗-->
    <el-dialog
      title="标题"
      center="true"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <div style="height: 400px"></div>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>

    <!--分页-->
    <div class="block" align="center" >
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div>
  </section>
</template>

<script>
  import ElTag from "../../../node_modules/element-ui/packages/tag/src/tag";
    export default {
      components: {ElTag},
      data() {
        return {
          activeIndex2:'',
          handleSelect:'',
          checked:'',
          currentPage3:'',
          handleSizeChange:'',
          handleCurrentChange:'',
          dialogVisible: false,

          tableData: [{
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          },{
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          },{
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          },{
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
          }, {
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          },{
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          },{
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          },{
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          }
          ]
        }
      },

      methods:{
//        checkArticle(){
//
//        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        ignoreItem(){
          this.$confirm('忽略该举报信息？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        deleteArticle(){
          this.$confirm('确认删除该文章？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }
      },
      name: "reportManager"
    }
</script>

<style scoped>
  .block{
    position: absolute;
    top: 700px;
    right: 20px;
  }

  .overflow{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

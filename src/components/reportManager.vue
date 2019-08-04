<template>
  <section style="width: 100%;height: 100%">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff">
      <el-menu-item index="1">未处理消息:<span style="font-size: 30px;color: #FFD640;"> 32 </span>条</el-menu-item>
    </el-menu>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="select"
        label=""
        width="50">
        <el-checkbox v-model="checked"></el-checkbox>
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="提交日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="举报人昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="articleName"
        label="被举报文章"
        wideth="180">
      </el-table-column>
      <el-table-column
        prop="reason"
        label="举报原因"
        wideth="180">
      </el-table-column>
      <el-table-column
        prop="check"
        label="审核"
        wideth="180">
        <template slot-scope="scope">
          <el-button @click="checkArticle()" type="text" size="small">进入查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button @click="deleteArticle()" type="text" size="small">删除</el-button>
          <el-button @click="ignoreItem()" type="text" size="small">忽略</el-button>
        </template>
      </el-table-column>
    </el-table>

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
  import ElTag from "../../node_modules/element-ui/packages/tag/src/tag";
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

          tableData: [{
            checked: true,
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          },{
            checked: true,
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          },{
            checked: true,
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          },{
            checked: true,
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          }, {
            checked: true,
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          },{
            checked: true,
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          },{
            checked: true,
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          },{
            checked: true,
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          }, {
            checked: true,
            id: '0001',
            date: '2016-05-03',
            name: '王小虎',
            articleName: '程序员的养生秘籍',
            reason: '涉黄，反动'
          }, {
            checked: true,
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
        checkArticle(){

        },
        ignoreItem(){

        },
        deleteArticle(){

        }
      },
      name: "reportManager"
    }
</script>

<style scoped>
  .block{
    position: absolute;
    top: 700px;
    right: 15px;

  }
</style>

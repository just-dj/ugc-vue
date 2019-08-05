<template>
    <section style="width: 100%;height: 100%;">
      账号管理
      <el-table
        :data="roleData"
        border
        style="width: 100%">
        <el-table-column
          prop="userID"
          label="工号"
          width="100">
        </el-table-column>
        <el-table-colum
          prop="sex"
          label="性别"
          width="140">
        </el-table-colum>
        <el-table-column
          prop="Tel"
          label="联系电话"
          wideth="150">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="身份标签"
          wideth="200">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.tag}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="expValue"
          label="经验值"
          wideth="50">
        </el-table-column>
        <el-table-column
          prop="lastLoginTime"
          label="上次登录时间"
          wideth="50">
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
    export default {
        name: "accountManager"
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

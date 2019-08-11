<!--用户统计-->
<template>
  <section style="width: 100%;height: 100%">
    <div class="body-main" style="padding: 20px">
      <!--工具条-->
      <el-row>
        <h2>用户访问统计</h2>
      </el-row>
      <el-row :gutter="10">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" inline="true">
          <el-form-item label="统计月份"   required>
            <el-date-picker
              v-model="form.date"
              type="month"
              value-format="yyyy/MM"
              placeholder="统计月份">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="用户名" required>
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-search"
              v-model="form.name">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlerSearch('form')">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-table
          :data="tableData"
          stripe
          v-show="detailShow"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="月份"
            width="180">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="visitCnt"
            label="访问网站次数">
          </el-table-column>
          <el-table-column
            prop="visitPosts"
            label="浏览文章数量">
          </el-table-column>
        </el-table>
      </el-row>
    </div>

  </section>
</template>

<script>
    export default {
        name: "userCount",
        data() {
            return {
                form: {
                    name: '',
                    date: '',
                },

                detailShow: false,
                tableData: [{
                    date: '',
                    userName: '',
                    userId: '',
                    visitCnt: '',
                    visitPosts: ''
                },]
            }
        },
        methods: {
            handlerSearch(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.tableData.forEach(a=>{
                            a.userName=this.form.name;
                            a.date=this.form.date;
                            a.userId=Math.floor(Math.random()*99999+10000)+"@qq.com";
                            a.visitCnt= Math.floor(Math.random()*999);
                            a.visitPosts=Math.floor(Math.random()*999);
                        })
                        this.detailShow=true;
                    } else {
                        return false;
                    }
                });
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
    float: right;
  }
</style>


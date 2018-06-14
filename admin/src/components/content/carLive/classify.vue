<template>
  <div>
    <template>
      <div>
        <el-button  size="small" type="primary" icon="el-icon-plus">新增分类</el-button>
         <span>关键字:</span>
         <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
         <el-button  size="small" type="primary">查询</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        options:[{
          value: '选项1',
          label: '黄金糕'
        }]
      }
    }
  }

</script>

<style scoped>


</style>

<template>
  <div>
    <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="友链名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="友链地址" width="180">
      </el-table-column>
      <el-table-column prop="address" label="添加日期">
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <a href="javascript:;">上线</a>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="排序">
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增友链" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <div class="cpm_line">
          <span class="span">友链名称:</span>
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </div>
        <div class="cpm_line">
          <span class="span">友链地址:</span>
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </div>
        <div class="cpm_line">
          <span class="span">状态:</span>
          <el-radio-group v-model="radio2">
            <el-radio label='1'>上线</el-radio>
            <el-radio label='2'>下架</el-radio>
          </el-radio-group>
        </div>
      </div>
       <div class="cpm_line">
          <span class="span">友链排序:</span>
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        radio2: "1",
        tableData: [{
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ],
        dialogVisible: false
      };
    },
    methods: {},
    mounted() {}
  };

</script>

<style scoped>


</style>

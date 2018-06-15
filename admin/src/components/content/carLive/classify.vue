<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增分类</el-button>
      <span>关键字:</span>
      <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      <el-button size="small" type="primary">查询</el-button>
    </div>
    <el-table :data="tableData3" style="width: 100%">
      <el-table-column prop="date" label="分类" width="180">
      </el-table-column>
      <el-table-column prop="name" label="发布数量" width="180">
      </el-table-column>
      <el-table-column prop="address" label="排序">
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <a href="javascript:;">启用</a>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="备注">
      </el-table-column>
    </el-table>
    <el-dialog title="新增分类" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
      <div class="dialog">
        <div class="cpm_line">
          <span class="span">
            分类名称:
          </span>
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </div>
        <div class="cpm_line">
          <span class="span">
            排序:
          </span>
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
          <span class="span">
            状态:
          </span>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
            </el-option>
          </el-select>
        </div>
        <div class="cpm_line">
          <span class="span">备注</span>
    <el-input type="textarea" v-model="textarea" style="width:510px"></el-input>
        </div>
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
        textarea:'',
        dialogVisible: false,
        input: "",
        tableData3: [{
            date: "2016-05-02",
            name: "王小虎111",
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
        options: [{
          value: "选项1",
          label: "黄金糕"
        }]
      };
    },
    methods: {
      handleSelectionChange(val) {
        console.log(val);
      },
      handleClose(done) {
        done();
      }
    }
  };

</script>

<style scoped>


</style>

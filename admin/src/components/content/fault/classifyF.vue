<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增分类</el-button>
      <span>关键字:</span>
      <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      <el-button size="small" type="primary">查询</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="故障分类" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="故障数量" width="120">
      </el-table-column>
      <el-table-column prop="address" label="添加日期" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <a href="javascript:;">上线</a>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary">编辑</el-button>
          <el-button type="primary">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="备注" show-overflow-tooltip>
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
            状态:
          </span>
          <el-radio-group v-model="radio2">
            <el-radio label='1'>上线</el-radio>
            <el-radio label='2'>隐藏</el-radio>
          </el-radio-group>
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
        radio2:'1',
        value: "",
        textarea: '',
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

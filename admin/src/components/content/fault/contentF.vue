<template>
  <div>
    <template>
      <div>
        <el-button type="primary" icon="el-icon-plus" size="small">添加</el-button>
        <el-button type="primary" icon="el-icon-close" size="small">批量删除</el-button>
        <span>分类:</span>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span>关键字:</span>
        <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        <el-button type="primary" size="small">查询</el-button>
      </div>
      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      input: "",
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
</style>

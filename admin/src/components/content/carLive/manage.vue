<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增分类</el-button>
      <span>关键字:</span>
      <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      <el-button size="small" type="primary" @click="query">查询</el-button>
    </div>
    <el-table :data="tableData3" style="width: 100%">
      <el-table-column prop="c_name" label="分类" width="180">
      </el-table-column>
      <el-table-column prop="number" label="发布数量" width="180">
      </el-table-column>
      <el-table-column prop="sort" label="排序">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <a href="javascript:;" v-if="scope.row.status == 0" @click="editStatus(1,scope.row.c_id)">启用</a>
          <a href="javascript:;" v-if="scope.row.status == 1" @click="editStatus(0,scope.row.c_id)">隐藏</a>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deletes(scope.row.c_id)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注">
      </el-table-column>
    </el-table>
    <el-dialog title="新增分类" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
      <div class="dialog">
        <div class="cpm_line">
          <span class="span">
            分类名称:
          </span>
          <el-input v-model="classify.name" placeholder="请输入内容" size="small"></el-input>
        </div>
        <div class="cpm_line">
          <span class="span">
            排序:
          </span>
          <el-input v-model="classify.sort" placeholder="请输入内容" size="small"></el-input>
          <span class="span">
            状态:
          </span>
          <el-select v-model="classify.status" placeholder="请选择" size="small">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
            </el-option>
          </el-select>
        </div>
        <div class="cpm_line">
          <span class="span">备注</span>
    <el-input type="textarea" v-model="classify.remarks" style="width:510px"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      classify: {},
      textarea: "",
      dialogVisible: false,
      input: "",
      tableData3: [],
      options: [
        {
          value: "1",
          label: "启用"
        },
        {
          value: "0",
          label: "隐藏"
        }
      ]
    };
  },
  methods: {
    //删除分类
    deletes(c_id) {
      this.$confirm("是否删除该分类?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("admin/article/carlife/delCategory", { c_id: c_id }).then(
            res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.gitList();
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //状态编辑
    editStatus(num, c_id) {
      console.log(c_id);
      this.$post("admin/article/carlife/editStatus", {
        c_id: c_id,
        status: num
      }).then(res => {
        if (res.code == 0) {
          this.$message(res.msg);
          this.gitList();
        }
      });
    },
    //编辑按钮
    edit(item) {
      console.log(item);
      this.classify = item;
      this.classify.name = item.c_name;
      this.dialogVisible = true;
    },
    //新增,编辑分类
    save() {
      this.$post("admin/article/carlife/handleCategory", this.classify).then(
        res => {
          if (res.code == 0) {
            this.dialogVisible = false;
            this.gitList();
            this.classify = {};
          }
          this.$message(res.msg);
        }
      );
    },
    // 查询
    query() {
      this.$post("admin/article/carlife/getCarLifeCategoryList", {
        keyword: this.input
      }).then(res => {
        this.tableData3 = res.data;
      });
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    handleClose(done) {
      done();
    },
    // 获取列表
    gitList() {
      this.$post("admin/article/carlife/getCarLifeCategoryList").then(res => {
        this.tableData3 = res.data;
      });
    },
    //初始化
    initialize() {}
  },
  mounted() {
    this.initialize();
    this.gitList();
  }
};
</script>

<style scoped>
</style>

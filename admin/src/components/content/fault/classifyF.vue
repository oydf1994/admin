<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addItem">新增分类</el-button>
      <span>关键字:</span>
      <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      <el-button size="small" type="primary" @click="btn">查询</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="c_name" label="故障分类" width="120">
      </el-table-column>
      <el-table-column prop="number" label="故障数量" width="120">
      </el-table-column>
      <el-table-column prop="create_time" label="添加日期" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <a href="javascript:;" v-if="scope.row.status == 0" @click="thread(1,scope.row.c_id)">上线</a>
          <a href="javascript:;" v-if="scope.row.status == 1"  @click="thread(0,scope.row.c_id)">下线</a>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="primary" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="describe" label="备注" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-dialog title="新增分类" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
      <div class="dialog">
        <div class="cpm_line">
          <span class="span">
            分类名称:
          </span>
          <el-input v-model="fault.c_name" placeholder="请输入内容" size="small"></el-input>
        </div>
        <div class="cpm_img">
          <span>封面:</span>
          <div class="addImg">
            <img src="../../../assets/images/add_image@2x.png" alt="" id="addImg">
            <input type="file" @change="imgChange">
          </div>
        </div>
        <div class="cpm_line">
          <span class="span">
            排序:
          </span>
          <el-input v-model="fault.sort" placeholder="请输入内容" size="small"></el-input>
        </div>
        <div class="cpm_line">
          <span class="span">
            状态:
          </span>
          <el-radio-group v-model="fault.status">
            <el-radio label="1">上线</el-radio>
            <el-radio label="2">隐藏</el-radio>
          </el-radio-group>
        </div>
        <div class="cpm_line">
          <span class="span">备注</span>
          <el-input type="textarea" v-model="fault.describe" style="width:510px"></el-input>
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
      radio2: "1",
      value: "",
      textarea: "",
      dialogVisible: false,
      input: "",
      tableData3: [],
      fault: {},
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ]
    };
  },
  methods: {
    //新增
    addItem(){
       this.dialogVisible = true;
      this.fault = {};
      document.querySelector("#addImg").src = this.tools.img;
    },
    //关键字查询
    btn() {
      this.$post("admin/article/fault/getFaultCategoryList", {
        keyword: this.input
      }).then(res => {
        this.tableData3 = res.data;
        this.fault = {};
      });
    },
    //删除分类
    del(item) {
      this.$post("admin/article/fault/delCategory", { c_id: item.c_id }).then(
        res => {
          this.$message(res.msg);
        }
      );
    },
    //状态选择
    thread(num, c_id) {
      this.$post("admin/article/fault/editStatus", {
        status: num,
        c_id: c_id
      }).then(res => {
        if (res.code == 0) {
          this.gitList();
        }
        this.$message(res.msg);
      });
    },
    // 编辑
    edit(item) {
      item.status += "";
      this.dialogVisible = true;
      this.fault = item;
      document.querySelector("#addImg").src = item.icon;
    },
    save() {
      this.$post("admin/article/fault/handleCategory", this.fault).then(res => {
        if (res.code == 0) {
          this.dialogVisible = false;
          this.gitList();
        }
        this.$message(res.msg);
      });
    },
    imgChange(e) {
      this.tools.uploads(e).then(res => {
        console.log(res);
        if (res) {
          this.fault.icon = res;
          document.querySelector("#addImg").src = res;
        } else {
          this.$message("上传图片失败");
        }
      });
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    handleClose(done) {
      done();
    },
    gitList() {
      this.$post("admin/article/fault/getFaultCategoryList").then(res => {
        this.tableData3 = res.data;
        this.fault = {};
      });
    }
  },
  mounted() {
    this.gitList();
  }
};
</script>

<style scoped>
</style>

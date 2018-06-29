<template>
  <div>
    <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true;links = {}">新增</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="link_name" label="友链名称" width="180">
      </el-table-column>
      <el-table-column prop="link_url" label="友链地址" width="180">
      </el-table-column>
      <el-table-column prop="create_time" label="添加日期">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <a href="javascript:;" v-if="scope.row.status == 1">上线</a>
          <a href="javascript:;" v-if="scope.row.status == 0">下线</a>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序">
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增友链" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <div class="cpm_line">
          <span class="span">友链名称:</span>
          <el-input v-model="links.name" placeholder="请输入内容" size="small"></el-input>
        </div>
        <div class="cpm_line">
          <span class="span">友链地址:</span>
          <el-input v-model="links.url" placeholder="请输入内容" size="small"></el-input>
        </div>
        <div class="cpm_line">
          <span class="span">状态:</span>
          <el-radio-group v-model="links.status">
            <el-radio label='1'>上线</el-radio>
            <el-radio label='2'>下线</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="cpm_line">
        <span class="span">友链排序:</span>
        <el-input v-model="links.sort" placeholder="请输入内容" size="small"></el-input>
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
        input: "",
        tableData: [],
        dialogVisible: false,
        links: {}
      };
    },
    methods: {
      //删除
      del(item) {
        this.$confirm('是否确认删除该选项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$post("admin/other/link/delLink", {
            link_id: item.link_id
          }).then(res => {
            if (res.code == 0) {
              this.gitList()
            }
            this.$message(res.msg);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //编辑
      edit(item) {
        this.dialogVisible = true;
        this.links = item;
        this.links.name = item.link_name;
        this.links.url = item.link_url;
      },
      //新增link
      save() {
        this.$post("admin/other/link/handleLink", this.links).then(res => {
          if (res.code == 0) {
            this.gitList();
            this.dialogVisible = false;
          }
          this.$message(res.msg);
        });
      },
      handleClose(deno) {
        deno();
      },
      gitList() {
        this.$post("admin/other/link/getLinkList").then(res => {
          this.tableData = res.data;
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

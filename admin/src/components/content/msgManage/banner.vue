<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addItem">新增</el-button>
      <span>主题:</span>
      <el-select v-model="value" placeholder="请选择" size="small">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button size="small" type="primary">确定</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="主题" width="120">
        <template slot-scope="scope">{{ scope.row.theme }}</template>
      </el-table-column>
      <el-table-column prop="image" label="banner图" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column label="上传时间" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">上线</span>
          <span v-if="scope.row.status == 0">下线</span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="primary" @click="del(scope.row.banner_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <transition name="el-fade-in-linear">
      <div v-show="dialogVisible" class="cpm center">
        <div class="cpm_tit">
          新增banner图
          <i class="el-icon-close cpm_i" @click="dialogVisible=false"></i>
        </div>
        <div class="cpm_body">
          <div class="cpm_line">
            <span class="span">主题:</span>
            <el-input v-model="banner.theme" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div class="cpm_img">
            <span>bannner图:</span>
            <div class="addImg">
              <img src="../../../assets/images/add_image@2x.png" alt="" id="addImg">
              <input type="file" @change="imgChange">
            </div>
          </div>
          <div class="cpm_line">
            <span class="span">是否上线:</span>
            <el-radio-group v-model="banner.status">
              <el-radio label='1'>上线</el-radio>
              <el-radio label='0'>下线</el-radio>
            </el-radio-group>
          </div>
          <div class="cpm_line">
            <span class="span">排序:</span>
            <el-input v-model="banner.sort" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div>
          </div>
        </div>
        <div class="cpm_btn">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        radio2: "1",
        textarea: "",
        submit: false,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        input: "",
        dialogVisible: false,
        value: "",
        options: [],
        banner: {},
        currentPage: 1,
        tableData3: [],
        options: [{
          value: "选项1",
          label: "黄金糕"
        }]
      };
    },
    mounted() {
      this.gitList();
    },
    methods: {
      //新增
      addItem() {
        this.dialogVisible = true;
        this.banner = {};
        document.querySelector("#addImg").src = this.tools.img;
      },
      // 删除
      del(id) {
        this.$confirm('是否确认删除该选项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$post("admin/other/banner/delBanner", {
            banner_id: id
          }).then(
            res => {
              this.$message(res.msg);
              this.gitList();
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //上传图片
      imgChange(e) {
        this.tools.uploads(e).then(res => {
          if (res) {
            this.banner.image = res;
            document.querySelector("#addImg").src = res;
          } else {
            this.$message("上传图片失败");
          }
        });
      },
      //编辑
      edit(item) {
        item.status = item.status + ''
        document.querySelector("#addImg").src = item.image;
        this.banner = item;
        console.log(item);
        this.dialogVisible = true;
      },
      handleClose(done) {
        done();
      },
      //保存
      save() {
        this.$post("admin/other/banner/handleBanner", this.banner).then(res => {
          this.dialogVisible = false;
          this.$message(res.msg);
          this.gitList();
        });
      },
      // 添加
      add() {},
      handleSelectionChange(val) {
        console.log(val);
      },
      demo(item) {
        console.log(item);
      },
      gitList() {
        this.$post("admin/other/banner/getBannerList").then(res => {
          console.log(res);
          this.tableData3 = res.data;
        });
      }
    }
  };

</script>

<style scoped>
  .center {
    width: 700px;
  }

  .describe {
    margin-left: 60px;
  }

  .describe_p {
    margin: 5px 0;
  }

</style>

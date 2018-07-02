<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addItem">新增</el-button>
      <span>案列名称:</span>
      <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      <el-button size="small" type="primary" @click="btn">查询</el-button>
    </div>
    <el-table :data="tableData3" style="width: 100%">
      <el-table-column prop="cases_name" label="案列名称" width="180">
      </el-table-column>
      <el-table-column prop="video_image" label="案列封面" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.video_image" alt="" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="上传时间">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <a href="javascript:;" v-if="scope.row.status == 1">上线</a>
          <a href="javascript:;" v-if="scope.row.status == 0">下线</a>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row.cases_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 100]"
      :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
    </el-pagination>
    <transition name="el-fade-in-linear">
      <div v-show="dialogVisible" class="cpm center">
        <div class="cpm_tit">
          添加内容
          <i class="el-icon-close cpm_i" @click="dialogVisible=false"></i>
        </div>
        <div class="cpm_body">
          <div class="cpm_line">
            <span class="span">案列名称:</span>
            <el-input v-model="client.cases_name" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div class="cpm_img">
            <span>封面:</span>
            <div class="addImg">
              <img src="../../../assets/images/add_image@2x.png" alt="" id="addImg">
              <input type="file" @change="imgChange">
            </div>
          </div>
          <div class="cpm_line">
            <span class="span">视频地址:</span>
            <el-input v-model="client.video_url" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div class="cpm_line">
            <span class="span">状态:</span>
            <el-radio-group v-model="client.status">
              <el-radio label='1'>上线</el-radio>
              <el-radio label='2'>下线</el-radio>
            </el-radio-group>
          </div>
          <div class="cpm_line">
            <span class="span">排序:</span>
            <el-input v-model="client.sort" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div>
            <div class="editor-container">
              <UE :config='config' ref="ue"></UE>
            </div>
          </div>
        </div>
        <div class="cpm_btn">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
          <el-button type="primary" @click="$refs.primary.look($refs.ue.getUEContent())">预 览</el-button>
        </div>
      </div>
    </transition>
    <primary ref="primary"></primary>
  </div>
</template>

<script>
  import UE from "../../common/ueditor";
  export default {
    data() {
      return {
        radio2: "",
        textarea: "",
        submit: false,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        input: "",
        dialogVisible: false,
        value: "",
        client: {},
        options: [],
        currentPage: 1,
        tableData3: [],
        page: {
          total: 0
        },
        options: [{
          value: "选项1",
          label: "黄金糕"
        }]
      };
    },
    components: {
      UE
    },
    methods: {
      // 新增
      addItem() {
        this.dialogVisible = true;
        this.client = {};
        this.$refs.ue.setUEContent('');
        document.querySelector("#addImg").src = this.tools.img;
      },
      //删除
      del(id) {
        this.$confirm('是否确认删除该选项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$post("admin/other/cases/delCases", {
            cases_id: id
          }).then(res => {
            this.$message(res.msg);
            this.gitList();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //编辑
      handleClick(item) {
        this.dialogVisible = true;
        this.client = item;
        if (item.video_image) {
          document.querySelector("#addImg").src = item.video_image;
        }
        this.$refs.ue.setUEContent(item.content);
      },
      //上传图片
      imgChange(e) {
        console.log("上传");
        this.tools.uploads(e).then(res => {
          console.log(res);
          if (res) {
            this.client.video_image = res;
            document.querySelector("#addImg").src = res;
          } else {
            this.$message("上传图片失败");
          }
        });
      },
      //按关键字查询列表
      btn() {
        this.$post("admin/other/cases/getCasesList", {
          keyword: this.input
        }).then(res => {
          this.tableData3 = res.data;
          this.$message(res.msg);
        });
      },
      handleSizeChange(val) {
        this.$post("admin/other/cases/getCasesList", {
          pageSize: val
        }).then(res => {
          this.tableData3 = res.data;
          this.page = res.page;
        });
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.$post("admin/other/cases/getCasesList", {
          page: val
        }).then(res => {
          this.tableData3 = res.data;
          this.page = res.page;
        });
        console.log(`当前页: ${val}`);
      },
      handleClose(done) {
        done();
      },
      //保存
      save() {
        this.client.content = this.$refs.ue.getUEContent();
        this.client.content = this.client.content.replace("\\", "");
        console.log(this.client.content);
        this.$post("admin/other/cases/handleCases", this.client).then(res => {
          if (res.code == 0) {
            this.gitList();
            this.dialogVisible = false;
          }
          this.$message(res.msg);
        });
      },
      // 添加
      add() {},
      handleSelectionChange(val) {
        console.log(val);
      },
      //获取案列列表
      gitList() {
        this.$post("admin/other/cases/getCasesList").then(res => {
          console.log(res);
          this.tableData3 = res.data;
          this.page = res.page;
        });
      },
      demo(item) {
        console.log(item);
      }
    },
    mounted() {
      this.gitList();
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

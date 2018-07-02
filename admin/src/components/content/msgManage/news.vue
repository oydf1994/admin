<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addItem">新增</el-button>
      <span>标题:</span>
      <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      <span>资讯类型:</span>
      <el-select v-model="valueType" placeholder="请选择" @change="changeType">
        <el-option v-for="item in options1" :key="item.c_id" :label="item.c_name" :value="item.c_id">
        </el-option>
      </el-select>
      <el-button size="small" type="primary" @click="btn">确定</el-button>
    </div>
    <el-table :data="tableData3" style="width: 100%">
      <el-table-column prop="title" label="资讯标题" width="180">
      </el-table-column>
      <el-table-column prop="image" label="资讯封面" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="上传时间">
      </el-table-column>
      <el-table-column prop="c_name" label="资讯类型">
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
          <el-button type="text" size="small" @click="del(scope.row.news_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20,50,100]"
      :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
    </el-pagination>
    <transition name="el-fade-in-linear">
      <div v-show="dialogVisible" class="cpm center">
        <div class="cpm_tit">
          新增资讯
          <i class="el-icon-close cpm_i" @click="dialogVisible=false"></i>
        </div>
        <div class="cpm_body">
          <div class="cpm_line">
            <span class="span">资讯分类:</span>
            <el-select v-model="news.c_id" placeholder="请选择">
              <el-option v-for="item in options1" :key="item.c_id" :label="item.c_name" :value="item.c_id">
              </el-option>
            </el-select>
          </div>
          <div class="cpm_line">
            <span class="span">资讯标题:</span>
            <el-input v-model="news.title" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div class="cpm_img">
            <span>封面:</span>
            <div class="addImg">
              <img src="../../../assets/images/add_image@2x.png" alt="" id="addImg">
              <input type="file" @change="imgChange">
            </div>
          </div>
          <div class="cpm_line">
            <span class="span">状态:</span>
            <el-radio-group v-model="news.status">
              <el-radio label='1'>上线</el-radio>
              <el-radio label='2'>下线</el-radio>
            </el-radio-group>
          </div>
          <div class="cpm_line">
            <span class="span">排序:</span>
            <el-input v-model="news.sort" placeholder="请输入内容" size="small"></el-input>
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
        options1: [],
        valueType: "",
        options: [],
        page: {},
        news: {},
        currentPage: 1,
        tableData3: [],
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
      //类型改变事件
      changeType() {
        this.$post("admin/other/news/getNewsList", {
          c_id: this.valueType
        }).then(
          res => {
            this.tableData3 = res.data;
            this.page = res.page;
          }
        );
      },
      //新增
      addItem() {
        this.dialogVisible = true;
        this.news = {};
        this.$refs.ue.setUEContent("");
        document.querySelector("#addImg").src = this.tools.img;
      },
      //删除
      del(id) {
        this.$confirm('是否确认删除该选项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$post("admin/other/news/delNews", {
            news_id: id
          }).then(res => {
            this.$message(res.msg);
            if (res.code == 0) {
              this.gitList();
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //上传图片
      imgChange(e) {
        console.log("上传");
        this.tools.uploads(e).then(res => {
          console.log(res);
          if (res) {
            this.news.image = res;
            document.querySelector("#addImg").src = res;
          } else {
            this.$message("上传图片失败");
          }
        });
      },
      //按关键字搜索
      btn() {
        this.$post("admin/other/news/getNewsList", {
          keyword: this.input
        }).then(res => {
          this.tableData3 = res.data;
          this.$message(res.msg);
          this.page = res.page;
        });
      },
      //编辑
      handleClick(item) {
        this.dialogVisible = true;
        this.news = item;
        if (item.image) {
          document.querySelector("#addImg").src = item.image;
        }
        this.$refs.ue.setUEContent(item.content);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClose(done) {
        done();
      },
      //保存
      save() {
        this.news.content = this.$refs.ue.getUEContent();
        this.news.content = this.news.content.replace("\\", "");
        this.$post("admin/other/news/handleNews", this.news).then(res => {
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
      gitList() {
        this.$post("admin/other/news/getNewsList").then(res => {
          this.tableData3 = res.data;
          this.page = res.page;
        });
      }
    },
    mounted() {
      this.gitList();
      this.$post("admin/other/news/getNewCategory").then(res => {
        console.log(res);
        this.options1 = res.data;
      });
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

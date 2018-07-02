<template>
  <div>
    <div>
      <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="addItem">新增</el-button> -->
    </div>
    <el-table :data="tableData3" style="width: 100%">
      <el-table-column prop="name" label="产品名称" width="180">
      </el-table-column>
      <el-table-column prop="cover" label="产品封面" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt="" width="50" height="50">
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
        </template>
      </el-table-column>
    </el-table>
    <transition name="el-fade-in-linear">
      <div v-show="dialogVisible" class="cpm center">
        <div class="cpm_tit">
          编辑产品
          <i class="el-icon-close cpm_i" @click="dialogVisible=false"></i>
        </div>
        <div class="cpm_body">
          <div class="cpm_line">
            <span class="span">产品名称:</span>
            <el-input v-model="product.name" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div class="cpm_img">
            <span>封面:</span>
            <div class="addImg">
              <img src="../../../assets/images/add_image@2x.png" alt="" id="addImg">
              <input type="file" @change="imgChange">
            </div>
          </div>
           <div class="cpm_line">
            <span class="span">视频链接:</span>
            <el-input v-model="product.url" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div class="cpm_line">
            <span class="span">状态:</span>
            <el-radio-group v-model="product.status">
              <el-radio label='1'>上线</el-radio>
              <el-radio label='0'>下线</el-radio>
            </el-radio-group>
          </div>
          <div class="cpm_line">
            <span class="span">排序:</span>
            <el-input v-model="product.sort" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div class="cpm_line" style="margin-bottom: 30px;height: 50px;">
          <span class="span">视频简介:</span>
          <el-input type="textarea" rows="3" style="width:400px" placeholder="请输入内容" v-model="product.describe"></el-input>
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
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import UE from "../../common/ueditor";
export default {
  data() {
    return {
      textarea: "",
      dialogVisible: false,
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      product: {},
      currentPage: 1,
      tableData3: []
    };
  },
  components: {
    UE
  },
  methods: {
    //新增
    addItem() {
      this.dialogVisible = true;
      this.news = {};
      this.$refs.ue.setUEContent("");
      document.querySelector("#addImg").src = this.tools.img;
    },
    //上传图片
    imgChange(e) {
      console.log("上传");
      this.tools.uploads(e).then(res => {
        console.log(res);
        if (res) {
          this.product.cover = res;
          document.querySelector("#addImg").src = res;
        } else {
          this.$message("上传图片失败");
        }
      });
    },
    //编辑
    handleClick(item) {
      this.dialogVisible = true;
      this.product = item;
      this.product.status +=''
      if (item.cover) {
        document.querySelector("#addImg").src = item.cover;
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
      this.product.content = this.$refs.ue.getUEContent();
      this.product.content = this.product.content.replace("\\", "");
      this.$post("admin/other/series/editProduct", this.product).then(res => {
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
      this.$post("admin/other/series/productList").then(res => {
        this.tableData3 = res.data;
      });
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

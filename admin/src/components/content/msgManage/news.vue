<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
      <span>标题:</span>
      <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      <el-button size="small" type="primary">确定</el-button>
    </div>
    <el-table :data="tableData3" style="width: 100%">
      <el-table-column prop="date" label="资讯标题" width="180">
      </el-table-column>
      <el-table-column prop="name" label="资讯封面" width="180">
      </el-table-column>
      <el-table-column prop="address" label="上传时间">
      </el-table-column>
      <el-table-column prop="address" label="状态">
      </el-table-column>
      <el-table-column prop="address" label="排序">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]"
      :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
    <transition name="el-fade-in-linear">
      <div v-show="dialogVisible" class="cpm center">
        <div class="cpm_tit">
          新增资讯
          <i class="el-icon-close cpm_i" @click="dialogVisible=false"></i>
        </div>
        <div class="cpm_body">
          <div class="cpm_line">
            <span class="span">资讯标题:</span>
            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div class="cpm_img">
            <span>封面:</span>
            <img src="./../../../assets/images/LOGO.png" alt="">
          </div>
          <div class="cpm_line">
            <span class="span">状态:</span>
            <el-radio-group v-model="radio2">
              <el-radio label='1'>上线</el-radio>
              <el-radio label='2'>下架</el-radio>
            </el-radio-group>
          </div>
           <div class="cpm_line">
            <span class="span">排序:</span>
            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
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
      options: [],
      currentPage: 1,
      tableData3: [
        {
          date: "2016-05-02",
          name: "1",
          address: "上海市"
        },
        {
          date: "2016-05-04",
          name: "2",
          address: " 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "3",
          address: " 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "4",
          address: " 1516 弄"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ]
    };
  },
  components: {
    UE
  },
  methods: {
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
      console.log(this.$refs.ue.getUEContent());
    },
    // 添加
    add() {},
    handleSelectionChange(val) {
      console.log(val);
    },
    demo(item) {
      console.log(item);
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

<template>
  <div>
    <div>
      <h5>备案信息</h5>
      <div class="dialog">
        <span class="span">备案号:</span>
        <el-input v-model="msg.record_number" placeholder="请输入内容" size="small"></el-input>
      </div>
      <div class="dialog">
        <span class="span">版权信息:</span>
        <el-input v-model="msg.copyright" placeholder="请输入内容" size="small"></el-input>
      </div>
      <div class="dialog">
        <span class="span">公司名称:</span>
        <el-input v-model="msg.corporate_name" placeholder="请输入内容" size="small"></el-input>
      </div>
    </div>
    <div>
      <h5>资讯热线</h5>
      <div class="dialog">
        <span class="span">客服热线:</span>
        <el-input v-model="msg.hotline" placeholder="请输入内容" size="small"></el-input>
      </div>
      <div class="dialog">
        <span class="span">在线时间:</span>
        <el-input v-model="msg.online_time" placeholder="请输入内容" size="small"></el-input>
      </div>
      <div class="dialog">
        <span class="span">公司地址:</span>
        <el-input v-model="msg.address" placeholder="请输入内容" size="small"></el-input>
      </div>
    </div>
     <el-button type="primary" class="btn" @click="btn">确定</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      msg: {}
    };
  },
  methods: {
    btn() {
      this.$post("admin/system/system/basicInfo", this.msg).then(res => {
        if (res.code == 0) {
          this.$message("修改成功");
        } else {
          this.$message(res.msg);
        }
      });
    }
  },
  mounted() {
    this.$post("admin/system/system/basicInfo").then(res => {
      this.msg = res.data;
    });
  }
};
</script>

<style scoped>
h5 {
  font-size: 18px;
  margin: 10px 0;
}

.dialog {
  margin-bottom: 10px;
}
.span {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.btn {
  margin-left: 130px;
  margin-top: 30px;
}
</style>

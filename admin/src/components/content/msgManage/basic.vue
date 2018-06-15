<template>
  <div>
    <div>
      <h5>备案信息</h5>
      <div class="dialog">
        <span class="span">备案号:</span>
        <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      </div>
      <div class="dialog">
        <span class="span">版权信息:</span>
        <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      </div>
      <div class="dialog">
        <span class="span">公司名称:</span>
        <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      </div>
    </div>
    <div>
      <h5>资讯热线</h5>
      <div class="dialog">
        <span class="span">客服热线:</span>
        <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      </div>
      <div class="dialog">
        <span class="span">在线时间:</span>
        <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      </div>
      <div class="dialog">
        <span class="span">公司地址:</span>
        <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      </div>
    </div>
     <el-button type="primary" class="btn">确定</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    };
  },
  methods: {},
  mounted() {}
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

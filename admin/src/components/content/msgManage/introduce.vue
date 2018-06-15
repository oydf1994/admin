<template>
  <div>
    <div class="editor-container">
      <ue :config='config' ref="ue"></ue>
    </div>
    <div class="cpm_line">
      <span class="span" style="float:left">视频封面</span>
      <img src="./../../../assets/images/LOGO.png" alt="">
    </div>
    <div class="cpm_line">
      <span class="span">视频地址</span>
      <el-input v-model="input" placeholder="请输入内容" size="small" style="width:240px"></el-input>
    </div>
    <div class="cpm_btn">
      <el-button type="primary">预览</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
  import ue from "./../../common/ueditor";
  export default {
    data() {
      return {
        input: "",
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      };
    },
    methods: {},
    mounted() {
      //   this.$refs.ue.getUEContent()
    },
    components: {
      ue
    }
  };

</script>

<style scoped>


</style>

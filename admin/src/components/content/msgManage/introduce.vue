<template>
  <div>
    <div class="editor-container">
      <ue :config='config' ref="ue"></ue>
    </div>
    <div class="cpm_line">
      <span class="span" style="float:left">视频封面</span>
      <div class="addImg">
        <img src="../../../assets/images/add_image@2x.png" alt="" id="addImg">
        <input type="file" @change="imgChange">
      </div>
    </div>
    <div class="cpm_line" style="margin-top: 20px;">
      <span class="span">视频地址</span>
      <el-input v-model="input" placeholder="请输入内容" size="small" style="width:240px"></el-input>
    </div>
    <div class="cpm_btn">
      <el-button type="primary">预览</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </div>
  </div>
</template>

<script>
import ue from "./../../common/ueditor";
export default {
  data() {
    return {
      input: "",
      imgUrl: "",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      }
    };
  },
  components: {
    ue
  },
  methods: {
    imgChange(e) {
      this.tools.uploads(e).then(res => {
        if (res) {
          this.imgUrl = res;
          document.querySelector("#addImg").src = res;
        } else {
          this.$message("上传图片失败");
        }
      });
    },
    save() {
      this.$post('admin/system/system/setBasicInfo',{introduce:this.$refs.ue.getUEContent(),video_cover:this.imgUrl,video_url:this.input}).then(res=>{
          this.$message('操作成功');
      })
    },
    getMsg() {
      this.$post("admin/system/system/basicInfo").then(res => {
        setTimeout(() => {
          this.$refs.ue.setUEContent(res.data.introduce);
        }, 1000);
        this.input = res.data.video_url;
        this.imgUrl = res.data.video_cover;
        // document.querySelector("#addImg").src = this.imgUrl;
      });
    }
  },
  mounted() {
    this.getMsg();
    //   this.$refs.ue.getUEContent()
  }
};
</script>

<style scoped>
</style>

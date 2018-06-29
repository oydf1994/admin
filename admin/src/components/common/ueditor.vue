<template>
  <div>
    <div id="editor" style="width:650px;height:160px;"></div>
  </div>
</template>
<script>
export default {
  name: "UE",
  data() {
    return {
      editor: null
    };
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    }
  },
  mounted() {
    this.editor = UE.getEditor("editor");
    // this.editor.addListener("ready", function() {
    //   _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
    // });
  },
  methods: {
    setUEContent(content) {
      console.log(content)
      this.editor.setContent(content);
    },
    getUEContent() {
      // 获取内容方法
      return this.editor.getContent();
    }
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>
<style scoped>
#editor {
  z-index: 9999;
}
</style>

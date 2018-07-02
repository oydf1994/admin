<template>
  <div>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div id="box"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {},
    look(html){
        this.dialogVisible = true
        document.querySelector('#box').innerHTML = html
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>

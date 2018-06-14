<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="内容分类管理" name="/home/content/carLive/manage"></el-tab-pane>
        <el-tab-pane label="内容管理" name="/home/content/carLive/classify"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "/home/content/carLive/manage"
    };
  },
  methods: {
    handleClick(tab) {
      this.$router.push(tab.name);
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>

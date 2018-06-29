<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="/home/content/msgManage/basic"></el-tab-pane>
        <el-tab-pane label="banner管理" name="/home/content/msgManage/banner"></el-tab-pane>
        <el-tab-pane label="软件介绍" name="/home/content/msgManage/introduce"></el-tab-pane>
        <el-tab-pane label="客户案例" name="/home/content/msgManage/client"></el-tab-pane>
        <el-tab-pane label="新闻资讯" name="/home/content/msgManage/news"></el-tab-pane>
        <el-tab-pane label="友链管理" name="/home/content/msgManage/links/friendship"></el-tab-pane>
        <el-tab-pane label="关于我们" name="/home/content/msgManage/About"></el-tab-pane>
        <el-tab-pane label="产品系列" name="/home/content/msgManage/product"></el-tab-pane>
        <el-tab-pane label="解决方案" name="/home/content/msgManage/precept"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "/home/content/msgManage/basic"
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

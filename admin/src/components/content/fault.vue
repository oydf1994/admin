<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="故障分类管理" name="/home/content/fault/classifyF"></el-tab-pane>
        <el-tab-pane label="故障内容管理" name="/home/content/fault/contentF"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "/home/content/fault/classifyF"
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

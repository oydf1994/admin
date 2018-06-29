<template>
  <div class="banxin">
    <div class="head">
      <img src="./../assets/images/LOGO.png" alt="">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/home/content">内容</el-menu-item>
        <el-menu-item index="2">审核</el-menu-item>
        <el-menu-item index="3">道路救援</el-menu-item>
      </el-menu>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/home/content"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    
  }
};
</script>

<style scoped>
.banxin {
  width: 1600px;
  margin: 0 auto;
}

.head {
  overflow: hidden;
}

.head img {
  float: left;
  height: 60px;
}

.head .el-menu-demo {
  float: left;
}
</style>

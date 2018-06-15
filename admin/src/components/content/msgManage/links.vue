<template>
  <div>
    <div class="links">
      <router-link to="/home/content/msgManage/links/friendship">
        <el-button size="small" round :class="{primary:link == 1}" @click="link = 1">友情链接</el-button>
        <!-- :type="{primary:link == 1}" -->
      </router-link>
      <router-link to="/home/content/msgManage/links/Its">
        <el-button size="small" round :class="{primary:link == 2}" @click="link = 2">旗下软件</el-button>
      </router-link>
      <router-link to="/home/content/msgManage/links/webNav">
        <el-button size="small" round :class="{primary:link == 3}" @click="link = 3">网站导航</el-button>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: 1
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.links {
  margin-bottom: 20px;
}
.primary{
  background-color: #409eff;
  color: #fff;
}
</style>

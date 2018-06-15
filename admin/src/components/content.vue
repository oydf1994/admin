<template>
  <div>
    <div class="leftNav">
      <el-row class="tac">
        <el-col>
          <el-menu default-active="/home/content/serviceItem" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
            <el-menu-item index="/home/content/serviceItem">
              <span slot="title">服务项目管理</span>
            </el-menu-item>
            <el-menu-item index="/home/content/carLive/manage">
              <span slot="title">车生活管理</span>
            </el-menu-item>
            <el-menu-item index="/home/content/fault/classifyF">
              <span slot="title">常见故障管理</span>
            </el-menu-item>
            <el-menu-item index="/home/content/msgManage/basic">
              <span slot="title">官网信息管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(done){
      done()
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo span {
  text-align: center;
}
.leftNav {
  float: left;
}
.view {
  margin-left: 160px;
  margin-top: 20px;
}
</style>

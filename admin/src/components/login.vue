<template>
 <div class="login">
     <div class="center">
         <el-input v-model="userName" placeholder="请输入用户名"></el-input>
         <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
         <el-button type="primary" @click="btn">登录</el-button>
     </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    enter() {
      document.onkeydown = event => {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
          // enter 键
          this.$post("admin/user/auth/login", {
            username: this.userName,
            password: this.password
          }).then(res => {
            this.$message(res.msg);
            if (res.code == 0) {
              this.$cookies.set("info", JSON.stringify(res.data));
              this.$router.push("/home/content/carLive/manage");
            }
          });
        }
      };
    },
    btn() {
      this.$post("admin/user/auth/login", {
        username: this.userName,
        password: this.password
      }).then(res => {
        this.$message(res.msg);
        if (res.code == 0) {
          this.$cookies.set("info", JSON.stringify(res.data));
          this.$router.push("/home/content/carLive/manage");
        }
      });
    }
  },
  mounted() {
    this.enter();
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/u0.png");
  background-size: 100% 100%;
}
.center {
  width: 220px;
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}
.center .el-input {
  margin-bottom: 20px;
}
.center button {
  padding: 15px 30px;
}
</style>

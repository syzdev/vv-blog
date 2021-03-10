<template>
  <div class="login-page">
    <el-card class="login-card" header="系统登录" body-style="{padding:'80px'}">
      <!-- 原生提交方式并阻止跳转页面 -->
      <el-form @submit.native.prevent="login" >
        <el-form-item>
          <el-input v-model="model.username" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input show-password v-model="model.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginOption">记住登录状态</el-checkbox>
          <el-button class="login-button" type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {

      },
      loginOption: null
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.model)
      if (this.loginOption) {
        // 浏览器长时间保存
        localStorage.token = res.data.token
        localStorage.username = res.data.username
        localStorage.avatar = res.data.avatar
      } else {
        // 浏览器关闭之后就自动删除
        sessionStorage.token = res.data.token
        sessionStorage.username = res.data.username
        sessionStorage.avatar = res.data.avatar
      }
      // 登录成功跳转到首页
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功！'
      })
    }
  },
}
</script>

<style scoped>
.login-page {
  background: #2D3A4B;
  height: 100%;
  position: fixed;
  width: 100%;
}
.login-card {
  width: 25rem;
  margin: 15rem auto;
}
.login-button {
  margin-left: 40px;
}
</style>
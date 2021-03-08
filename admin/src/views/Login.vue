<template>
  <div>
    <el-card class="login-card" header="请先登录">
      <!-- 原生提交方式并阻止跳转页面 -->
      <el-form @submit.native.prevent="login" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input show-password v-model="model.password"></el-input>
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

<style>
.login-card {
  width: 25rem;
  margin: 15rem auto;
}
.login-button {
  margin-left: 60px;
}
</style>
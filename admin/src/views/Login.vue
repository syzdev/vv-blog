<template>
  <div class="login-page">
    <el-card class="login-card" header="系统登录" body-style="{padding:'80px'}">
      <!-- 原生提交方式并阻止跳转页面 -->
      <el-form
        @submit.native.prevent="login"
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="model"
      >
        <el-form-item prop="username">
          <el-input
            v-model="model.username"
            prefix-icon="el-icon-user"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            v-model="model.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginOption">记住登录状态</el-checkbox>
          <div class="login-button">
            <el-button type="primary" native-type="submit">登录</el-button>
            <el-button type="danger" @click="resetLoginForm">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      loginOption: null,
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 5,
            max: 15,
            message: '长度在 5 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    resetLoginForm() {
      // 点击重置按钮，重置表单的内容
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // 验证未通过，直接返回
        if (!valid) {
          return
        }
        // 验证通过，执行登录逻辑
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
          message: '登录成功！',
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login-page {
  background: #2d3a4b;
  height: 100%;
  position: fixed;
  width: 100%;
  .login-card {
    width: 25rem;
    margin: 15rem auto;
    .login-button {
      display: flex;
      margin-top: 25px;
      justify-content: space-evenly;
    }
  }
}
</style>
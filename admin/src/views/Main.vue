<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>内容管理</template
          >
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/category/create">新建分类</el-menu-item>
            <el-menu-item index="/category/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/article/create">新建文章</el-menu-item>
            <el-menu-item index="/article/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">头像</template>
            <el-menu-item index="/avatar/create">头像上传</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-user"></i>账号管理</template>
          <el-menu-item-group>
            <template slot="title">账号</template>
            <el-menu-item index="/admin/create">新建账号</el-menu-item>
            <el-menu-item index="/admin/list">账号列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <!-- <i class="el-icon-setting" style="margin-right: 15px"></i> -->
        <!-- <span>王小虎</span> -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-avatar shape="square" :size="40" :src="avatar" style="vertical-align: middle;"></el-avatar>
            {{username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-switch-button" @click.native="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      avatar: ''
    }
  },
  methods: {
    loginOut() {
      localStorage.clear()
      this.$router.push('/login')
    },
    loadUserInfo() {
      this.username = localStorage.getItem('username')
      this.avatar = localStorage.getItem('avatar')
    }
  },
  created() {
    this.loadUserInfo()
  },
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

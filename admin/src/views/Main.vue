<template>
  <el-container style="height: 100vh">
    <el-aside :width="isCollapse ? '65px' : '200px'">
      <el-menu
        router
        unique-opened
        :default-active="redirectRoutePath"
        :collapse="isCollapse"
        :collapse-transition="false"
        background-color="#304156"
        text-color="#ddd"
      >
        <el-submenu
          index="1"
          data-step="1"
          data-intro="分类管理"
          data-position="right"
        >
          <template slot="title"
            ><i class="el-icon-folder-opened"></i
            ><span>分类管理</span></template
          >
          <el-menu-item index="/category/create">新建分类</el-menu-item>
          <el-menu-item index="/category/list">分类列表</el-menu-item>
        </el-submenu>
        <el-submenu
          index="2"
          data-step="2"
          data-intro="文章管理"
          data-position="right"
        >
          <template slot="title"
            ><i class="el-icon-document"></i><span>文章管理</span></template
          >
          <el-menu-item index="/article/create">新建文章</el-menu-item>
          <el-menu-item index="/article/list">文章列表</el-menu-item>
        </el-submenu>
        <el-submenu
          index="3"
          data-step="3"
          data-intro="头像管理"
          data-position="right"
        >
          <template slot="title"
            ><i class="el-icon-picture-outline-round"></i
            ><span>头像管理</span></template
          >
          <el-menu-item index="/avatar/create">头像上传</el-menu-item>
        </el-submenu>
        <el-submenu
          index="4"
          data-step="4"
          data-intro="账号管理"
          data-position="right"
        >
          <template slot="title"
            ><i class="el-icon-user"></i><span>账号管理</span></template
          >
          <el-menu-item index="/admin/create">新建账号</el-menu-item>
          <el-menu-item index="/admin/list">账号列表</el-menu-item>
        </el-submenu>
        <el-submenu
          index="5"
          data-step="5"
          data-intro="其他功能"
          data-position="right"
        >
          <template slot="title"
            ><i class="el-icon-collection"></i><span>其他内容</span></template
          >
          <el-menu-item @click="guide">新手引导</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <!-- <el-button type="primary" @click="collapseMenu">菜单</el-button> -->
        <div
          class="toggle-button"
          @click="collapseMenu"
          data-step="6"
          data-intro="折叠和展开菜单"
          data-position="right"
        >
          <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
        <el-dropdown
          trigger="click"
          data-step="7"
          data-intro="全屏显示和退出登录"
          data-position="left"
        >
          <span class="el-dropdown-link">
            <el-avatar
              shape="square"
              :size="30"
              :src="avatar"
              style="vertical-align: middle"
            ></el-avatar>
            {{ username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-rank"
              @click.native="clickFullscreen"
              >全屏显示</el-dropdown-item
            >
            <el-dropdown-item
              icon="el-icon-switch-button"
              @click.native="loginOut"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <transition name="slide-fade">
          <router-view :key="$route.path"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import screenfull from 'screenfull'
import introJs from 'intro.js'
import 'intro.js/introjs.css'
export default {
  data() {
    return {
      username: '',
      avatar: '',
      isCollapse: false,
      isFullscreen: false,
    }
  },
  computed: {
    redirectRoutePath() {
      const rootRoutePath = this.$route.path.split('/')[1]
      // 将编辑页面路由定向到列表页
      const nodeRoutePath =
        this.$route.path.split('/')[2] === 'edit'
          ? 'list'
          : this.$route.path.split('/')[2]
      return '/' + rootRoutePath + '/' + nodeRoutePath
    },
  },
  methods: {
    guide() {
      introJs()
        .setOptions({
          prevLabel: '上一步',
          nextLabel: '下一步',
          skipLabel: '跳过',
          doneLabel: '结束',
        })
        .oncomplete(function () {
          //点击跳过按钮后执行的事件
        })
        .onexit(function () {
          //点击结束按钮后， 执行的事件
        })
        .start()
    },
    loginOut() {
      localStorage.clear()
      sessionStorage.clear()
      this.$router.push('/login')
    },
    loadUserInfo() {
      this.username =
        localStorage.getItem('username') || sessionStorage.getItem('username')
      this.avatar =
        localStorage.getItem('avatar') || sessionStorage.getItem('avatar')
    },
    collapseMenu() {
      this.isCollapse = !this.isCollapse
    },
    clickFullscreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '您的浏览器不支持全屏显示！',
          type: 'warning',
        })
        return false
      }
      screenfull.toggle()
    },
  },
  created() {
    this.loadUserInfo()
  },
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  .toggle-button {
    font-size: 22px;
    cursor: pointer;
  }
  .el-dropdown {
    cursor: pointer;
  }
}

.el-aside {
  background-color: #304156;
  .el-menu {
    border-right: none;
    .el-submenu i {
      color: #ddd;
    }
  }
}

/* 页面切换淡出特效 */
.slide-fade-enter {
  transform: translateX(-1%);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: 0.25s;
}
.slide-fade-enter-to {
  opacity: 0.7;
}
.slide-fade-leave {
  opacity: 0;
}
.slide-fade-leave-to {
  opacity: 0;
}
</style>

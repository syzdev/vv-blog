<template>
  <el-row>
    <el-col
      :xs="24"
      :sm="24"
      :md="{ span: 20, offset: 2 }"
      :lg="{ span: 16, offset: 4 }"
      :xl="{ span: 14, offset: 5 }"
    >
      <div class="container">
        <div class="header">
          <div class="header-title">
            <router-link to="/">vv-blog</router-link>
          </div>
          <div class="header-menu">
            <!-- 移动端的导航菜单 -->
            <el-dropdown class="hidden-sm-and-up" trigger="click">
              <i class="el-icon-menu"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  ><router-link to="/">首页</router-link></el-dropdown-item
                >
                <el-dropdown-item
                  ><router-link to="/">分类</router-link></el-dropdown-item
                >
                <el-dropdown-item
                  ><router-link to="/about">关于</router-link></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 非移动端的导航菜单 -->
            <ul class="hidden-sm-and-down">
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/">分类</router-link></li>
              <li><router-link to="/about">关于</router-link></li>
            </ul>
          </div>
        </div>
        <!-- 文章区域 -->
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  min-height: 100vh; // 兼容关于页面高度
  // width: 900px;
  // margin: 20px auto;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
  background: #fff;
  .header {
    display: flex;
    height: 60px;
    border-bottom: 2px solid #f5f5f5;
    justify-content: space-between;
    margin-bottom: 20px;
    .header-title {
      @include flex-center;
      font-size: 30px;
      font-weight: bold;
    }
    .header-menu {
      @include flex-center;
      ul {
        list-style: none;
        li {
          display: inline-block;
          margin: 0 20px;
        }
      }
      .el-dropdown {
        color: #409eff;
        font-size: 30px;
      }
    }
  }
}

// 移动端样式
@media screen and (max-width: 768px) {
  .container {
    padding: 2px 10px;
    border-radius: 0px;
    /deep/ .v-show-content {
      padding: 4px !important;
    }
  }
}

/* 页面切换淡出特效 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.25s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
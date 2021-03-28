<template>
  <div class="container">
    <div class="header">
      <div class="header-title">
        <router-link to="/">vv-blog</router-link>
      </div>
      <div class="header-menu">
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/">分类</router-link></li>
          <li><router-link to="/about">关于</router-link></li>
        </ul>
      </div>
    </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
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
  width: 900px;
  margin: 20px auto;
  padding: 30px;
  border-radius: 20px;
  box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028),
    0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042),
    0 41.8px 33.4px rgba(0, 0, 0, 0.05),
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
    }
  }
}

/* 页面切换淡出特效 */
.slide-fade-enter {
  transition: all 0.2s;
  opacity: 0;
  transform: translateX(-1.5%);
}
.slide-fade-enter-active {
  opacity: 0.7;
  transition: all 0.5s;
}
.slide-fade-enter-to {
  opacity: 0.7;
  transition: all 0.3s;
}
.slide-fade-leave-active {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(1.5%);
}
.slide-fade-leave {
  // transition: all 0.2s;
  opacity: 0;
}
.slide-fade-leave-to {
  // transition: all 0.2s;
  opacity: 0;
}
</style>
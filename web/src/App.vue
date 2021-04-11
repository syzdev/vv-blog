<template>
  <div id="app">
    <div class="parallax">
      <!-- <h1>123</h1> -->
      <!-- 首页背景 -->
      <div class="parallax__layer parallax__layer__0">
        <img src="./assets/bg/layer_0.png" />
      </div>
      <div class="parallax__layer parallax__layer__1">
        <img src="./assets/bg/layer_1.png" />
      </div>
      <div class="parallax__layer parallax__layer__2">
        <img src="./assets/bg/layer_2.png" />
      </div>
      <div class="parallax__layer parallax__layer__3">
        <img src="./assets/bg/layer_3.png" />
      </div>
      <div class="parallax__layer parallax__layer__4">
        <img src="./assets/bg/layer_4.png" />
      </div>
      <div class="parallax__layer parallax__layer__5">
        <img src="./assets/bg/layer_5.png" />
      </div>
      <div class="parallax__layer parallax__layer__6">
        <img src="./assets/bg/layer_6.png" />
      </div>
      <!-- 向下滚动按钮 -->
      <h1 @click="handleScroll" class="scroll-btn hidden-sm-and-down">
        <i class="el-icon-arrow-down"></i>
      </h1>
      <!-- 内容区域 -->
      <div class="parallax__cover" id="scroll-target">
        <router-view />
      </div>
    </div>
    <!-- 回到顶部按钮，el-backtop组件的target属性一定要是产生滚动的组件 -->
    <el-backtop
      target=".parallax"
      :right="100"
      :bottom="80"
      class="hidden-sm-and-down"
      ><i class="el-icon-arrow-up"></i
    ></el-backtop>
  </div>
</template>

<script>
export default {
  methods: {
    handleScroll() {
      document.getElementById('scroll-target').scrollIntoView({
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  // overflow-y: scroll; // 避免滚动条造成页面闪烁
  background-color: #fedcc8;
}
/*包含以下四种链接*/
a {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
a:link {
  color: #409eff;
}
/*已经访问过的链接*/
a:visited {
  color: #409eff;
}
/*鼠标划过(停留)的链接*/
a:hover {
  color: pink;
  transition: all 0.3s;
}
/* 正在点击的链接*/
a:active {
  color: pink;
}

.parallax {
  perspective: 100px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  // position: absolute;
  // top: 0;
  // left: 50%;
  // right: 0;
  // bottom: 0;
  // margin-left: -1500px;
  // margin-left: -150px;
  .parallax__layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -99; // 使其他元素在背景之上
    img {
      display: block;
      position: absolute;
      bottom: 0;
    }
  }
  .parallax__cover {
    background: #2d112b;
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    // height: 2000px;
    // z-index: 2;
  }
  // 向下滚动按钮
  .scroll-btn {
    position: absolute;
    bottom: 0;
    left: 50%;
    animation: rotate 0.75s infinite;
    cursor: pointer;
    color: #fff;
    @keyframes rotate {
      0% {
        transform: translate(-50%, -50%);
      }
      25% {
        transform: translate(-50%, -40%);
      }
      50% {
        transform: translate(-50%, -30%);
      }
      75% {
        transform: translate(-50%, -40%);
      }
      100% {
        transform: translate(-50%, -50%);
      }
    }
  }
}

$parallax__layers: 6;

@for $i from 0 through $parallax__layers {
  $x: ($parallax__layers - $i) / 2;
  .parallax__layer__#{$i} {
    transform: translateZ(-100 * $x#{px}) scale($x + 1);
  }
}

// 移动端样式
@media screen and (max-width: 768px) {
  .parallax__cover {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
// 非移动端滚动条样式
@media screen and (min-width: 768px) {
  /* 修改滚动条样式 */
  .parallax::-webkit-scrollbar {
    /* 滚动条整体样式，高宽分别对应横竖滚动条的尺寸 */
    width: 10px;
    height: 1px;
  }
  .parallax::-webkit-scrollbar-thumb {
    /* 滚动条方块 */
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #2d112b;
  }
  .parallax::-webkit-scrollbar-track {
    /* 滚动条轨道 */
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #fedcc8;
  }
}
</style>

<template>
  <div id="app">
    <div class="parallax">
      <div class="parallax__layer parallax__layer__0">
        <img
          src="./assets/bg/layer_0.png"
        />
      </div>
      <div class="parallax__layer parallax__layer__1">
        <img
          src="./assets/bg/layer_1.png"
        />
      </div>
      <div class="parallax__layer parallax__layer__2">
        <img
          src="./assets/bg/layer_2.png"
        />
      </div>
      <div class="parallax__layer parallax__layer__3">
        <img
          src="./assets/bg/layer_3.png"
        />
      </div>
      <div class="parallax__layer parallax__layer__4">
        <img
          src="./assets/bg/layer_4.png"
        />
      </div>
      <div class="parallax__layer parallax__layer__5">
        <img
          src="./assets/bg/layer_5.png"
        />
      </div>
      <div class="parallax__layer parallax__layer__6">
        <img
          src="./assets/bg/layer_6.png"
        />
      </div>
      <div class="parallax__cover">
        <!-- <h2 style="color: #fff" @click="handleScroll" id="target">123123</h2> -->
        <router-view />
      </div>
    </div>
    <!-- el-backtop组件的target属性一定要是产生滚动的组件 -->
    <el-backtop target=".parallax" :right="100" :bottom="100"><i class="el-icon-arrow-up"></i></el-backtop>
  </div>
</template>

<script>
export default {
  methods: {
    // handleScroll() {
    //   // alert("123123")
    //   document.getElementById("target").scrollIntoView( {
    //     behavior: 'smooth'
    //   });
    // }
  },  
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
/* 避免滚动条造成页面闪烁 */
body {
  // overflow-y: scroll;
  background-color: #fedcc8;
  // background: url('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1640747396,1326062358&fm=26&gp=0.jpg');
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
}

.parallax__layer{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  img{
    display: block;
    position: absolute;
    bottom: 0;
  }
}

.parallax__cover{
  background: #2D112B;
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  // height: 2000px;
  // z-index: 2;
}

$parallax__layers: 6;

@for $i from 0 through $parallax__layers {
  $x: ($parallax__layers - $i) / 2;
  .parallax__layer__#{$i}{
     transform: translateZ(-100 * $x#{px}) scale($x + 1);
  }
}
</style>

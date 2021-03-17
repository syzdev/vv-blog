<template>
  <div id="app">
    <router-view />
    <el-backtop><i class="el-icon-arrow-up"></i></el-backtop>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
/* 避免滚动条造成页面闪烁 */
body {
  overflow-y: scroll;
  /* background-color: #eee; */
  background: url('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1640747396,1326062358&fm=26&gp=0.jpg');
}
/*包含以下四种链接*/
a {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
a:link {
  color: #409EFF;
}
/*已经访问过的链接*/
a:visited {
  color: #409EFF;
}
/*鼠标划过(停留)的链接*/
a:hover {
  color: pink;
  transition: all .3s
}
/* 正在点击的链接*/
a:active {
  color: pink;
}
</style>

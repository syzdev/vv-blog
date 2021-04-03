<template>
  <!-- 内容为空展示的图片 -->
  <div class="empty">
    <img src="../assets/pic-empty.png" />
    <span>空空如也~~~</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.empty {
  text-align: center;
  img {
    vertical-align: middle;
    height: 600px;
  }
  span {
    font-size: 35px;
    color: #304156;
  }
}
</style>
<template>
  <div class="container">
    <div class="header">
      <div class="header-title">
        <router-link to="/about">syzdev's Blog</router-link>
      </div>
      <div class="header-menu">
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/">分类</router-link></li>
          <li><router-link to="/">关于</router-link></li>
        </ul>
      </div>
    </div>
    <!-- <ul v-for="item in items" :key="item._id">
      <li>{{item.title}}</li>
    </ul> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('/article/list')
      this.items = res.data
      console.log(this.items)
    },
  },
  created() {
    this.fetch()
  },
}
</script>

<style lang="scss">
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 800px;
  margin: 0 auto;
  .header {
    display: flex;
    height: 60px;
    border-bottom: 1px solid #f5f5f5;
    justify-content: space-between;
    .header-title {
      @include flex-center;
      font-size: 25px
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
</style>
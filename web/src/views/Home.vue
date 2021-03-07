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
    <div class="content">
      <div class="article-card" v-for="item in items" :key="item._id">
        <div class="articel-title">
          <div class="article-category" v-for="category in item.category" :key="category._id">[{{category.name}}]</div>
          {{item.title}}
        </div>
        <div class="article-desc">{{item.body}}</div>
        <div class="article-detail">posted @ {{item.updatedAt|timeFormat}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
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
  filters: {
    timeFormat(value, format="YYYY-MM-DD HH:mm:ss") {
      return dayjs(value).format(format)
    }
  }
}
</script>

<style lang="scss">
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
@mixin text-ellipsis {
  white-space: nowrap; // 禁止换行
  overflow: hidden; // 多出的文本隐藏
  text-overflow: ellipsis; // 多出的部分以省略号的形式显示
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
  .content {
    .article-card {
      width: 800px;
      height: 150px;
      margin: 10px 0;
      padding: 5px;
      border-radius: 5px;
      border-bottom: 1px solid #f5f5f5;
      color: #586069;
      .articel-title {
        font-size: 20px;
        @include text-ellipsis;
        .article-category {
          display: inline-block;
        }
      }
      .article-desc {
        margin: 10px 0;
        overflow: hidden;
        height: 85px;
      }
      .article-detail {
        display: flex;
        flex-direction: row-reverse;
      }
    }
  }
}

</style>

<template>
  <div class="container">
    <div class="content">
      <transition-group name="slide-fade" tag="div">
        <div class="article-card" v-for="item in items" :key="item._id">
          <div class="articel-title">
            <div class="article-category" v-for="category in item.category" :key="category._id">[{{category.name}}]</div>
            <router-link :to="`/article/${item._id}`" >{{item.title}}</router-link>
          </div>
          <div class="article-desc">{{item.body}}</div>
          <div class="article-detail">posted @ {{item.updatedAt|timeFormat}}</div>
        </div>
      </transition-group>
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

.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<template>
  <div class="content">
    <div class="article-card" v-for="item in items" :key="item._id">
      <div class="articel-title">
        <!-- <div class="article-category" v-for="category in item.category" :key="category._id">[{{category.name}}]</div> -->
        <router-link :to="`/article/${item._id}`">{{ item.title }}</router-link>
      </div>
      <div class="article-desc">{{ item.body }}</div>
      <div class="article-detail">
        posted @ {{ item.updatedAt | timeFormat }}
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页显示的数据个数
      total: 0, // 总数据个数
    }
  },
  methods: {
    // 监听每页数据个数的改变
    handleSizeChange(paramPageSize) {
      this.pageSize = paramPageSize
      this.handleCurrentChange()
    },
    // 监听页码值的改变
    async handleCurrentChange(paramCurrentPage) {
      this.currentPage = paramCurrentPage
      const res = await this.$http.get(
        `/article/list/${this.currentPage}/${this.pageSize}`
      )
      this.items = res.data
    },
    async fetch() {
      const res = await this.$http.get('/article/list')
      this.total = res.data.length
      this.handleCurrentChange()
    },
  },
  created() {
    this.fetch()
  },
}
</script>

<style lang="scss" scoped>
@mixin text-ellipsis {
  white-space: nowrap; // 禁止换行
  overflow: hidden; // 多出的文本隐藏
  text-overflow: ellipsis; // 多出的部分以省略号的形式显示
}
.content {
  .article-card {
    width: 900px;
    height: 160px;
    margin: 10px 0;
    padding: 5px;
    border-radius: 5px;
    border-bottom: 1px solid #f5f5f5;
    color: #586069;
    .articel-title {
      font-size: 20px;
      font-weight: bold;
      @include text-ellipsis;
      .article-category {
        display: inline-block;
      }
    }
    .article-desc {
      margin: 10px 0;
      overflow: hidden;
      height: 75px;
      line-height: 1.5em;
      word-break: break-all; // 单词强制换行
      &:before {
        content: '摘要：';
      }
    }
    .article-detail {
      display: flex;
      flex-direction: row-reverse;
    }
  }
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>

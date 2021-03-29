<template>
  <div class="container">
    <el-page-header @back="goBack" content="文章列表"></el-page-header>
    <el-divider></el-divider>
    <!-- 表格内容部分 -->
    <el-table :data="items" border>
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
        :formatter="timeFormatCreated"
      ></el-table-column>
      <el-table-column
        prop="updatedAt"
        label="最后修改时间"
        :formatter="timeFormatUpdated"
        sortable
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="260">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-camera"
            type="warning"
            size="small"
            @click="handleArticlePreview(scope.row._id)"
            >预览</el-button
          >
          <el-button
            icon="el-icon-edit"
            type="primary"
            size="small"
            @click="$router.push(`/article/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="remove(scope.row)"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页部分 -->
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
    <!-- 文章预览 -->
    <el-drawer
      title="title"
      direction="ltr"
      show-close
      size="898px"
      :visible.sync="drawer"
      >
      <template slot="title" >
        <span style="font-size: 20px;">{{articlePreviewModel.title}}</span>
      </template>
      <mavon-editor
        :value="articlePreviewModel.body"
        :subfield="false"
        defaultOpen="preview"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        :ishljs="true"
        :boxShadow="false"
      />
    </el-drawer>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      items: [], // 表格数据
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页显示的数据个数
      total: 0, // 总数据个数
      drawer: false, // 文章预览drawer
      articlePreviewModel: {}, // 保存文章预览的model
    }
  },
  methods: {
    async handleArticlePreview(id) {
      // 打开drawer
      this.drawer = true
      // 请求文章内容
      const res = await this.$http.get(`rest/article/${id}`)
      this.articlePreviewModel = res.data
    },
    goBack() {
      this.$router.go(-1)
    },
    // 监听每页数据个数的改变
    handleSizeChange(paramPageSize) {
      this.pageSize = paramPageSize
      this.handleCurrentChange()
    },
    // 监听页码值的改变
    async handleCurrentChange(paramCurrentPage) {
      this.currentPage = paramCurrentPage
      const res = await this.$http.get(
        `rest/article/${this.currentPage}/${this.pageSize}`
      )
      this.items = res.data
    },
    // 创建时间格式化
    timeFormatCreated(row) {
      return dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')
    },
    // 更新时间格式化
    timeFormatUpdated(row) {
      return dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    },
    // 初始化时获取数据
    async fetch() {
      const res = await this.$http.get('rest/article')
      this.total = res.data.length
      this.handleCurrentChange()
    },
    // 删除文章
    async remove(row) {
      this.$confirm(`此操作将永久删除文章【${row.title}】, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await this.$http.delete(`rest/article/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        this.fetch()
      })
    },
  },
  created() {
    this.fetch()
  },
}
</script>

<style lang="scss" scoped>
.container {
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
  .el-table {
    border-radius: 2px;
    box-shadow:
      0 0.3px 2.2px rgba(0, 0, 0, 0.001),
      0 0.7px 5.3px rgba(0, 0, 0, 0.003),
      0 1.3px 10px rgba(0, 0, 0, 0.005),
      0 2.2px 17.9px rgba(0, 0, 0, 0.008),
      0 4.2px 33.4px rgba(0, 0, 0, 0.014),
      0 10px 80px rgba(0, 0, 0, 0.07);
  }
  // 给drawer加上滚动条
  /deep/ .el-drawer__body {
    overflow: auto;
  }
  // 修改drawer的header样式
  /deep/ .el-drawer__header {
    z-index: 9999;
    border-bottom: 1px solid #fff;
    box-shadow:
      0 0px 29.9px rgba(0, 0, 0, 0.006),
      0 0px 80px rgba(0, 0, 0, 0.07);
    color: #409EFF;
    margin-bottom: 0;
    padding-bottom: 13px;
    span {
      font-weight: bold;
      font-size: 23px !important;
    }
    // 去除关闭按钮点击时的边框线
    .el-drawer__close-btn {
      outline: none;
    }
  }
}
</style>
<template>
  <div class="container">
    <el-page-header @back="goBack" content="账号列表"></el-page-header>
    <el-divider></el-divider>
    <el-table :data="items" border>
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="_id" label="ID" width="300"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" :src="scope.row.avatar" ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            size="small"
            @click="$router.push(`/admin/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="remove(scope.row)" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
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
        `rest/admin/${this.currentPage}/${this.pageSize}`
      )
      this.items = res.data
    },
    async fetch() {
      const res = await this.$http.get('rest/admin')
      this.total = res.data.length
      this.handleCurrentChange()
    },
    async remove(row) {
      this.$confirm(
        `此操作将永久删除账号【${row.username}】, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(async () => {
        await this.$http.delete(`rest/admin/${row._id}`)
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
}
</style>
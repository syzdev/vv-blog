<template>
  <div>
    <h1>账号列表</h1>
    <el-table :data="items">
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
      const res = await this.$http.get('rest/admin')
      this.items = res.data
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

<style>
</style>
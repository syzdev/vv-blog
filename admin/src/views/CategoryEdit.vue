<template>
  <div class="about">
    <el-page-header
      @back="goBack"
      :content="id ? '编辑分类' : '新建分类'"
    ></el-page-header>
    <el-divider></el-divider>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/category/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/category', this.model)
      }
      this.$router.push('/category/list')
      this.$message({
        type: 'success',
        message: '保存成功！',
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/category/${this.id}`)
      this.model = res.data
    },
  },
  created() {
    this.id && this.fetch()
  },
}
</script>

<style>
</style>
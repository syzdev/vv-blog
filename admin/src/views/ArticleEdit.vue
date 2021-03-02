<template>
  <div class="about">
    <h1 v-if="id">编辑文章</h1>
    <h1 v-else>新建文章</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.category" multiple>
          <el-option v-for="item in category" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <mavon-editor v-model="model.body"/>
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
      category: []
    }
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/article/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/article', this.model)
      }
      this.$router.push('/article/list')
      this.$message({
        type: 'success',
        message: '保存成功！',
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/article/${this.id}`)
      this.model = res.data
    },
    async fetchCategory() {
      const res = await this.$http.get(`rest/category`)
      this.category = res.data
    }
  },
  created() {
    this.fetchCategory()
    this.id && this.fetch()
  },
}
</script>

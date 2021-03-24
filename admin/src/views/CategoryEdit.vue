<template>
  <div class="about">
    <el-page-header
      @back="goBack"
      :content="id ? '编辑分类' : '新建分类'"
    ></el-page-header>
    <el-divider></el-divider>
    <el-form
      label-width="80px"
      @submit.native.prevent="save"
      ref="categoryFormRef"
      :rules="categoryFormRules"
      :model="model"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name" placeholder="请输入分类名称"></el-input>
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
      // 表单验证
      categoryFormRules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async save() {
      this.$refs.categoryFormRef.validate(async (valid) => {
        // 验证未通过，直接返回
        if (!valid) {
          return
        }
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
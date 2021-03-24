<template>
  <div class="about">
    <el-page-header
      @back="goBack"
      :content="id ? '编辑文章' : '新建文章'"
    ></el-page-header>
    <el-divider></el-divider>
    <el-form
      label-width="80px"
      @submit.native.prevent="save"
      ref="articleFormRef"
      :rules="articleFormRules"
      :model="model"
    >
      <el-form-item label="所属分类" prop="category">
        <el-select v-model="model.category" multiple>
          <el-option
            v-for="item in category"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="model.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="详情" prop="body">
        <mavon-editor v-model="model.body" />
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
      category: [],
      articleFormRules: {
        category: [
          { required: true, message: '请选择所属分类', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur',
          },
        ],
        body: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
      },
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async save() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // 验证未通过，直接返回
        if (!valid) {
          return
        }
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
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/article/${this.id}`)
      this.model = res.data
    },
    async fetchCategory() {
      const res = await this.$http.get(`rest/category`)
      this.category = res.data
    },
  },
  created() {
    this.fetchCategory()
    this.id && this.fetch()
  },
}
</script>

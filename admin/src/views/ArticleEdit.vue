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
      <el-form-item label="内容">
        <el-tabs type="border-card" v-model="model.format">
          <el-tab-pane label="Markdown编辑器" name="md"><mavon-editor ref="md" @imgAdd="$imgAdd" v-model="model.body"/></el-tab-pane>
          <el-tab-pane label="富文本编辑器" name="doc"><vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="tempModelBody"/></el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
export default {
  props: {
    id: {},
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      tempModelBody:'', // 富文本编辑器内容，model.body默认保存markdown编辑器内容
      model: {
        format: "md", // 编辑器类型默认为markdown
      },
      category: [], // 下拉框选择文本类型
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
      },
    }
  },
  methods: {
    // 处理Markdown编辑器自定义图片上传
    async $imgAdd(pos, $file){
      const formData = new FormData()
      formData.append('file', $file)
      const res = await this.$http.post('upload', formData)
      this.$refs.md.$img2Url(pos, res.data.url)
    },
    // 处理富文本编辑器自定义图片上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    },
    goBack() {
      this.$router.go(-1)
    },
    async save() {
      this.$refs.articleFormRef.validate(async (valid) => {
        // 验证未通过，直接返回
        if (!valid) {
          return
        }
        // 编辑器类型默认为markdown，若是富文本类型，则要修改为富文本编辑器中的内容
        if (this.model.format == "doc") {
          this.model.body = this.tempModelBody
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
      // 获取到的文章是富文本内容，修改成富文本编辑器的data
      if (this.model.format == "doc") {
        this.tempModelBody = this.model.body
        this.model.body = ""
      }
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

<template>
  <div class="about">
    <h1 v-if="id">编辑账号</h1>
    <h1 v-else>新建账号</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          :action="uploadURL"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    async save() {
      if (this.id) {
        await this.$http.put(`rest/admin/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/admin', this.model)
      }
      this.$router.push('/admin/list')
      this.$message({
        type: 'success',
        message: '保存成功！',
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin/${this.id}`)
      this.model = res.data
    },
    handleAvatarSuccess(res) {
      this.$set(this.model, 'avatar', res.url)
      // this.model.avatar = res.url
    },
  },
  created() {
    this.id && this.fetch()
  },
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
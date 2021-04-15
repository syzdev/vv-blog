<template>
  <div class="container">
    <div class="comment-form">
      <el-input
        type="textarea"
        rows="3"
        v-model="commentObj.content"
        :placeholder="atReplyPlaceholder"
      ></el-input>
      <div class="comment-visitor">
        <div class="avatar" @click="dialogVisible = true">
          <img v-if="visitorInfo.avatar" :src="visitorInfo.avatar" />
          <img
            v-else
            src="https://img.lguohe.com/uploads/2020/08/touxiangmoren.jpg"
          />
          <span>
            {{ visitorInfo.nickname || '点击评论' }}
          </span>
        </div>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-edit-outline"
          @click="postComment"
          >提交</el-button
        >
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="250px"
    >
      <div>
        <el-form label-width="70px" :model="visitorInfo">
          <el-form-item label="QQ账号">
            <el-input v-model="visitorInfo.qq"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    atReplyName: String,
    atReplyVisitorId: String,
    atReplyPlaceholder: String,
    articleId: String,
    parentCommentId: String,
  },
  data() {
    return {
      dialogVisible: false,
      visitorInfo: {
        nickname: '',
        avatar: '',
        qq: '',
        // _id: '',
      },
      commentObj: {
        nickname: '',
        avatar: '',
        content: '',
        relatedArticleId: this.articleId,
        parentCommentId: '',
        atReplyName: '',
      },
    }
  },
  methods: {
    async postComment() {
      if (!localStorage.visitorInfo) {
        return (this.dialogVisible = true)
      }
      if (!this.commentObj.content) {
        return this.$message.warning('评论内容不能为空！')
      }
      this.commentObj.nickname = this.visitorInfo.nickname
      this.commentObj.avatar = this.visitorInfo.avatar
      this.commentObj.visitorId = this.visitorInfo._id
      this.commentObj.parentCommentId =
        this.parentCommentId || '10ce6d312016ac0000000000'
      this.commentObj.atReplyName = this.atReplyName || 'syzdev'
      await this.$http.post('/comment', this.commentObj)
      this.commentObj.content = ''
      this.$emit('comment-success')
      this.$message.success('评论成功！')
    },
    async register() {
      if (!this.visitorInfo.qq) {
        return this.$message.warning('请输入QQ账号！')
      }
      let {
        data: { data: profile },
      } = await axios.get(`https://api.usuuu.com/qq/${this.visitorInfo.qq}`)
      this.visitorInfo.avatar = profile.avatar
      this.visitorInfo.nickname = profile.name
      if (this.visitorInfo._id) {
        await this.$http.put(
          `visitor/${this.visitorInfo._id}`,
          this.visitorInfo
        )
      } else {
        const res = await this.$http.post('visitor', this.visitorInfo)
        this.visitorInfo._id = res.data._id
      }
      localStorage.visitorInfo = JSON.stringify(this.visitorInfo)
      this.dialogVisible = false
    },
  },
  created() {
    this.visitorInfo = localStorage.visitorInfo
      ? JSON.parse(localStorage.visitorInfo)
      : this.visitorInfo
  },
}
</script>

<style lang="scss" scoped>
.container {
  .comment-form {
    /deep/.el-textarea__inner {
      background-color: #eee;
      font-size: 16px;
    }
    .comment-visitor {
      padding: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar {
        display: inline-block;
        cursor: pointer;
        img {
          width: 35px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .el-button {
        height: 30px;
      }
    }
  }
}
</style>

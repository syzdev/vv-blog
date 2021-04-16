<template>
  <div v-if="model">
    <div class="title">{{ model.title }}</div>
    <div class="desc">
      <span class="desc-date"
        ><i class="el-icon-date"></i>{{ model.updatedAt | timeFormat }}</span
      >
      <span><i class="el-icon-price-tag"></i></span>
      <!-- 一个文章的分类可能有多个，需要遍历展示 -->
      <span class="desc-category">
        <span v-for="category in model.category" :key="category._id">{{
          category.name
        }}</span>
      </span>
    </div>
    <!-- 点击图片存在显示问题，暂时关闭图片点击预览(imageClick)功能 -->
    <mavon-editor
      :value="model.body"
      :subfield="false"
      defaultOpen="preview"
      :toolbarsFlag="false"
      :editable="false"
      :scrollStyle="true"
      :ishljs="true"
      :boxShadow="false"
      codeStyle="atom-one-dark"
      :imageClick="null"
    />
    <el-divider></el-divider>
    <!-- 评论部分 -->
    <div class="comment-title">
      <span>评论</span>
    </div>
    <!-- 评论文本框 -->
    <comment-textarea
      @comment-success="getArticleComment"
      type="parent"
      :articleId="id"
      placeholder="输入留言内容"
    ></comment-textarea>
    <el-divider></el-divider>
    <!-- 评论列表 -->
    <comment-list
      @update-comment-list="getArticleComment"
      :commentsList="parentComment"
      v-if="parentComment"
      :articleId="id"
    ></comment-list>
  </div>
</template>

<script>
import CommentTextarea from '../components/CommentTextarea'
import CommentList from '../components/CommentList'
export default {
  props: ['id'],
  components: {
    CommentTextarea,
    CommentList,
  },
  data() {
    return {
      model: null,
      parentComment: [],
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`article/${this.id}`)
      this.model = res.data
      console.log(res.data)
    },
    async getArticleComment() {
      const res = await this.$http.get(`/comment/${this.id}`)
      const articleComment = res.data
      this.parentComment = articleComment.filter(
        (v) => v.parentCommentId == '10ce6d312016ac0000000000'
      )
      this.parentComment.forEach((c) => {
        return (c.children = articleComment.filter(
          (v) => v.parentCommentId == c._id
        ))
      })
    },
  },
  created() {
    this.fetch()
    this.getArticleComment()
  },
}
</script>

<style lang="scss" scoped>
.title {
  line-height: 40px;
  font-size: 25px;
  margin-bottom: 20px;
  cursor: pointer;
  text-align: center;
}
.comment-title {
  margin: 20px 0px;
  text-align: center;
  font-size: 25px;
}
.desc {
  margin-bottom: 20px;
  color: #999;
  text-align: center;
  > span:nth-child(2) {
    padding-left: 30px;
  }
  // 移动端样式
  @media screen and (max-width: 768px) {
    > span:nth-child(2) {
      padding-left: 0px;
    }
    // 通过伪元素完成换行
    .desc-date:after {
      content: '\A';
      white-space: pre;
    }
  }
  .desc-category span:not(:last-child):after {
    content: '、';
  }
  i {
    font-size: 20px;
    margin-right: 0.2em;
  }
}
// 修改highlight.js代码样式
/deep/ .markdown-body pre {
  padding: 0px;
  font-size: 100% !important;
  .hljs {
    border-radius: 10px !important;
  }
}
</style>
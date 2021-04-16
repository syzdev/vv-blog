<template>
  <div class="container">
    <div v-if="commentsList.length === 0">
      <p>还没有评论~</p>
    </div>
    <div
      v-else
      v-for="(comment, index) in commentsList"
      :key="index"
      class="comment-container"
    >
      <div class="visitor-avatar-1">
        <img :src="comment.avatar" />
      </div>
      <div class="comment-box">
        <div class="comment-item">
          <strong class="comment-nickname">{{ comment.nickname }}</strong>
          <span>
            <span class>{{ comment.createdAt | formatDate }}</span>
            <strong
              v-if="comment.visitorId != visitorInfo._id"
              class="comment-reply"
              @click="handleReply(comment, index, false)"
              >回复</strong
            >
          </span>
        </div>
        <div class="comment-content">{{ comment.content }}</div>
        <div
          v-for="(childrenComment, i) in comment.children"
          :key="i"
          class="children-comment-container"
        >
          <div class="visitor-avatar-2">
            <img :src="childrenComment.avatar" />
          </div>
          <div class="children-comment-box">
            <div class="children-comment-item">
              <span class="children-comment-nickname">
                <strong>{{ childrenComment.nickname }}</strong>
              </span>
              <span>
                <span>{{ childrenComment.createdAt | formatDate }}</span>
                <strong
                  v-if="childrenComment.visitorId != visitorInfo._id"
                  class="comment-reply"
                  @click="handleReply(comment, index, childrenComment)"
                >
                  回复
                </strong>
              </span>
            </div>
            <div class="children-comment-content">
              <span>@{{ childrenComment.atReplyName }}：</span>
              <span>{{ childrenComment.content }}</span>
            </div>
          </div>
        </div>
        <comment-textarea
          v-if="showReplyTextarea && commentIndex == index"
          @blur="showReplyTextarea = false"
          @comment-success="hideReplyTextarea"
          :articleId="articleId"
          :parentCommentId="comment._id"
          :atReplyName="atReplyName"
          :atReplyVisitorId="atReplyVisitorId"
          :atReplyPlaceholder="`@${atReplyPlaceholder}`"
        ></comment-textarea>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import CommentTextarea from './CommentTextarea'
export default {
  props: {
    articleId: String,
    commentsList: Array,
  },
  components: {
    CommentTextarea,
  },
  data() {
    return {
      atReplyPlaceholder: '',
      visitorInfo: {
        nickname: '',
        avatar: '',
        qq: '',
        // _id: '',
      },
      showReplyTextarea: false,
      parentCommentId: '',
      atReplyName: '',
      atReplyVisitorId: '',
      commentIndex: -1,
    }
  },
  filters: {
    formatDate(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  methods: {
    handleReply(comment, index, childrenComment) {
      this.showReplyTextarea = !this.showReplyTextarea
      this.commentIndex = index
      this.atReplyPlaceholder = childrenComment.nickname || comment.nickname
      this.atReplyName = childrenComment.nickname || comment.nickname
      this.atReplyVisitorId = childrenComment.visitorId || comment.visitorId
      this.parentCommentId = comment._id
    },
    hideReplyTextarea() {
      this.commentIndex = -1
      this.$emit('update-comment-list')
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
  .comment-container {
    display: flex;
    margin: 7px 0px;
    .visitor-avatar-1 {
      padding-right: 5px;
      img {
        height: 35px;
        border-radius: 50%;
      }
    }
    .comment-box {
      flex: 1;
      padding: 1px 7px;
      border-radius: 10px;
      background-color: #f5f5f5;
      .comment-item {
        .comment-nickname {
          margin-right: 10px;
        }
      }
      .comment-content {
        margin: 3px 0px;
        color: #333;
      }
      .comment-reply {
        display: none;
        margin-left: 10px;
        cursor: pointer;
        &:hover {
          color: pink;
        }
      }
      &:hover {
        .comment-reply {
          display: inline-block;
        }
      }
      .children-comment-container {
        margin-top: 10px;
        display: flex;
        .visitor-avatar-2 {
          padding-right: 5px;
          img {
            border-radius: 50%;
            height: 30px;
          }
        }
        .children-comment-box {
          flex: 1;
          background-color: #ddd;
          padding: 1px 7px;
          border-radius: 10px;
          .children-comment-item {
            margin: 5px 0px;
            .children-comment-nickname {
              margin-right: 10px;
            }
          }
          .children-comment-content {
            margin: 3px 0px;
            color: #333;
          }
        }
      }
    }
  }
}
</style>
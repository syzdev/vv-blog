const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  nickname: {
    type: String
  },
  avatar: {
    type: String
  },
  content: {
    type: String
  },
  visitorId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Visitor'
  },
  relatedArticleId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Article'
  },
  parentCommentId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Comment'
  },
  atReplyName: {
    type: String
  },
}, {
  timestamps: true
})
module.exports = mongoose.model('Comment', schema, 'Comment')
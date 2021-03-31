const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  category: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  title: { type: String },
  body: { type: String },
  format: { type: String },
  desc: { type: String },
}, {
  // 添加时间戳，包含createAt和updateAt
  timestamps: true
})

module.exports = mongoose.model('Article', schema, 'Article')

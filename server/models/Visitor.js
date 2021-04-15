const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  nickname: {
    type: String,
  },
  qq: {
    type: String
  },
  avatar: {
    type: String
  }
}, {
  timestamps: true
})
module.exports = mongoose.model('Visitor', schema, 'Visitor')
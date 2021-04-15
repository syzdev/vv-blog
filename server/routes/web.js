module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../models/Category')
  const Article = require('../models/Article')
  const Comment = require('../models/Comment')
  const Visitor = require('../models/Visitor')
  // 获取分类列表接口
  router.get('/category/list', async (req, res) => {
    const model = await Category.find().limit(10)
    res.send(model)
  })
  // 获取文章列表接口
  router.get('/article/list', async (req, res) => {
    // const model = await Article.find().populate('category').limit(10)
    const model = await Article.find()
    res.send(model)
  })
  // 文章分页接口
  router.get('/article/list/:page/:size', async (req, res) => {
    // 将传过来的字符串转换为数字，否则报错'skip' field must be numeric.
    const page = parseInt(req.params.page)
    const size = parseInt(req.params.size)
    const items = await Article.find().skip(((page - 1) * size)).limit(size)
    // const total = await Article.find().count()
    res.send(items)
  })
  // 根据ID查询文章数据接口
  router.get('/article/:id', async (req, res) => {
    const model = await Article.findById(req.params.id).populate('category').limit(10)
    res.send(model)
  })
  // 添加评论
  router.post('/comment', async (req, res) => {
    const data = await Comment.create(req.body)
    res.send(data)
  })
  // 根据博客id获取评论
  router.get('/comment/:id', async (req, res) => {
    const comment = await Comment.find().where({
      relatedArticleId: req.params.id
    })
    res.send(comment)
  })
  // 保存访客
  router.post('/visitor', async (req, res) => {
    const data = await Visitor.create(req.body)
    res.send(data)
  })
  // 查询所有访客
  router.get('/visitor', async (req, res) => {
    const data = await Visitor.find()
    res.send(data)
  })
  // 根据id更新访客信息
  router.put('/visitor/:id', async (req, res) => {
    const data = await Visitor.findByIdAndUpdate(req.params.id, req.body)
    res.send(data) // 返回的是更新之前的数据
  })
  // 获取访客信息
  router.get('/visitor/:id', async (req, res) => {
    const data = await Visitor.findById(req.params.id)
    res.send(data)
  })
  app.use('/web/api', router)
}
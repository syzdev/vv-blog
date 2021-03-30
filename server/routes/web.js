module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../models/Category')
  const Article = require('../models/Article')

  router.get('/category/list', async (req, res) => {
    const model = await Category.find().limit(10)
    res.send(model)
  })

  router.get('/article/list', async (req, res) => {
    // const model = await Article.find().populate('category').limit(10)
    const model = await Article.find()
    res.send(model)
  })

  router.get('/article/list/:page/:size', async (req, res) => {
    // 将传过来的字符串转换为数字，否则报错'skip' field must be numeric.
    const page = parseInt(req.params.page)
    const size = parseInt(req.params.size)
    const items = await Article.find().skip(((page-1)*size)).limit(size)
    // const total = await Article.find().count()
    res.send(items)
  })

  router.get('/article/:id', async (req, res) => {
    const model = await Article.findById(req.params.id).populate('category').limit(10)
    res.send(model)
  })

  app.use('/web/api', router)
}
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
    const model = await Article.find().populate('category').limit(10)
    res.send(model)
  })

  router.get('/article/:id', async (req, res) => {
    const model = await Article.findById(req.params.id).populate('category').limit(10)
    res.send(model)
  })

  app.use('/web/api', router)
}
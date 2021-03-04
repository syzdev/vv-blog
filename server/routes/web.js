module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../models/Category')

  router.get('/category/list', async (req, res) => {
    const model = await Category.find().limit(10)
    res.send(model)
  })

  app.use('/web/api', router)
}
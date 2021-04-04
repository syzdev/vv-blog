module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Admin = require('../models/Admin')
  // 添加第一个管理员账号
  router.post('/admin', async (req, res) => {
    const model = await Admin.create(req.body)
    res.send(model)
  })
  app.use('/init/api', router)
}
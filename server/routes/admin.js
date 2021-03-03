module.exports = app => {
  const express = require('express')
  const Admin = require('../models/Admin')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  // 合并参数，使router能够获取到URL的动态参数
  const router = express.Router({
    mergeParams: true
  })
  // 通用提交接口
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 通用编辑修改接口
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 通用获取数据接口
  router.get('/', async (req, res) => {
    const items = await req.Model.find().limit(10)
    res.send(items)
  })
  // 通用按ID查询接口
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 通用删除接口
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  const authMiddleware = async (req, res, next) => {
    // authorization的格式是Bearer xxxxxxxxxxxxx，按空格分隔在提取最后一个元素，就能拿到token
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录！')
    // 通过token和密钥能够解析出jwt.sign时传入的用户id
    const { id } = jwt.verify(token, app.get('secret'))
    assert(id, 401, '请先登录！')
    // 通过id查找用户
    req.user = await Admin.findById(id)
    assert(req.user, 401, '请先登录！')
    await next()
  }

  const resourceMiddleware = async (req, res, next) => {
    req.Model = require(`../models/${req.params.resource}`)
    await next()
  }

  app.use('/admin/api/rest/:resource', authMiddleware, resourceMiddleware, router)

  // 图片上传
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../uploads'
  })
  app.post('/admin/api/upload', authMiddleware, upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 账号登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 根据用户名找用户
    // 定义时设置了不可取，在查询时要添加select
    const user = await Admin.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在！')
    // 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误！')
    // 返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  // 错误处理函数，处理assert抛出的异常
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
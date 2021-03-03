module.exports = options => {
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const Admin = require('../models/Admin')

  return async (req, res, next) => {
    // authorization的格式是Bearer xxxxxxxxxxxxx，按空格分隔在提取最后一个元素，就能拿到token
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录！')
    // 通过token和密钥能够解析出jwt.sign时传入的用户id
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录！')
    // 通过id查找用户
    req.user = await Admin.findById(id)
    assert(req.user, 401, '请先登录！')
    await next()
  }
}


module.exports = options => {
  return async (req, res, next) => {
    const resource = req.params.resource.charAt(0).toUpperCase() + req.params.resource.slice(1)
    req.Model = require(`../models/${resource}`)
    await next()
  }
}
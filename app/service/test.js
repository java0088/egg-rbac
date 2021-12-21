const BaseService = require('./base')
const md5 = require('md5')
module.exports = class TestService extends BaseService {
  db = 'User'
  async add(data) {
    const { ctx, db } = this
    const exists = await ctx.model[db].findOne({
      where: { username: data.username }
    })
    if (exists) {
      return ctx.body = { code: 1009, message: '用户名已经存在~' }
    }
    const user = await ctx.model[db].build(data)
    data.password = md5(data.password)
    return user.save()
  }
}
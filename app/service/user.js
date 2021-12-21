const BaseService = require('./base')
const md5 = require('md5')
module.exports = class UserService extends BaseService {
  db = 'User'

  async add(param) {
    const { ctx, db } = this
    const exists = await ctx.model[db].findOne({
      where: { username: param.username }
    })
    if (exists) {
      return { code: 1009, message: '用户名已经存在~' }
    }
    param.password = md5(param.password)
    const user = await ctx.model[db].create(param)
    return user
  }

  async update(param) {
    const { ctx, db } = this
    const id = param.id
    if (id < 1) ctx.throw(404, ctx.__('forbidden'))
    const data = await ctx.model[db].findByPk(id)
    if (!data) ctx.throw(404, ctx.__('noData'))
    if (param.password) param.password = md5(param.password)
    delete param.id
    return data.update(param)
  }
}
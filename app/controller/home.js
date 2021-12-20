'use strict';

const BaseController = require('./base');

class HomeController extends BaseController {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getUserList() {
    const { ctx } = this
    let list = await ctx.app.redis.get('user_list')
    let flag = true
    if (list) {
      list = JSON.parse(list)
    } else {
      list = await ctx.model.User.findAll()
      ctx.app.redis.set('user_list', JSON.stringify(list))
      ctx.app.redis.expire('user_list', 30)
      flag = false
    }
    ctx.body = { status: 0, data: list, msg: flag ? '缓存中读取' : '数据库中读取' }
  }

  async test() {
    const { ctx } = this
    const data = await ctx.service.user.page()
    this.ok({ code: 1000, data, message: '请求成功' })
  }
}

module.exports = HomeController;

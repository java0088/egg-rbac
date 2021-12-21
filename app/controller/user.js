'use strict';

const BaseController = require('./base');

module.exports = class TestController extends BaseController {
  async add() {
    const { ctx } = this
    const payload = ctx.request.body
    const data = await ctx.service.user.add(payload)
    if (data.code) {
      this.fail(data)
    } else {
      this.ok({ data, message: 'add success' })
    }
  }
  async update() {
    const { ctx } = this
    const payload = ctx.request.body
    const data = await ctx.service.user.update(payload)
    this.ok({ data, message: 'update success' })
  }
}

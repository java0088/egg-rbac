'use strict';

const BaseController = require('./base');

module.exports = class TestController extends BaseController {
  async page() {
    const { ctx } = this
    const data = await ctx.service.test.page()
    this.ok({ code: 1000, data, message: '请求成功' })
  }
  async list() {
    const { ctx } = this
    const data = await ctx.service.test.list()
    this.ok(data)
  }
}

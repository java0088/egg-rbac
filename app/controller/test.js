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
  async add() {
    const { ctx } = this
    const payload = ctx.request.body
    const data = await ctx.service.test.add(payload)
    this.ok({ data, message: 'add success' })
  }
  async update() {
    const { ctx } = this
    const payload = ctx.request.body
    const data = await ctx.service.test.update(payload)
    this.ok({ data, message: 'update success' })
  }
  async info() {
    const { ctx } = this
    const params = ctx.query
    const data = await ctx.service.test.info(params)
    this.ok(data)
  }

  async delete() {
    const { ctx } = this
    const { ids } = ctx.request.body
    
    const data = await ctx.service.test.delete(ids)
    this.ok({ data, message: 'delete success' })
  }
}

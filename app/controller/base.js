'use strict';

const Controller = require('egg').Controller;

module.exports = class BaseController extends Controller {
  ok(res) {
    const message = res.message || 'success'
    const data = res.data || res
    return this.ctx.body = {
      code: 200,
      message,
      data
    }
  }
  fail(res) {
    const message =  typeof res === 'string' ? res : res.message || 'error'
    const code = res.code || 500
    return this.ctx.body = {
      code,
      message
    }
  }
}

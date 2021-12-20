const { Service } = require('egg')
const PAGE_SIZE = 15
module.exports = class BaseService extends Service {
  
  // 分页查询
  async page({ page = 1, size = PAGE_SIZE, where = {}, order } = {}) {
    const { ctx, db } = this
    if (!db) ctx.throw('继承BaseService需要提供实列db属性，指明数据库')
    const limit = +size
    const offset = (page - 1) * limit
    
    const { count: total, rows } = await ctx.model[db].findAndCountAll({
      where,
      offset,
      limit,
      order: order || [[ 'id', 'DESC' ]],
    })
    return {
      list: rows,
      pagination: {
        page,
        size,
        total 
      }
    }
  }
  // 查询全部数据
  async list({ where = {}, order } = {}) {
    const { ctx, db } = this
    const data = await ctx.model[db].findAll({
      where,
      order: order || [[ 'id', 'DESC' ]],
    })
    return data
  }
  // 添加 
  async add() {

  }
  // 修改
  async update() {

  }
  // 删除
  async delete() {

  }
  // 查看详情
  async info() {

  }
}
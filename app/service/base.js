const { Service } = require('egg')
const { Op } = require('sequelize')
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
  async add(payload, where) {
    const { ctx, db } = this
    if (where) {
      const res = await ctx.model[db].findOne({ where })
      if (res) ctx.throw(404, ctx.__('data Exists'))
    }
    return await ctx.model[db].create(payload)
  }
  // 修改
  async update(payload, where) {
    const { ctx, db } = this
    const id = payload.id
    if (id < 1) ctx.throw(404, ctx.__('forbidden'))
    const data = await ctx.model[db].findByPk(id)
    if (!data) ctx.throw(404, ctx.__('noData'))
    if (where) {
      const res = await ctx.model[db].findOne({ where })
      if (res && res.id !== id) ctx.throw(404, ctx.__('dataExists'))
    }
    delete payload.id
    return data.update(payload)
  }
  // 删除
  async delete(ids) {
    const { ctx, db } = this
    if (!Array.isArray(ids)) ids = [ids]
    ctx.model.Log.create({ type: 'delete', db, message: JSON.stringify({ ids: ids }) })
    return ctx.model[db].destroy({ where: { id: { [Op.in]: ids } } })
  }
  // 查看详情
  async info(where) {
    const { ctx, db } = this
    const res = await ctx.model[db].findOne({ where })
    if (!res) ctx.throw(404, ctx.__('noData'))
    return res
  }
}
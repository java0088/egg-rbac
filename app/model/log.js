'use strict'
module.exports = app => {
  const { STRING, BOOLEAN } = app.Sequelize

  const Log = app.model.define('log', {
    type: {
      type: STRING,
      allowNull: false,
      comment: '类型',
      // update、 delete、create
    },
    db: {
      type: STRING,
      allowNull: false,
      comment: '数据库',
    },
    message: {
      type: STRING(2048),
      allowNull: false,
      defaultValue: '[]',
      comment: '操作记录',
    }
  })
  return Log
}

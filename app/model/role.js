module.exports = app => {
  const { STRING } = app.Sequelize

  const Role = app.model.define('role', {
    role_name: { type: STRING, allowNull: false, comment: '角色名称(营销员、护线员)' },
    menu_list: { type: STRING, allowNull: false, comment: '权限(page/button)' }
  })

  return Role
}
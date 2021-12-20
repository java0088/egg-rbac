module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize

  const Menu = app.model.define('menu', {
    title: { type: STRING, allowNull: false, comment: 'menu名称' },
    parent_id: { type: INTEGER, allowNull: false, comment: 'parent id' },
    menu_list: { type: STRING, allowNull: false, comment: '权限(page/button)' },
    path: { type: STRING, allowNull: false, comment: ' path' },
    component: { type: STRING, comment: 'component', defaultValue: null },
    icon: { type: STRING, comment: 'icon' },
    redirect: { type: STRING, allowNull: true, comment: 'redirect' },
    hidden: { type: BOOLEAN, allowNull: false, defaultValue: false, comment: 'hidden' },
  })
  return Menu
}
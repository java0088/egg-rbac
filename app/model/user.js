module.exports = app => {
  const { STRING } = app.Sequelize

  const User = app.model.define('user', {
    username: { type: STRING(30), comment: '用户登录账号' },
    realname: { type: STRING(30), comment: '用户真实姓名' },
    role_id: { type: STRING, comment: '权限ID' },
    password: { type: STRING, comment: '密码' }
  })
  return User
}
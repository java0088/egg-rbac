'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  app.beforeStart(async () => {
    await app.model.sync({ alter: true })
  })
  // require('./router/mqtt')(app)

  // 测试
  router.post('/test/page', controller.test.page)
  router.post('/test/list', controller.test.list)
  router.post('/test/add', controller.test.add)
  router.post('/test/update', controller.test.update)
  router.post('/test/delete', controller.test.delete)
  router.get('/test/info', controller.test.info)

  // 用户
  router.post('/user/add', controller.user.add)
  router.post('/user/update', controller.user.update)
}

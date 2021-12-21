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

  router.post('/test/page', controller.test.page)
  router.post('/test/list', controller.test.list)
  router.post('/test/add', controller.test.add)
  router.post('/test/update', controller.test.update)
  router.get('/test/info', controller.test.info)
  router.post('/test/delete', controller.test.delete)
}

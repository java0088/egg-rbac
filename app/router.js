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

  router.get('/test/page', controller.test.page)
  router.get('/test/list', controller.test.list)
}

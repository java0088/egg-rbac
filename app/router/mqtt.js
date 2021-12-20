'use strict'

module.exports = app => {
  app.emqtt.get('uav').route('/test', app.mqtt.controller.home.getMsg)
  app.emqtt.get('uav').route('testtopic', app.mqtt.controller.home.getEMQXMsg)
}

'use strict';
const BASE_URL = '192.168.99.100'
module.exports = appInfo => {
  const config = exports = {};
  config.keys = appInfo.name + '_hwt';

  config.middleware = [];

  const userConfig = {
    // myAppName: 'egg',
  }

  config.cluster = {
    listen: {
      path: '',
      port: 3000,
      hostname: '0.0.0.0'
    }
  }

  // NONE，DEBUG，INFO，WARN 和 ERROR
  config.logger = {
    level: 'DEBUG',
  }

  config.onerror = {
    accepts(ctx) {
      if (ctx.get('x-requested-with') === 'XMLHttpRequest') return 'json'
      return 'html'
    },
    // all(err, ctx) {
    // 在此处定义针对所有响应类型的错误处理方法
    // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    // },
    html(err, ctx) {
      // html hander
      ctx.body = error(err, ctx)
      ctx.status = 200
    },
    json(err, ctx) {
      // json hander
      // Validation Failed Validation error
      ctx.body = {
        status: ctx.status === 402 ? 2 : 1,
        error: error(err, ctx)
      }
      ctx.status = 400
      // ctx.status = 500;
    },
    jsonp(err, ctx) {
      // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
    },
  }

  // 跨域设置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }

  // 配置jwt
  config.jwt = {
    secret: '123456',
    enable: true, // default is false
    match: '/jwt', // optional
  }

  // 配置mysql
  config.sequelize = {
    Sequelize: require('sequelize'),
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    // connectionUri: 'mysql://root:@127.0.0.1:3306/test',
    database: 'egg-curd',
    host: BASE_URL, // 39.107.99.4
    port: 3306,
    username: 'root',
    password: '123456=', // 云服务器
    // password: '123', // 开发服务器
    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options
    define: { // model的全局配置
      timestamps: true, // 添加create,update,delete时间戳
      // paranoid: true, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      underscored: false // 防止驼峰式字段被默认转为下划线
    },
    timezone: '+08:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === 'DATETIME') {
          return field.string()
        }
        return next()
      }
    }
  }

  config.redis = {
    client: {
      port: 6379,
      host: BASE_URL,
      password: '',
      db: 0,
    }
  }

  // 配置mosquito
  // const options = {
  //   keepalive: 60,
  //   protocolId: 'MQTT',
  //   protocolVersion: 4,
  //   clean: true,
  //   reconnectPeriod: 1000,
  //   connectTimeout: 30 * 1000,
  //   rejectUnauthorized: false,
  //   qos: 0
  // }
  // const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
  // config.emqtt = {
  //   clients: {
  //     uav: {
  //       host: `mqtt://${BASE_URL}:1889`,
  //       username: 'admin',
  //       password: 'Senscape',
  //       clientId,
  //       options,
  //       msgMiddleware: []
  //     }
  //   }
  // }

  config.security = {
    csrf: {
      enable: false,
      type: 'ctoken', // can be ctoken, referer, all or any, default to ctoken
      useSession: false, // if useSession set to true, the secret will keep in session instead of cookie
      ignoreJSON: true, // skip check JSON requests if ignoreJSON set to true
      cookieName: 'csrfToken', // csrf token's cookie name
      sessionName: 'csrfToken', // csrf token's session name
      headerName: 'x-csrf-token', // request csrf token's name in header
      bodyName: '_csrf', // request csrf token's name in body
      queryName: '_csrf', // request csrf token's name in query
      refererWhiteList: [], // referer white list
    },
  }

  return {
    ...config,
    ...userConfig,
  };
};

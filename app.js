'use strict'

/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const config = require('./config')

const db = config.mongodb_url

/**
 * mongoose连接数据库
 * @type {[type]}
 */
mongoose.Promise = require('bluebird')
mongoose.connect(db)

/**
 * 获取数据库表对应的js对象所在的路径
 * @type {[type]}
 */
const models_path = path.join(__dirname, '/app/models')

/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
var walk = modelPath => {
  fs
    .readdirSync(modelPath)
    .forEach(file => {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      } else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}

walk(models_path)

require('babel-register')
const Koa = require('koa')
const logger = require('koa-logger')
const session = require('koa-session')
const api = require('./app/router/router')
const app = new Koa()

app.use(logger())
app.use(session(app))

/**
 * 使用路由转发请求
 * @type {[type]}
 */
const throw_error = require('./middlewares/throw_error')
const logUtil = require('./utils/log_util')

app.use(async (ctx, next) => {
  // 响应开始时间
  const start = new Date()

  // 响应间隔时间
  let ms = 0

  try {
    // 开始进入到下一个中间件
    await next()

    ms = new Date() - start

    // 记录响应日志
    logUtil.logResponse(ctx, ms)

  } catch (error) {
    
    ms = new Date() - start

    // 记录异常日志
    logUtil.logError(ctx, error, ms)
  }

})

app.use(throw_error)

app.use(api.middleware())

app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx)
})

module.exports = app
#!/usr/bin/env node
/* eslint-disable no-console */
var app = require('../app')

// 引入配置文件
var config = require('../config')

console.log('process.env.NODE_ENV=' + process.env.NODE_ENV)

var fs = require('fs')
var logConfig = require('../config/log')

/**
 * 确定目录是否存在，如果不存在则创建目录
 */
var confirmPath = function (pathStr) {

  if (!fs.existsSync(pathStr)) {
    fs.mkdirSync(pathStr)

    console.log('createPath: ' + pathStr)
  }
}

/**
 * 初始化log相关目录
 */
var initLogPath = function () {
  // 创建log的根目录'logs'
  if (logConfig.baseLogPath) {
    confirmPath(logConfig.baseLogPath)

    // 根据不同的logType创建不同的文件目录
    for (var i = 0, len = logConfig.appenders.length; i < len; i++) {
      if (logConfig.appenders[i].path) {
        confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path)
      }
    }
  }
}

initLogPath()

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

var port = normalizePort(config.port || '3000')

console.log('port = ' + config.port)

app.listen(port)


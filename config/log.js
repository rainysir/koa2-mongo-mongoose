/**
 * log4js 配置文件
 *
 * 日志等级由低到高
 * ALL TRACE DEBUG INFO WARN ERROR FATAL OFF.
 *
 * 关于log4js的appenders的配置说明
 * https://github.com/nomiddlename/log4js-node/wiki/Appenders
 */

var path = require('path')

// 日志根目录
var baseLogPath = path.resolve(__dirname, '../logs')

// 错误日志目录
var errorPath = '/error'

// 错误日志文件名
var errorFileName = 'error'

// 错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + '/' + errorFileName

// 响应日志目录
var responsePath = '/response'

// 响应日志文件名
var responseFileName = 'response'

// 响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + '/' + responseFileName

const logConfig = {
  appenders: {
    ruleConsole: {
      type: 'console'
    },
    errorLogger: {
      type: 'dateFile',
      filename: errorLogPath,
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd-hh.log',
      maxLogSize: 10 * 1000 * 1000,
      numBackups: 3,
      path: errorPath
    },
    resLogger: {
      type: 'dateFile',
      filename: responseLogPath,
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd-hh.log',
      maxLogSize: 10 * 1000 * 1000,
      numBackups: 3,
      path: responsePath
    }
  },
  categories: {
    default: {
      appenders: ['ruleConsole', 'resLogger'],
      level: 'ALL'
    },
    error: {
      appenders: ['errorLogger'],
      level: 'ERROR'
    }
  },
  baseLogPath: baseLogPath
}

module.exports = logConfig
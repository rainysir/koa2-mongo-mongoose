'use strict'

const i18nRouter = require('./i18n')
const response_formatter = require('../../middlewares/response_formatter')
let api = require('koa-better-router')({
  prefix: '/api'
})

api.extend(i18nRouter)
api.routes.forEach(item => {
  item.middlewares.push(response_formatter)
})

module.exports = api
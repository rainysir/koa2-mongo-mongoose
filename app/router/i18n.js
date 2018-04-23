'use strict'

const i18n = require('../controllers/i18n')
const koaBodyparser = require('koa-bodyparser')
let router = require('koa-better-router')().loadMethods()

router.get('/i18n/dict', i18n.getDict)
router.post('/i18n/create', koaBodyparser(), i18n.createItem)
router.post('/i18n/update', koaBodyparser(), i18n.updateItem)
router.post('/i18n/delete', koaBodyparser(), i18n.removeItem)
router.post('/i18n/import', koaBodyparser(), i18n.bulkImport)

module.exports = router
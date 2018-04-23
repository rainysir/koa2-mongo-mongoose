'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let i18nSchema = new Schema({
  en: String,
  cn: String,
  projectName: String,
  id: String,
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
})

i18nSchema.statics.findOneById = (id, cb) => this.find({ id: id }, cb)

// Defines a pre hook for the document.
i18nSchema.pre('save', function save(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})


/**
 * 定义模型i18n
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数i18n 数据库中的集合名称, 不存在会创建.
let i18n = mongoose.model('i18n', i18nSchema)

module.exports = i18n
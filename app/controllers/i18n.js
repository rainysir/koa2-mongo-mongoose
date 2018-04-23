'use strict'

const uuid = require('uuid')
const mongoose = require('mongoose')
const i18n = mongoose.model('i18n')
const ApiError = require('../../middlewares/ApiError')
const ApiErrorNames = require('../../middlewares/ApiErrorName')

class i18nController {
  // 查询
  static async getDict(ctx, next) {
    const query = ctx.query
    const page = Number(query.page || 1)
    const pageSize = Number(query.pageSize || 10)
    const { id } = query
    let total, res

    if (id) {
      res = await i18n.findOne({ id }, { _id: 0 })
        .catch(err => ctx.throw(500, err))

      ctx.body = res
    } else {
      total = await i18n.count().exec().catch(err => ctx.throw(500, err))

      res = await i18n.find({}, { _id: 0 })
        .sort('-meta.updateAt')
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec()
        .catch(err => ctx.throw(500, err))

      ctx.body = {
        list: res,
        total: total
      }

    }
    next()
  }

  // 批量导入词条
  static async bulkImport(ctx) {
    const { dicts } = ctx.request.body
    const sendData = eval(dicts) // eslint-disable-line
    let res = []

    if (!dicts || !(sendData instanceof Array)) {
      throw new ApiError(ApiErrorNames.PARAMS_NOT_EXIST)
    }

    for (let i = 0, len = sendData.length; i < len; i++) {
      let item = sendData[i]
      let model = await i18n.findOne({
        cn: item.cn
      }).exec()

      if (!model) {
        const id = uuid.v4()

        model = new i18n({
          en: item.en,
          cn: item.cn,
          id: id,
          projectName: item.projectName || 'aqua'
        })

        model = await model.save()
      } else {
        res.push(model)
      }
    }

    ctx.body = {
      success: true,
      data: {
        alreadyExist: res
      }
    }


  }

  // 创建新词条
  static async createItem(ctx) {
    const { en, cn, projectName } = ctx.request.body

    if (!en || !cn) {
      throw new ApiError(ApiErrorNames.PARAMS_NOT_EXIST)
    }

    let item = await i18n.findOne({
      cn: cn
    }).exec()

    if (!item) {
      const id = uuid.v4()

      item = new i18n({
        en: en,
        cn: cn,
        id: id,
        projectName: projectName || 'aqua'
      })

      item = await item.save()

      ctx.body = {
        success: true,
        item
      }

    } else {
      throw new ApiError(ApiErrorNames.DATA_ALREADY_EXISTS)
    }
  }

  // 修改词条
  static async updateItem(ctx) {
    const { en, cn, id, projectName } = ctx.request.body

    if (!en || !cn || !projectName || !id) {
      throw new ApiError(ApiErrorNames.PARAMS_NOT_EXIST)
    }

    let updateObj = {
      en,
      cn,
      projectName,
      id
    }

    await i18n.findOne({ id }, async (err, model) => {
      if (err) {
        ctx.throw(500, err)
      } else {
        await model.update({ $set: updateObj })
          .exec()
          .catch(err => ctx.throw(500, err))

        await model.save()
      }
    })

    ctx.body = {
      success: true
    }
  }

  // 删除词条
  static async removeItem(ctx) {
    const { id } = ctx.params

    if (!id) {
      throw new ApiError(ApiErrorNames.PARAMS_NOT_EXIST)
    }

    await i18n.remove({ id })
      .exec()
      .catch(err => ctx.throw(500, err))

    ctx.body = {
      success: true
    }
  }
}

exports = module.exports = i18nController
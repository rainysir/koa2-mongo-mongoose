/**
 * API错误名称
 */
let ApiErrorNames = {}
const error_map = new Map()

ApiErrorNames.UNKNOW_ERROR = 'unknowError'
ApiErrorNames.PARAMS_NOT_EXIST = 'paramsNotExist'
ApiErrorNames.DATA_ALREADY_EXISTS = 'DataAlreadyExists'
ApiErrorNames.USER_ALREADY_EXISTS = 'userAlreadyExists'
ApiErrorNames.USER_NOT_EXISTS = 'userNotExists'
ApiErrorNames.PASSWORD_ERROR = 'passwordError'

/**
 * API错误名称对应的错误信息
 */


error_map.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' })
error_map.set(ApiErrorNames.PARAMS_NOT_EXIST, { code: 999, message: '参数缺失' })
error_map.set(ApiErrorNames.DATA_ALREADY_EXISTS, { code: 1000, message: '数据已存在' })
error_map.set(ApiErrorNames.USER_ALREADY_EXISTS, { code: 1001, message: '用户已存在' })
error_map.set(ApiErrorNames.USER_NOT_EXISTS, { code: 1002, message: '用户不存在' })
error_map.set(ApiErrorNames.PASSWORD_ERROR, { code: 1003, message: '密码错误' })

// 根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = error_name => {
  let error_info

  if (error_name) {
    error_info = error_map.get(error_name)
  }

  // 如果没有对应的错误信息，默认'未知错误'
  if (!error_info) {
    error_name = ApiErrorNames.UNKNOW_ERROR
    error_info = error_map.get(error_name)
  }
  
  return error_info
}

module.exports = ApiErrorNames
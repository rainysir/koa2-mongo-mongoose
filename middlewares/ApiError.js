const ApiErrorNames = require('./ApiErrorName')

/**
 * 自定义Api异常
 */
class ApiError extends Error {
  constructor(error_name) {
    super()

    var error_info = ApiErrorNames.getErrorInfo(error_name)

    this.name = error_name
    this.code = error_info.code
    this.success = false
    this.message = error_info.message
  }
}



module.exports = ApiError
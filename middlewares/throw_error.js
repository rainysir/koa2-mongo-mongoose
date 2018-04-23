const ApiError = require('./ApiError')

const throw_error = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error instanceof ApiError) {
      ctx.status = 200
      ctx.body = {
        errorCode: error.code,
        errorMessage: error.message
      }
    }

    // 外层中间件处理日志
    throw error
  }

}

module.exports = throw_error
const response_formatter = async (ctx, next) => {
  await next()

  if (ctx.body) {
    ctx.body = {
      code: 200,
      success: true,
      data: ctx.body
    }
  } else {
    ctx.body = {
      code: 999,
      success: false
    }
  }
}

module.exports = response_formatter
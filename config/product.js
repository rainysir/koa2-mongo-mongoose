/**
 * 生产环境的配置内容
 */

module.exports = {
  env: 'product', // 环境名称
  port: 9090, // 服务端口号
  mongodb_url: 'mongodb://127.0.0.1:27017/blog' // 数据库地址
}
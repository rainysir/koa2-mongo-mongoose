#koa2-mongo-mongoose
一套基于koa2+mongo+mongoose的简单的nodejs server，实现数据库增删改查逻辑

## server

nodejs的话采用koa框架(koa 2)，数据库用了mongo。

**因为使用了许多es6/7 新语法,所以请使用7.x版本node**

### 使用说明

```
config/development or config/product 配置数据库地址

npm install

dev node/bin/dev.js

product node/bin/product.js

```

### 目录结构

```
├─ app
│  ├─ controllers  // server执行函数
│  │  └─ i18n.js
│  ├─ models
│  │  └─ i18n.js   // 定义mongo模型
│  └─ router
│     ├─ i18n.js   
│     └─ router.js  // 路由koa-better-router
├─ bin
│  ├─ dev.js
│  ├─ product.js
│  └─ www.js
├─ config
│  ├─ development.js // 开发环境数据库地址及端口配置
│  ├─ index.js
│  ├─ log.js    // 日志配置
│  └─ product.js    // 生产环境数据库地址及端口配置
├─ middlewares
│  ├─ ApiError.js   
│  ├─ ApiErrorName.js
│  ├─ response_formatter.js // 格式化输出中间件
│  └─ throw_error.js    // 统一抛错中间件
├─ utils
│  └─ log_util.js // log输出格式
├─ .babelrc
├─ .eslintrc    // eslint规范
├─ .gitignore
├─ README.md
├─ app.js
├─ package-lock.json
└─ package.json

```


```
# 示例接口
/api/i18n/dict 获取词条列表
/api/i18n/create 创建
/api/i18n/update 修改
/api/i18n/delete 删除
/api/i18n/import 批量添加

```
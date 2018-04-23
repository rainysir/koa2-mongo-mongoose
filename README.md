#koa2-mongo-mongoose
一套基于koa2+mongo+mongoose的简单的nodejs server，实现数据库增删改查逻辑

## server

nodejs的话采用koa框架(koa 2)，数据库用了mongo。

**因为使用了许多es6/7 新语法,所以请使用7.x版本node**

### npm command

```
npm install

dev node/bin/dev.js

product node/bin/product.js

```


```
# 示例接口
/api/i18n/dict 获取词条列表
/api/i18n/create 创建
/api/i18n/update 修改
/api/i18n/delete 删除
/api/i18n/import 批量添加

```
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
let mongoose = require("mongoose")

// brew install mongodb (https://www.cnblogs.com/junqilian/p/4109580.html)
// brew services start mongodb | mongod --config /usr/local/etc/mongod.conf
// 上面的命令会出现  Successfully started `mongodb`  这样类似开启mongodb的提示。。表示mongdb开启成功
// mongo
// show dbs 显示当前数据库的列表
// use 数据库名 可以切换数据库|如果没有这个表名，那么会新建
// db 当前数据库的对象或集合
// show dbs   show collections db   db.collections.find()  db.collections.remove({})
// db.collection.find() 当前表的全部行数据
// db.数据库名.insert({key,value}) 是插入数据库

// Mongoose 中有3个重要的概念,分别是Schema、Model、Entity
// Schema 生成 Model, Model 生成 Document ， Model和Document 都可对数据库操作造成影响， 但Model比Document更具操作性
// model() 方法，将Schema编译为model, model()方法的第一个参数是模型名称
const index = require('./routes/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx, next) => {
	//connect mongodb
  await mongoose.connect("mongodb://localhost/eduline", (err) => {
	  if (err) {
		  console.log("连接失败");
	  } else {
		  console.log("连接成功");
	  }
  });
  await next();
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

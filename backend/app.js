const koa = require('koa');
const app = new koa();
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const { connect, initSchema } = require('./database/init');

app.use(bodyParser());
app.use(cors());

(async() => {
	await connect();
	initSchema();
})();

let user = require('./controller/user.js');
let goods = require('./controller/goods.js');

let router = new Router();
router.use('/user', user.routes());
router.use('/goods', goods.routes());

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;

// const Koa = require('koa')
// const app = new Koa()
// const views = require('koa-views')
// const json = require('koa-json')
// const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')
// let mongoose = require("mongoose")
//
// const index = require('./routes/index')
//
// // error handler
// onerror(app)
//
// // middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
// app.use(json())
// app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))
//
// app.use(views(__dirname + '/views', {
//   extension: 'ejs'
// }))
//
// // logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })
//
// app.use(async (ctx, next) => {
// 	//connect mongodb
// 	// await mongoose.connect("mongodb://localhost/eduline", (err) => {
// 	await mongoose.connect("mongodb://10.47.12.111:27017/eduline", (err) => {
// 	  if (err) {
// 		  console.log("连接失败");
// 	  } else {
// 		  console.log("连接成功");
// 	  }
//   });
//   await next();
// })
//
// // routes
// app.use(index.routes(), index.allowedMethods())
//
// // error-handling
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// });
//
// module.exports = app

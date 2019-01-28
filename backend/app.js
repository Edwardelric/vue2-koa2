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


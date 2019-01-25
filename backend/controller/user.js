const Router = require('koa-router');
const mongoose = require('mongoose');

let router = new Router();

// 首页
router.get('/', async(ctx) => {
	ctx.body = '这里是用户操作首页';
});

// 注册
router.post('/register', async(ctx) => {
	const User = mongoose.model('User');
	let newUser = new User(ctx.request.body);
	// errorCode为返回结果状态 0: 成功, 1: 失败
	await newUser.save().then(res => {
		ctx.status = 200;
		ctx.body = { errorCode: 0, result: {}, message: '注册成功'};
	}).catch(err => {
		ctx.body = { code: 502, errorCode: 1, result: err, message: '注册失败'};
	});
});

// 登录
router.post('/login', async(ctx) => {
	let {userName, password} = ctx.request.body;
	let User = mongoose.model('User');
	await User.findOne({userName}).exec().then(async res => {
		if (res) {
			let newUser = new User();
			await newUser.comparePassword(password, res.password)
			.then(res => {
				if (res) {
					ctx.body = {code: 200, errorCode: 0, result: {}, message: '登录成功'};
				} else {
					ctx.body = {code: 200, errorCode: 1, result: {}, message: '密码不正确'};
				}
			}).catch(err => {
				ctx.body = {code: 500, errorCode: 1, result: res, message: ''};
			})
		} else {
			ctx.body = {code: 200, errorCode: 1, result: {}, message: '用户名不存在'};
		}
	}).catch(err => {
		console.log('err', err);
		ctx.body = {code: 500, errorCode: 1, result: {}, message: ''};
	});
});

module.exports = router;
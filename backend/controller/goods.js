const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');

let router = new Router();

// 展示goods数据
router.get('/showGoodsInfo', async(ctx) => {
	let result = new Promise((resolve, reject) => {
		fs.readFile('./mock/newGoods.json', 'utf8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		})
	});
	ctx.body = await result;
});

// 导入goods数据
router.get('/insertAllGoodsInfo', async(ctx) => {
	fs.readFile('./mock/newGoods.json', 'utf8', (err, data) => {
		data = JSON.parse(data);
		let saveCount = 0;
		const Goods = mongoose.model('Goods');
		data.map((value, index) => {
			let newGoods = new Goods(value);
			newGoods.save().then(res => {
				saveCount++;
				console.log(`插入数据成功${saveCount}条`);
			}).catch(err => {
				console.log('插入失败');
			})
		});
	});
	ctx.body = '开始导入数据'
});

// 获取goods 分页数据
router.post('/getGoodsList', async(ctx) => {
	let page = ctx.request.body.page || 1;
	let num = ctx.request.body.num || 10;
	let start = (page - 1) * num;
	let Goods = mongoose.model('Goods');
	await Goods.find({}).skip(start).limit(num).exec().then(res => {
		ctx.body = { code: 200, errorCode: 0, result: res, message: ''};
	}).catch(err => {
		ctx.body = { code: 500, errorCode: 0, result: err, message: ''};
	});
});

// 获取商品详细信息
router.post('/getDetailGoodsInfo', async(ctx) => {
	let ID = ctx.request.body.ID;
	console.log('iD', ID);
	let Goods = mongoose.model('Goods');
	await Goods.findOne({ID: ID}).exec()
	.then(res => {
		console.log('res', res);
		if (res) {
			ctx.body = { code: 200, errorCode: 0, result: res, message: ''};
		} else {
			ctx.body = { code: 200, errorCode: 1, result: err, message: '未找到对应的商品'};
		}
	}).catch(err => {
		ctx.body = { code: 500, errorCode: 0, result: err, message: ''};
	});
});

module.exports = router;

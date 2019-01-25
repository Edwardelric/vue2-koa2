const mongoose = require('mongoose');
const { URL } = require('../config');
const db = URL.db;
const glob = require('glob');
const { resolve } = require('path');

exports.initSchema = () => {
	glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
};

exports.connect = () => {
	let maxConnectTimes = 0;
	mongoose.connect(db);
	// 链接数据库
	mongoose.connection.once('open', () => {
		console.log('mongod数据库连接成功');
	});
	// 数据库断开
	mongoose.connection.on('disconnected', () => {
		console.log('数据库断开连接');
		if (maxConnectTimes <= 3) {
			maxConnectTimes++;
			mongoose.connect(db);
		} else {
			throw new Error('数据库连接出现问题');
		}
	});
	// 数据库错误
	mongoose.connection.on('error', () => {
		console.log('数据库错误');
		if (maxConnectTimes <= 3) {
			maxConnectTimes++;
		} else {
			throw new Error('数据库连接错误')
		}
	})
};


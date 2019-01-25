const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

// 创建Schema
const UserSchema = new Schema({
	userName: {unique: true, type: String},
	password: String,
	createAt: {type: Date, default: Date.now()},
	lastLoginAt: {type: Date, default: Date.now()}
}, {
	collection: 'User'
});

// 每次保存操作 对 password 做加盐算法
UserSchema.pre('save', function(next) {
	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) {
			return next(err);
		} else {
			bcrypt.hash(this.password, salt, (err, hash) => {
				if (err) {
					return next(err);
				} else {
					this.password = hash;
					next();
				}
			})
		}
	});
});

// 密码是否相同判断
UserSchema.methods = {
	comparePassword: (_password, password) => {
		return new Promise((resolve, reject) => {           // 是否必须要返回promise
			bcrypt.compare(_password, password, (err, res) => {
				if (!err) {
					resolve(res);
				} else {
					reject(err);
				}
			})
		})
	}
};

// 发布model
mongoose.model('User', UserSchema);
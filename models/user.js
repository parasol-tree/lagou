const mongoose = require('../utils/database.js');

//创建一张表存储用户的数据
const User = mongoose.model('user', {
	username: String,
	password: String
});

module.exports = {
	register: (username, password, callback) => {
		const user = new User({
			username: username,
			password: password
		});
		user.save((err) => {
			callback(err);
		})
	},

	findUser: (userInfo = {}, callback) => {
		User.findOne(userInfo).then((results) => {
			callback(results);
		}).catch(() => {
			callback("error");
		});
	}
}
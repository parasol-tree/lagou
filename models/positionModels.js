const mongoose = require('../utils/database.js');

var Position = mongoose.model('position', {
	name: String,
	company: String,
	salary: String,
	address: String,
	filename: String
});

module.exports = {
	addOnePosition(name, company, salary, address, filename, callback) {
		var position = new Position({name, company, salary, address, filename});
		// console.log(name, company, salary, address,filename)
		position.save((err) => {
			callback(err)
		})
	},

	getPositionData(eachPageDataCount, callback) {
		Position.find({}).count().then((dataCount) => {
			const totalPage = Math.ceil(dataCount / eachPageDataCount);
			callback(totalPage);
		}).catch(() => {
			callback('error')
		})
	},

	getPositionList(whichPage, eachPageDataCount, callback) {
		Position.find({}).limit(eachPageDataCount).skip((whichPage -1) * eachPageDataCount).then((shouldShowWhichData) => {
			callback(shouldShowWhichData);
		}).catch(() => {
			callback('error');
		})
	},

	deletePositionById(id, callback) {
		Position.findByIdAndRemove(id, (err) => {
			callback(err);
		})
	},

	getOnePositionInfoById(id, callback) {
		Position.findById(id).then((results) => {
			callback(results);
		}).catch(() => {
			callback('error');
		})
	},

	modifyOnePositionById(id,paramsObject,callback) {
		// console.log(paramsObject);
		Position.findByIdAndUpdate(id, paramsObject).then((result) => {
			callback(result);
		}).catch(() => {
			callback('error');
		})
	}
}
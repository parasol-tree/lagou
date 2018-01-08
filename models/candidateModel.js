const mongoose = require('../utils/database.js');

var Candidate = mongoose.model('candidate', {
	position: String,
	name: String,
	sex: String,
	salary: String
});

module.exports = {
	addOnecandidate(position, name, sex, salary, callback ) {
		var candidate = new Candidate({position, name, sex, salary});
		candidate.save((err) => {
			// console.log(err);
			callback(err)
		})
	},

	getCandidatesData(eachPageDataCount, callback) {
		Candidate.find({}).count().then((dataCount) => {
			const totalPage = Math.ceil(dataCount / eachPageDataCount);
			callback(totalPage);
		}).catch(() => {
			callback('error')
		})
	},

	getCandidateList(whichPage, eachPageDataCount, callback) {
		Candidate.find({}).limit(eachPageDataCount).skip((whichPage -1) * eachPageDataCount).then((shouldShowWhichData) => {
			callback(shouldShowWhichData);
		}).catch(() => {
			callback('error');
		})
	},

	deleteCandidateById(id, callback) {
		Candidate.findByIdAndRemove(id, (err) => {
			callback(err);
		})
	},

	getOneCandidateInfoById(id, callback) {
		Candidate.findById(id).then((results) => {
			callback(results);
		}).catch(() => {
			callback('error');
		})
	},

	modifyOneCandidateById(id, paramsObject, callback) {
		Candidate.findByIdAndUpdate(id, paramsObject).then((result) => {
			// console.log(result)
			callback(result);
		}).catch(() => {
			callback('error');
		})
	},

	findSalary(salary, callback) {
		// console.log(salary)
		Candidate.find({salary:salary}).then((result) => {
			callback(result);
		}).catch(() => {
			callback('error');
		})
	}
}
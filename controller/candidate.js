const candidateModel = require("../models/candidateModel.js");

module.exports = {
	addCandidate(req, res) {
		const { position, name, sex, salary } = req.body
		console.log(req.body)
		candidateModel.addOnecandidate(position, name, sex, salary, (err) => {
			console.log(err);
			res.json({
				'ret': true,
				'data': {
					'addOnecandidate': !err
				}
			})
		})
	},

	getCandidatesList(req,res) {
		const whichPage = req.query.whichPage ? parseInt(req.query.whichPage, 10) : 1;
		const eachPageDataCount = req.query.eachPageDataCount ? parseInt(req.query.eachPageDataCount, 10) : 10;
		// console.log(whichPage,eachPageDataCount)
		candidateModel.getCandidatesData(eachPageDataCount, (totalPage) => {
				candidateModel.getCandidateList(whichPage, eachPageDataCount, (shouldShowWhichData) => {
					// console.log(totalPage,shouldShowWhichData.length);
					res.json({
						'ret':true,
						'data': {
							'totalPage': totalPage,
							'shouldShowWhichData': shouldShowWhichData
						}
					})
				})
		});
	},

	deleteCandidate(req, res) {
		const id = req.query.id
		candidateModel.deleteCandidateById(id, (err) => {
			console.log(err);
			res.json({
				'ret': true,
				'data': {
					'deleteCandidate': !err
				}
			})
		})
	},

	getOneCandidateInfo(req, res) {
		const id = req.query.id;
		candidateModel.getOneCandidateInfoById(id, (results) => {
			// console.log(results);
			res.json({
				'ret': true,
				'data': {
					modify: (results && results !== 'error') ? results :false
				}
			})
		})
	},

	modifyCandidateInfo(req, res) {
		const {position, name, sex, salary, id} = req.body;
		// console.log(req.body)
		candidateModel.modifyOneCandidateById(id, {
			position,
			name,
			sex,
			salary
		}, (result) => {
			console.log(result)
			res.json({
				'ret': true,
				'data': {
					'modify': (result && result !== 'error') ? true : false
				}
			})
		});
	},

	getAllCandidateInfo(req, res) {
		const salary = req.query.salary;
		// console.log(salary)
		candidateModel.findSalary(salary, (result) =>{
			// console.log(result !== 'error');
			res.json({
				'ret': true,
				'data': {
					'result': (result && result !== 'error') ? true : false,
					'list': result
				}
			})
		});
	}
}
const positionModel = require("../models/positionModels.js");

module.exports = {
	addPosition(req, res) {
		const {position, companyName, salary, workAddress} = req.body;
		console.log(req.body);
		positionModel.addOnePosition(position, companyName, salary, workAddress, (err) => {
			// console.log(!err);
			/*if (!err) {
				console.log("添加职位信息成功")
			}*/
			res.json({
				'ret': true,
				'data': {
					'addOnePosition': !err
				}
			})
		})
	},

	getPositionList(req, res) {
		const whichPage = req.query.whichPage ? parseInt(req.query.whichPage, 10) : 1;
		const eachPageDataCount = req.query.eachPageDataCount ? parseInt(req.query.eachPageDataCount, 10) : 10;
		// console.log(whichPage,eachPageDataCount)
		positionModel.getPositionData(eachPageDataCount, (totalPage) => {
				positionModel.getPositionList(whichPage, eachPageDataCount, (shouldShowWhichData) => {
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

	deletePosition(req, res) {
		positionModel.deletePositionById(req.query.id, (err) => {
			res.json({
				'ret': true,
				'data': {
					'deletePosition': !err
				}
			})
		})
	},

	getOnePositionInfo(req, res) {
		positionModel.getOnePositionInfoById(req.query.id, (results) => {
			res.json({
				'ret': true,
				'data': {
					modify: (results && results !== 'error') ? results :false
				}
			})
		})
	},

	modifyPosition(req, res) {
		const {position, companyName, salary, workAddress, id} = req.body;
		positionModel.modifyOnePositionById(id,{
			position,
			companyName,
			salary,
			workAddress
		}, (result) => {
			res.json({
				'ret': true,
				'data': {
					'modify': (result && result !== 'error') ? true : false
				}
			})
		});
	}
}
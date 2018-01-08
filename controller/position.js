const positionModel = require("../models/positionModels.js");

module.exports = {
	addPosition(req, res) {
		const {name, company, salary, address} = req.body;
		const filename = req.file ? req.file.filename : ""

		positionModel.addOnePosition(name, company, salary, address, filename, (err) => {
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
		const {name, company, salary, address, id} = req.body;
		const filename = req.file ? req.file.filename : ""
		// console.log(req.body)
		// console.log(id);
		positionModel.modifyOnePositionById(id,{
			name,
			company,
			salary,
			address,
			filename
		}, (result) => {
			res.json({
				'ret': true,
				'data': {
					'modify': (result && result !== 'error') ? true : false
				}
			})
		});
	}/*,

	getAllCandidateInfo(req, res) {
		const salary = req.query.salary;
		// console.log(salary)
		positionModel.findSalary(salary, (result) =>{
			// console.log(result !== 'error');
			res.json({
				'ret': true,
				'data': {
					'result': (result && result !== 'error') ? true : false,
					'list': result
				}
			})
		});
	}*/
}
//                      d*##$.
// zP"""""$e.           $"    $o
//4$       '$          $"      $
//'$        '$        J$       $F
// 'b        $k       $>       $
//  $k        $r     J$       d$
//  '$         $     $"       $~
//   '$        "$   '$E       $
//    $         $L   $"      $F ...
//     $.       4B   $      $$$*"""*b
//     '$        $.  $$     $$      $F
//      "$       R$  $F     $"      $
//       $k      ?$ u*     dF      .$
//       ^$.      $$"     z$      u$$$$e
//        #$b             $E.dW@e$"    ?$
//         #$           .o$$# d$$$$c    ?F
//          $      .d$$#" . zo$>   #$r .uF
//          $L .u$*"      $&$$$k   .$$d$$F
//           $$"            ""^"$$$P"$P9$
//          JP              .o$$$$u:$P $$
//          $          ..ue$"      ""  $"
//         d$          $F              $
//         $$     ....udE             4B
//          #$    """"` $r            @$
//           ^$L        '$            $F
//             RN        4N           $
//              *$b                  d$
//               $$k                 $F
//               $$b                $F
//                 $""               $F
//                 '$                $
//                  $L               $
//                  '$               $
//                   $               $
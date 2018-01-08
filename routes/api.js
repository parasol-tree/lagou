const express = require('express');
const router = express.Router();

const userController = require('../controller/user.js');
const positionController = require("../controller/position.js");
const candidateController = require("../controller/candidate.js");

const upload = require('../utils/uploads.js')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/whetherLogin', userController.whetherLogin);
router.get('/logout', userController.logout);

router.post('/addPosition', upload.single('logo'), positionController.addPosition);
router.get('/getPositionList', positionController.getPositionList);
router.get('/deletePosition', positionController.deletePosition);
router.get('/getOnePositionInfo', positionController.getOnePositionInfo);
router.post('/modifyPosition', upload.single('logo'), positionController.modifyPosition);

router.post('/addCandidate', candidateController.addCandidate);
router.get('/getCandidatesList', candidateController.getCandidatesList);
router.get('/deleteCandidate', candidateController.deleteCandidate);
router.get('/getOneCandidateInfo', candidateController.getOneCandidateInfo);
router.post('/modifyCandidateInfo', candidateController.modifyCandidateInfo);

module.exports = router;

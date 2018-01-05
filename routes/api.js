const express = require('express');
const router = express.Router();

const userController = require('../controller/user.js');
const positionController = require("../controller/position.js")

/*const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const upload = multer({ storage: storage })*/

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/whetherLogin', userController.whetherLogin);
router.get('/logout', userController.logout);

router.post('/addPosition', positionController.addPosition);
router.get('/getPositionList', positionController.getPositionList);
router.get('/deletePosition', positionController.deletePosition);
router.get('/getOnePositionInfo', positionController.getOnePositionInfo);
router.post('/modifyPosition', positionController.modifyPosition);

module.exports = router;

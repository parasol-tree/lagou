const userModel = require('../models/user.js');
const crypto = require('crypto');

module.exports = {
	register: (req, res) => {
		const {username, password} = req.body;

    userModel.findUser({username: username}, (userInfo) => {
      if (userInfo){
        res.json({
          "ret": true,
          "data": {
            register: false
          }
        });
      } else {
        //使用核心模块crypto的createHash方法,加密方式为sha256
        const hash = crypto.createHash('sha256');
        hash.update(password);

        userModel.register(username, hash.digest('hex'), (err) => {
          res.json({
            "ret":true,
            "data": {
              register: !err
            }
          });
        })
      }
    })
	},

  login: (req, res) => {
    const {username, password} = req.body;
    const hash = crypto.createHash('sha256');
    hash.update(password);

    userModel.findUser({
      username: username,
      password: hash.digest('hex')
    }, (userInfo) => {
      if (userInfo && userInfo !== "error") {
        req.session.username = username;
      }
      res.json({
        "ret": true,
        "data": {
          login: (userInfo && userInfo !== "error") ? true : false
        }
      });
    });
  },

  whetherLogin: (req, res) => {
    // console.log(req.session.username)
    res.json({
      "ret": true,
      "data": {
        whetherLogin: req.session.username ? true : false,
        username: req.session.username,
        admin: 'administered'
      }
    });
  },

  logout: (req,res) => {
    req.session = null;
    res.json({
      "ret": true,
      "data": {
        logout: true
      }
    });
  }
}

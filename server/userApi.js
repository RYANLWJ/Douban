var models = require('./db.js');

var express = require('express');

var router = express.Router();

var mysql = require('mysql');

var $sql = require('./sqlMap.js');



// 连接数据库

var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function (res, ret) {

  if (typeof ret === 'undefined') {

    res.json({

      code: '1',

      msg: '操作失败'

    });
    console.log('fail')

  } else {

    res.json(ret);
    console.log('ok')

  }

};

// 增加用户接口

router.post('/addUser', (req, res) => {

  var sql = $sql.user.add;

  var params = req.body;

  console.log(params);

  conn.query(sql, [params.username, params.quantity, params.goodsId], function (err, result) {

    if (err) {

      console.log(err);

    }

    if (result) {

      jsonWrite(res, result);

    }

  })

});
// 查询数据

router.post('/ser', (req, res) => {

  var sql = $sql.user.ser;

  var params = req.body;

  console.log(params);

  conn.query(sql, [params.username], function (err, result) {

    if (err) {

      console.log(err);

    }

    if (result) {
      console.log(result)
      jsonWrite(res, result);

    }

  })

});
// 查询此用户购物车有无这条商品
router.post('/checkCurr', (req, res) => {

  var sql = $sql.user.checkCurr;

  var params = req.body;

  console.log(params);

  conn.query(sql, [params.username, params.goodsId], function (err, result) {

    if (err) {

      console.log(err);

    }

    if (result) {
      console.log(result)
      jsonWrite(res, result);

    }

  })

});
// 更新当前商品数量
router.post('/upd', (req, res) => {

  var sql = $sql.user.upd;

  var params = req.body;

  console.log(params);

  conn.query(sql, [params.quantity, params.username, params.goodsId], function (err, result) {

    if (err) {

      console.log(err);

    }

    if (result) {
      console.log(result)
      jsonWrite(res, result);

    }

  })

});




// 查询该用户是否已经注册

router.post('/checkNum', (req, res) => {
  var sql = $sql.user.checkNum;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.phoneNum], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result);
    }
  })
});

// 插入用户注册信息

router.post('/reg', (req, res) => {
  var sql = $sql.user.reg;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.phoneNum], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result);
    }
  })
});

// 查询手机号和密码是否匹配
router.post('/checkAcc', (req, res) => {
  var sql = $sql.user.checkAcc;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.phoneNum, params.psw], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result);
    }
  })
});
//查询邮箱是否和密码匹配
router.post('/checkEmail', (req, res) => {
  var sql = $sql.user.checkEmail;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.email, params.psw], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result);
    }
  })
});





module.exports = router;
